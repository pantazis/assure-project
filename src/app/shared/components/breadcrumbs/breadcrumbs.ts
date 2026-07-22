import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbContent } from '../../models/website-content.model';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs {
  readonly items = input.required<BreadcrumbContent[]>();
}