import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PAGE_CONTENT } from '../../../core/data/page-content.data';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { HtmlContent } from '../../../shared/components/html-content/html-content';
import { BreadcrumbContent } from '../../../shared/models/website-content.model';

@Component({
  selector: 'app-electric-city-copenhagen-2021-page',
  imports: [Breadcrumbs, HtmlContent],
  template: `
    <article class="wrap" aria-labelledby="electric-city-copenhagen-2021-page-title">
      <app-breadcrumbs [items]="breadcrumbs" />
      <h1 id="electric-city-copenhagen-2021-page-title">{{ page.title }}</h1>
      <app-html-content [html]="page.html" />
    </article>
  `,
})
export class ElectricCityCopenhagen2021Page {
  protected readonly page = PAGE_CONTENT.electricCityCopenhagen2021;
  protected readonly breadcrumbs: BreadcrumbContent[] = [
    { label: 'Home', targetPageId: 'page-root', sourceHref: '/' },
    { label: this.page.title, targetPageId: null, sourceHref: null },
  ];

  constructor(title: Title) {
    title.setTitle(this.page.browserTitle);
  }
}