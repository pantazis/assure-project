import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooter } from './core/layout/site-footer/site-footer';
import { SiteHeader } from './core/layout/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <a class="skip-link" href="#main">Μετάβαση στο κύριο περιεχόμενο</a>
    <app-site-header />
    <main id="main" class="site-main" tabindex="-1"><router-outlet /></main>
    <app-site-footer />
  `,
  styleUrl: './app.scss',
})
export class App {}
