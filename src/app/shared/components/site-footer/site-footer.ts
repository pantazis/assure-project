import { Component, input } from '@angular/core';
import { FooterContent } from '../../models/website-content.model';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  readonly content = input.required<FooterContent>();
}