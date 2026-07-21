"""Download the HTML pages referenced by Mermaid `click` directives."""

from __future__ import annotations

import argparse
import re
import sys
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


CLICK_PATTERN = re.compile(
    r'^\s*click\s+(?P<node>[A-Za-z_][\w-]*)\s+"(?P<url>https?://[^"\s]+)"'
)
USER_AGENT = "AssureProjectHtmlArchiver/1.0 (+local authorized archive)"


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
        description="Download HTML from URLs in Mermaid click directives."
    )
    parser.add_argument("mermaid", nargs="?", default="site-links.mmd", type=Path)
    parser.add_argument("--output", default=Path("html-pages"), type=Path)
    parser.add_argument("--timeout", default=30.0, type=float)
    parser.add_argument("--delay", default=0.5, type=float)
    args = parser.parse_args()

    if not args.mermaid.is_file():
        print(f"ERROR: Mermaid file not found: {args.mermaid}", file=sys.stderr)
        return 2

    links = extract_links(args.mermaid)
    if not links:
        print("ERROR: No Mermaid click URLs were found.", file=sys.stderr)
        return 2

    args.output.mkdir(parents=True, exist_ok=True)
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