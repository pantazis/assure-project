import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-html-content',
  template: '<section class="html-content" [innerHTML]="html()"></section>',
  styleUrl: './html-content.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HtmlContent {
  readonly html = input.required<string>();
}