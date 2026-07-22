import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentBlocks } from '../../shared/components/content-blocks/content-blocks';
import { ROOT_CONTENT } from './root.data';

@Component({
  selector: 'app-root-page',
  imports: [ContentBlocks],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class RootPage {
  protected readonly content = ROOT_CONTENT;

  constructor(title: Title) {
    title.setTitle('Home | ASSURE');
  }
}