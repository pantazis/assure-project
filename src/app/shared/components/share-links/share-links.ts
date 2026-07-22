import { Component, input } from '@angular/core';
import { LinkContent } from '../../models/website-content.model';

@Component({
  selector: 'app-share-links',
  templateUrl: './share-links.html',
  styleUrl: './share-links.scss',
})
export class ShareLinks {
  readonly links = input.required<LinkContent[]>();
}