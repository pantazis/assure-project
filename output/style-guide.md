# UIREF.v1
`src:app-shell-layout.mmd+site-links.mmd`; compact build contract; values `px` unless noted.

## T
`c.bg=#fff;c.ink=#252525;c.mut=#687078;c.brand=#123b5d;c.brand2=#2f80a8;c.line=#c8ccdf;c.soft=#e9f5fa;c.focus=#ffbf47`
`ff='Open Sans',Arial,sans-serif;fw=400/600/700;lh=1.6`
`fs=14,16,18,24,32,40;sp=4,8,12,16,24,32,40,48,64`
`r=0,4;bd=1 solid c.line;sh=0 2 8 #0002;mw=1170;g=24`
`bp.sm=576;bp.md=768;bp.lg=992;bp.xl=1200;tap>=44;z.hdr=100;z.menu=110`

## G
`*{box-sizing:border-box};body{m:0;ff;fs:16;lh;c:c.ink/bg}`
`.wrap{w:min(calc(100% - 32px),mw);m:auto}`; `main{min-h:60vh;py:48}`
`h1{fs:40;lh:1.2;mb:24}h2{fs:32}h3{fs:24}h4{fs:18};p,ul,ol{mb:16}`
`a{c:c.brand2;text-decoration:none}a:hover{text-decoration:underline}`
`img{display:block;max-w:100%;h:auto}`; `:focus-visible{outline:3 solid c.focus;outline-offset:3}`
`@<768: .wrap w:calc(100%-32);main py:32;h1 fs:32`; motion respect `prefers-reduced-motion`.

## E:SHELL
`a.skip[href=#main]{Skip}+header.hdr>div.wrap>(a.brand[routerLink=/]>img[alt=ASSURE])+(nav.nav[aria-label='Primary navigation']>ul.nav__list>li.nav__item*6>a.nav__link)+(button.nav-toggle[type=button][aria-expanded=false][aria-controls=mobile-nav][aria-label='Open menu']>span*3)^main#main[tabindex=-1]>router-outlet^footer.ftr>div.wrap`
`order=skip>hdr>main>ftr`; hdr always before main; ftr always after; DOM order unchanged mobile.

## E:SHARED
`nav.crumbs[aria-label=Breadcrumb]>ol>li*2>a+span[aria-current=page]`; inner only; before h1.
`button.btn[type=button]{Label}`; `.btn:h44;p:0 18;d:inline-flex;ai:center;jc:center;gap:8;bd:0;r:4;fw:600;cursor:pointer`
`.btn--pri:bg:c.brand;c:#fff`; `.btn--ghost:bg:transparent;bd:1 solid c.brand;c:c.brand`; disabled opacity `.5`.
`button.icon-btn[type=button][aria-label]>svg[aria-hidden=true]`; `44x44;p:10`.
`article.card>time.card__date+h2.card__title>a^p.card__sum+a.card__more{Read more}`; `p:24;bd;mb:24`.
`article.member>img.member__logo+h2.member__name+p.member__country+div.member__body+a.member__site`; `grid:180 1fr;gap:32;p:32;bd`.
`article.contact>h2+p.contact__name+ul.contact__roles+address>a[href^=mailto:]+a[href^=tel:]`; `p:24;bd`.
`nav.share[aria-label=Share]>ul>li*2>a[target=_blank][rel=noopener]`; after detail body only.
`section.rich>h2+p+ul>li^figure>img+figcaption`; source block order; no decorative div hierarchy.
`footer: grid 3 cols;gap:32;py:40;bg:c.brand;c:#fff; border-top:3 solid c.line`; `@<768:1 col`.
`footer legal: a[routerLink='/Terms_of_Service_and_Privacy_Policy']`; internal same-window navigation; no absolute `assure-project.eu` URL, `_blank`, or external-link treatment.

## E:NAV
`li.nav__item--parent>a+button.sub-toggle[aria-expanded=false][aria-controls=about-menu]^ul#about-menu.sub>li*3>a`
`desktop>=992:hdr h:88;brand img max-h:64;nav flex;gap:24;sub abs hidden/show hover+focus-within`
`mobile<992:nav desktop hidden;nav-toggle show;#mobile-nav below hdr;expanded before main;sub static`
`active:a[aria-current=page]`; toggle state `[aria-expanded=true]`; never hover-only.

## P
`home: h1.sr-only+section.rich`; no crumbs/share.
`standard: crumbs+h1+(.rich|ul.link-list)`.
`legal: crumbs+h1+section.rich`; render heading/paragraph/list blocks in source order; no share.
`consortium: crumbs+h1+div.member-list>article.member*`.
`contact: crumbs+h1+div.contact-list>article.contact*`.
`news-list|events-list: crumbs+h1+div.card-list>article.card*`; newest/source order.
`news-detail|event-detail: crumbs+h1+section.rich+nav.share`.

## R
`home=/|/home;standard=/about|/about/project|/about/objectives|/about/technical-framework`
`legal=/Terms_of_Service_and_Privacy_Policy;footer.legalLink=>page-terms-privacy`
`consortium=/consortium;contact=/contact;lists=/news|/events`
`newsD=/news/latest-news|/news/interview-naftemporiki|/news/paper-publication`
`eventD=/events/closing-event|/events/windeurope-copenhagen-2023|/events/wind-energy-hamburg-2022|/events/global-wind-day-2022|/events/windeurope-bilbao-2022|/events/electric-city-copenhagen-2021`

## X
`semantic HTML;1 h1/page;buttons=actions;anchors=navigation;ul/ol for collections;aria-expanded synced;alt meaningful or '';external rel=noopener;no inline style;no fixed content height;Greek/English wrap;44 tap;AA contrast`.