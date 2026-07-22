Always read these files:
    - `output\assure-website.json`
    - `output\site-blueprint.mmd`
    - `output\website-content.models.ts`
    - `output\app-shell-layout.mmd`
    - `output\style-guide.md`

[*] Create Angular app
[*] Create reusable components
[*] Create app shell
[*] Create routing with and page componets no HTML ,chinge  nav links if rquierd
Migrate page HTML and required data one route at a time, in the checklist order below. For every route:
    - Read its matching source file in `html-pages/` and use the required `output/` reference files above.
    - Store only the page body as a typed TypeScript HTML template string in `src/app/core/data/page-content.data.ts`.
    - Preserve semantic content such as headings, paragraphs, `<strong>`, lists, links, and figures.
    - Exclude Drupal headers, footers, scripts, source IDs/classes, inline styles, and event-handler attributes.
    - Replace remote image URLs with local `/assets/images/...` paths and verify that every referenced asset exists.
    - Render the content through the reusable `HtmlContent` component using Angular `[innerHTML]` sanitization; never bypass Angular security.
    - Add only controlled component or page SCSS required for the current page.
    - Connect and validate only the current route. Run the production build and content checks, then mark its item `[*]` before starting the next route.
    - Do not change page content for routes whose checklist items are still incomplete.

 [*] `/` → `root.html`
 [*] `/home` → `home.html`
 [*] `/Terms_of_Service_and_Privacy_Policy` → `Terms_of_Service_and_Privacy_Policy.html`
 [ ] `/about` → `about.html`
 [ ] `/about/project` → `project.html`
 [ ] `/about/objectives` → `objectives.html`
 [ ] `/about/technical-framework` → `framework.html`
 [ ] `/consortium` → `consortium.html`
 [ ] `/contact` → `contact.html`
 [ ] `/news` → `news.html`
 [ ] `/news/latest-news` → `news_latest.html`
 [ ] `/news/interview-naftemporiki` → `news_interview.html`
 [ ] `/news/paper-publication` → `news_paper.html`
 [ ] `/events` → `events.html`
 [ ] `/events/closing-event` → `event_closing.html`
 [ ] `/events/windeurope-copenhagen-2023` → `event_copenhagen_2023.html`
 [ ] `/events/wind-energy-hamburg-2022` → `event_hamburg_2022.html`
 [ ] `/events/global-wind-day-2022` → `event_wind_day_2022.html`
 [ ] `/events/windeurope-bilbao-2022` → `event_bilbao_2022.html`
 [ ] `/events/electric-city-copenhagen-2021` → `event_electric_city_2021.html`

When a step is done, replace `[ ]` with `[*]`.



