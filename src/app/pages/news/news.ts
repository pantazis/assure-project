import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PAGE_CONTENT } from '../../core/data/page-content.data';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs';
import { HtmlContent } from '../../shared/components/html-content/html-content';
import { BreadcrumbContent } from '../../shared/models/website-content.model';

@Component({
  selector: 'app-news-page',
  imports: [Breadcrumbs, HtmlContent],
  template: `
    <section class="wrap" aria-labelledby="news-page-title">
      <app-breadcrumbs [items]="breadcrumbs" />
      <h1 id="news-page-title">{{ page.title }}</h1>
      <app-html-content [html]="page.html" />
    </section>
  `,
})
export class NewsPage {
  protected readonly page = PAGE_CONTENT.news;
  protected readonly breadcrumbs: BreadcrumbContent[] = [
    { label: 'Home', targetPageId: 'page-root', sourceHref: '/' },
    { label: 'Νέα', targetPageId: null, sourceHref: null },
  ];

  constructor(title: Title) {
    title.setTitle(this.page.browserTitle);
  }
}
