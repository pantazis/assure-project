import { Component, input } from '@angular/core';
import { ContentBlock } from '../../models/website-content.model';

@Component({
  selector: 'app-content-blocks',
  templateUrl: './content-blocks.html',
  styleUrl: './content-blocks.scss',
})
export class ContentBlocks {
  readonly blocks = input.required<ContentBlock[]>();
}