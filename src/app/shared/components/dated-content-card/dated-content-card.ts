import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatedContentCard as DatedContentCardModel } from '../../models/website-content.model';
import { ContentBlocks } from '../content-blocks/content-blocks';

@Component({
  selector: 'app-dated-content-card',
  imports: [RouterLink, ContentBlocks],
  templateUrl: './dated-content-card.html',
  styleUrl: './dated-content-card.scss',
})
export class DatedContentCard {
  readonly item = input.required<DatedContentCardModel>();
}