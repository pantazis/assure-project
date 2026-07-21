alwes read this files 
output\assure-website.json,
output\site-blueprint.mmd,
output\website-content.models.ts,
output\app-shell-layout.mmd

for html style referses use C:\Users\pvast\Desktop\assure-project\html-pages\home.html

Initialize a new Angular application in the current repository and create only the application structure, shared app shell, components, and routing. Do not implement real page content yet.

Before making any decisions or changes, always read and use these files as the source of truth:

- output/assure-website.json
- output/site-blueprint.mmd
- output/website-content.models.ts
- output/app-shell-layout.mmd

Use this file only as the visual and styling reference for the original website:

- html-pages/home.html

Goal
Create a clean, responsive Angular foundation for the ASSURE website. Every route must use the same global app shell and preserve the component order defined in output/app-shell-layout.mmd.

Technical requirements

1. Initialize a modern Angular application using:
   - Standalone components
   - Angular Router
   - SCSS
   - Strict TypeScript settings
   - Accessible, semantic HTML

2. Create the global app shell in this fixed semantic order:
   - Skip-to-content link
   - Site header
   - Primary navigation, including the About submenu
   - Responsive mobile navigation control
   - Main content area containing the router outlet
   - Site footer

3. Create reusable shell components, including at minimum:
   - App shell/root component
   - Header component
   - Primary navigation component
   - Mobile navigation component or responsive navigation behavior
   - Footer component
   - Breadcrumb component placeholder
   - Page-layout or page-container component, if useful

4. Reproduce the general visual identity of html-pages/home.html without copying obsolete Drupal markup, Bootstrap dependencies, remote theme files, jQuery, or Drupal scripts. Use native Angular and project-owned SCSS. Match the reference’s overall characteristics:
   - White header
   - ASSURE logo positioned on the left
   - Desktop navigation positioned on the right
   - Dropdown submenu for “Σχετικά με το ASSURE”
   - Subtle header shadow/border
   - Constrained central content width
   - Dark footer with three responsive areas
   - Open Sans or a suitable local/system fallback
   - Responsive mobile menu

5. Use navigation labels, hierarchy, routes, logo information, and footer data from output/assure-website.json. Do not invent alternative routes or labels.

6. Create standalone empty page components and configure routing for every route defined by output/site-blueprint.mmd and output/app-shell-layout.mmd:
   - /
   - /home
   - /about
   - /about/project
   - /about/objectives
   - /about/technical-framework
   - /consortium
   - /news
   - /news/latest-news
   - /news/interview-naftemporiki
   - /news/paper-publication
   - /events
   - /events/closing-event
   - /events/windeurope-copenhagen-2023
   - /events/wind-energy-hamburg-2022
   - /events/global-wind-day-2022
   - /events/windeurope-bilbao-2022
   - /events/electric-city-copenhagen-2021
   - /contact

7. Page components must remain intentionally empty for now:
   - Do not render content from page.sections.
   - Do not implement article text, news cards, event cards, consortium members, contact details, sharing links, or other page-specific content.
   - Each page may contain only an empty semantic content container needed to verify routing and layout.
   - Do not add placeholder text such as “Coming soon” unless required for accessibility or route verification.

8. Keep the global shell identical across all routes:
   - Header always appears before main.
   - Footer always appears after main.
   - Mobile and desktop layouts preserve the same semantic DOM order.
   - Only the navigation presentation may change responsively.
   - The router outlet must be inside the main content area.

9. Prepare the architecture for later use of output/website-content.models.ts and output/assure-website.json, but do not implement page-content rendering in this task. Avoid unnecessary abstractions and do not build a CMS renderer yet.

10. Assets:
   - Reuse suitable existing files from public/assets where available.
   - Do not hotlink images, fonts, CSS, or JavaScript from the archived website.
   - Ensure Angular asset paths work in development and production builds.

11. Routing behavior:
   - Navigation must use routerLink and routerLinkActive.
   - The logo must navigate to the root or home route.
   - Parent and child navigation routes must work.
   - Add a lightweight not-found route/component.
   - Ensure direct navigation to nested routes works in the Angular development server.

12. Accessibility:
   - Include a functional skip link targeting the main content area.
   - Use semantic header, nav, main, and footer elements.
   - Give navigation controls accessible labels and correct expanded states.
   - Support keyboard operation of the mobile menu and About submenu.
   - Provide visible focus styles.

Suggested project organization

src/app/
  core/
    layout/
      app-shell/
      header/
      footer/
    navigation/
      primary-navigation/
  shared/
    components/
      breadcrumbs/
  pages/
    home/
    about/
    project/
    objectives/
    technical-framework/
    consortium/
    news/
    news-detail/ or separate empty news detail pages
    events/
    event-detail/ or separate empty event detail pages
    contact/
    not-found/
  app.routes.ts

Use route configuration and reusable page shells to avoid duplication. Separate page components are acceptable where they improve clarity, but do not duplicate app-shell markup in page templates.

Deliverables

- Initialized Angular project with local dependencies
- Standalone shared shell and navigation components
- Responsive SCSS based on the supplied HTML reference
- Empty routed page components for all specified routes
- Functional desktop and mobile navigation
- Functional global header and footer
- Not-found route
- Basic unit tests for routing and critical shell behavior
- Updated README with install, development, build, and test commands

Success criteria

- npm install completes successfully.
- The Angular development server starts without errors.
- The production build succeeds.
- Tests pass.
- Every specified URL resolves to its intended empty page component.
- Header, navigation, main outlet, and footer render consistently on every route.
- Desktop and mobile navigation are usable by keyboard.
- No page-specific content from assure-website.json is rendered yet.
- No Drupal, jQuery, Bootstrap, or remote archived-site dependencies are introduced.
- The implementation follows the route map and app-shell position invariants in the required Mermaid files.

Before finishing, review the implementation for readability, modularity, accessibility, testability, route completeness, and consistency with the required source files.
