import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/root/root').then((page) => page.RootPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((page) => page.HomePage),
  },
  {
    path: 'Terms_of_Service_and_Privacy_Policy',
    loadComponent: () =>
      import('./pages/terms-privacy/terms-privacy').then((page) => page.TermsPrivacyPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((page) => page.AboutPage),
  },
  {
    path: 'about/project',
    loadComponent: () => import('./pages/about/project/project').then((page) => page.ProjectPage),
  },
  {
    path: 'about/objectives',
    loadComponent: () =>
      import('./pages/about/objectives/objectives').then((page) => page.ObjectivesPage),
  },
  {
    path: 'about/technical-framework',
    loadComponent: () =>
      import('./pages/about/technical-framework/technical-framework').then(
        (page) => page.TechnicalFrameworkPage,
      ),
  },
  {
    path: 'consortium',
    loadComponent: () =>
      import('./pages/consortium/consortium').then((page) => page.ConsortiumPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((page) => page.ContactPage),
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news/news').then((page) => page.NewsPage),
  },
  {
    path: 'news/latest-news',
    loadComponent: () =>
      import('./pages/news/latest-news/latest-news').then((page) => page.LatestNewsPage),
  },
  {
    path: 'news/interview-naftemporiki',
    loadComponent: () =>
      import('./pages/news/interview-naftemporiki/interview-naftemporiki').then(
        (page) => page.InterviewNaftemporikiPage,
      ),
  },
  {
    path: 'news/paper-publication',
    loadComponent: () =>
      import('./pages/news/paper-publication/paper-publication').then(
        (page) => page.PaperPublicationPage,
      ),
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events').then((page) => page.EventsPage),
  },
  {
    path: 'events/closing-event',
    loadComponent: () =>
      import('./pages/events/closing-event/closing-event').then((page) => page.ClosingEventPage),
  },
  {
    path: 'events/windeurope-copenhagen-2023',
    loadComponent: () =>
      import('./pages/events/windeurope-copenhagen-2023/windeurope-copenhagen-2023').then(
        (page) => page.WindEuropeCopenhagen2023Page,
      ),
  },
  {
    path: 'events/wind-energy-hamburg-2022',
    loadComponent: () =>
      import('./pages/events/wind-energy-hamburg-2022/wind-energy-hamburg-2022').then(
        (page) => page.WindEnergyHamburg2022Page,
      ),
  },
  {
    path: 'events/global-wind-day-2022',
    loadComponent: () =>
      import('./pages/events/global-wind-day-2022/global-wind-day-2022').then(
        (page) => page.GlobalWindDay2022Page,
      ),
  },
  {
    path: 'events/windeurope-bilbao-2022',
    loadComponent: () =>
      import('./pages/events/windeurope-bilbao-2022/windeurope-bilbao-2022').then(
        (page) => page.WindEuropeBilbao2022Page,
      ),
  },
  {
    path: 'events/electric-city-copenhagen-2021',
    loadComponent: () =>
      import('./pages/events/electric-city-copenhagen-2021/electric-city-copenhagen-2021').then(
        (page) => page.ElectricCityCopenhagen2021Page,
      ),
  },
  { path: '**', redirectTo: '' },
];
