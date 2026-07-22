import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PAGE_CONTENT } from '../../core/data/page-content.data';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs';
import { HtmlContent } from '../../shared/components/html-content/html-content';
import { BreadcrumbContent } from '../../shared/models/website-content.model';

@Component({
  selector: 'app-about-page',
  imports: [Breadcrumbs, HtmlContent],
  template: `
    <article class="wrap" aria-labelledby="about-page-title">
      <app-breadcrumbs [items]="breadcrumbs" />
      <h1 id="about-page-title">{{ page.title }}</h1>
      <app-html-content [html]="page.html" />
    </article>
  `,
})
export class AboutPage {
  protected readonly page = PAGE_CONTENT.about;
  protected readonly breadcrumbs: BreadcrumbContent[] = [
    { label: 'Home', targetPageId: 'page-root', sourceHref: '/' },
    { label: 'Σχετικά με το ASSURE', targetPageId: null, sourceHref: null },
  ];

  constructor(title: Title) {
    title.setTitle(this.page.browserTitle);
  }
}
