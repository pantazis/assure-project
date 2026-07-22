"""Download ASSURE HTML pages from Mermaid or an existing local archive."""

from __future__ import annotations

import argparse
from html.parser import HTMLParser
import re
import sys
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urldefrag, urljoin, urlsplit, urlunsplit
from urllib.request import Request, urlopen


CLICK_PATTERN = re.compile(
    r'^\s*click\s+(?P<node>[A-Za-z_][\w-]*)\s+"(?P<url>https?://[^"\s]+)"'
)
USER_AGENT = "AssureProjectHtmlArchiver/1.0 (+local authorized archive)"
DEFAULT_BASE_URL = "https://assure-project.eu/"
ASSURE_HOSTS = {"assure-project.eu", "www.assure-project.eu"}
NON_HTML_SUFFIXES = {
    ".css",
    ".csv",
    ".doc",
    ".docx",
    ".gif",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".json",
    ".mp3",
    ".mp4",
    ".pdf",
    ".png",
    ".svg",
    ".webp",
    ".xls",
    ".xlsx",
    ".xml",
    ".zip",
}


class ArchiveLinkParser(HTMLParser):
    """Collect anchor links and the canonical URL from one HTML document."""

    def __init__(self, document_url: str) -> None:
        super().__init__()
        self.document_url = document_url
        self.anchor_urls: list[str] = []
        self.canonical_url: str | None = None

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = dict(attrs)
        if tag.lower() == "a" and attributes.get("href"):
            self.anchor_urls.append(urljoin(self.document_url, attributes["href"]))
        elif tag.lower() == "link" and attributes.get("href"):
            rel = (attributes.get("rel") or "").lower().split()
            if "canonical" in rel:
                self.canonical_url = urljoin(self.document_url, attributes["href"])


def extract_links(mermaid_file: Path) -> list[tuple[str, str]]:
    """Return unique (node ID, URL) pairs from Mermaid click directives."""
    links: list[tuple[str, str]] = []
    seen_urls: set[str] = set()

    for line in mermaid_file.read_text(encoding="utf-8").splitlines():
        match = CLICK_PATTERN.match(line)
        if match and match.group("url") not in seen_urls:
            links.append((match.group("node"), match.group("url")))
            seen_urls.add(match.group("url"))

    return links


def normalize_page_url(url: str) -> str | None:
    """Normalize an ASSURE page URL, or return None for non-page URLs."""
    url_without_fragment = urldefrag(url.strip())[0]
    parsed = urlsplit(url_without_fragment)
    hostname = (parsed.hostname or "").lower()
    if parsed.scheme.lower() not in {"http", "https"} or hostname not in ASSURE_HOSTS:
        return None

    suffix = Path(unquote(parsed.path)).suffix.lower()
    if suffix in NON_HTML_SUFFIXES:
        return None

    path = parsed.path or "/"
    if path != "/":
        path = path.rstrip("/")
    return urlunsplit(("https", "assure-project.eu", path, parsed.query, ""))


def filename_for_url(url: str, used_names: set[str]) -> str:
    """Create a stable, Windows-safe filename for a page URL."""
    parsed = urlsplit(url)
    basename = unquote(parsed.path.rstrip("/").split("/")[-1]) or "root"
    safe_name = re.sub(r"[^A-Za-z0-9._-]+", "_", basename).strip("._-") or "page"
    candidate = f"{safe_name}.html"
    counter = 2
    while candidate.lower() in used_names:
        candidate = f"{safe_name}_{counter}.html"
        counter += 1
    used_names.add(candidate.lower())
    return candidate


def expected_filename_for_url(url: str) -> str:
    """Return the default local filename for a normalized page URL."""
    parsed = urlsplit(url)
    basename = unquote(parsed.path.rstrip("/").split("/")[-1]) or "root"
    safe_name = re.sub(r"[^A-Za-z0-9._-]+", "_", basename).strip("._-") or "page"
    return f"{safe_name}.html".lower()


def discover_missing_pages(
    archive_dir: Path, base_url: str
) -> tuple[list[tuple[str, str]], int, int]:
    """Return missing same-domain pages discovered in saved HTML files."""
    discovered_urls: set[str] = set()
    archived_urls: set[str] = set()
    html_files = sorted(archive_dir.glob("*.html"))

    for html_file in html_files:
        parser = ArchiveLinkParser(base_url)
        parser.feed(html_file.read_text(encoding="utf-8", errors="replace"))
        canonical_url = normalize_page_url(parser.canonical_url or "")
        if canonical_url:
            archived_urls.add(canonical_url)
        for anchor_url in parser.anchor_urls:
            normalized_url = normalize_page_url(anchor_url)
            if normalized_url:
                discovered_urls.add(normalized_url)

    used_names = {file.name.lower() for file in html_files}
    missing = sorted(
        url
        for url in discovered_urls - archived_urls
        if expected_filename_for_url(url) not in used_names
    )
    links = [(filename_for_url(url, used_names)[:-5], url) for url in missing]
    return links, len(discovered_urls), len(archived_urls)


def download_page(node: str, url: str, output_dir: Path, timeout: float) -> str:
    """Download one URL and return a human-readable status message."""
    request = Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1",
        },
    )

    with urlopen(request, timeout=timeout) as response:
        status = getattr(response, "status", 200)
        final_url = response.geturl()
        content_type = response.headers.get_content_type()
        body = response.read()

    if content_type not in {"text/html", "application/xhtml+xml"}:
        raise ValueError(f"unexpected content type: {content_type}")

    destination = output_dir / f"{node}.html"
    destination.write_bytes(body)
    redirect = f" -> {final_url}" if final_url != url else ""
    return f"HTTP {status}, {len(body):,} bytes{redirect}"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download ASSURE HTML from Mermaid links or links in saved pages."
    )
    parser.add_argument("mermaid", nargs="?", default="site-links.mmd", type=Path)
    parser.add_argument("--output", default=Path("html-pages"), type=Path)
    parser.add_argument(
        "--scan-html",
        action="store_true",
        help="scan --output HTML files and download missing assure-project.eu pages",
    )
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    parser.add_argument("--timeout", default=30.0, type=float)
    parser.add_argument("--delay", default=0.5, type=float)
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    if args.scan_html:
        links, discovered_count, archived_count = discover_missing_pages(
            args.output, args.base_url
        )
        print(
            f"Scanned {args.output.resolve()}: {discovered_count} unique ASSURE "
            f"page link(s), {archived_count} canonical page(s) archived."
        )
        if not links:
            print("No missing ASSURE HTML pages found.")
            return 0
    else:
        if not args.mermaid.is_file():
            print(f"ERROR: Mermaid file not found: {args.mermaid}", file=sys.stderr)
            return 2
        links = extract_links(args.mermaid)
        if not links:
            print("ERROR: No Mermaid click URLs were found.", file=sys.stderr)
            return 2

    print(f"Found {len(links)} unique URL(s); saving HTML to {args.output.resolve()}")

    failures = 0
    for index, (node, url) in enumerate(links, start=1):
        try:
            result = download_page(node, url, args.output, args.timeout)
            print(f"[{index:02}/{len(links)}] OK   {node}.html: {result}")
        except (HTTPError, URLError, TimeoutError, ValueError, OSError) as error:
            failures += 1
            print(f"[{index:02}/{len(links)}] FAIL {node}: {error}", file=sys.stderr)

        if index < len(links) and args.delay > 0:
            time.sleep(args.delay)

    successes = len(links) - failures
    print(f"Finished: {successes} succeeded, {failures} failed.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())