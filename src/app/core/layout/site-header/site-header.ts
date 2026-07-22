import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { PRIMARY_NAVIGATION } from '../../navigation/primary-navigation';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly navigation = PRIMARY_NAVIGATION;
  protected readonly mobileMenuOpen = signal(false);
  protected readonly aboutMenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected toggleAboutMenu(): void {
    this.aboutMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeNavigation(): void {
    this.mobileMenuOpen.set(false);
    this.aboutMenuOpen.set(false);
  }

  @HostListener('window:resize')
  protected handleResize(): void {
    if (window.innerWidth >= 992) {
      this.closeNavigation();
    }
  }
}
