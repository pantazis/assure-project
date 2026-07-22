import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem, SiteSettings } from '../../models/website-content.model';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  readonly site = input.required<SiteSettings>();
  readonly navigation = input.required<NavigationItem[]>();
  protected readonly mobileMenuOpen = signal(false);
  protected readonly submenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.submenuOpen.set(false);
  }
}