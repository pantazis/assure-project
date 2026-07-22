import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PAGE_CONTENT } from '../../core/data/page-content.data';
import { HtmlContent } from '../../shared/components/html-content/html-content';

@Component({
  selector: 'app-home-page',
  imports: [HtmlContent],
  template: `
    <article class="wrap" aria-labelledby="home-page-title">
      <h1 id="home-page-title" class="sr-only">{{ page.title }}</h1>
      <app-html-content [html]="page.html" />
    </article>
  `,
})
export class HomePage {
  protected readonly page = PAGE_CONTENT.home;

  constructor(title: Title) {
    title.setTitle(this.page.browserTitle);
  }
}