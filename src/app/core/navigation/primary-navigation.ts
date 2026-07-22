import { NavigationItem } from './navigation.models';

export const PRIMARY_NAVIGATION: readonly NavigationItem[] = [
  { label: 'Κεντρική', route: '/home' },
  {
    label: 'Σχετικά με το ASSURE',
    route: '/about',
    children: [
      { label: 'Το Έργο', route: '/about/project' },
      { label: 'Στόχοι', route: '/about/objectives' },
      { label: 'Τεχνικό Πλαίσιο', route: '/about/technical-framework' },
    ],
  },
  { label: 'Κοινοπραξία', route: '/consortium' },
  { label: 'Νέα', route: '/news' },
  { label: 'Συμμετοχές σε Events και Εκδηλώσεις', route: '/events' },
  { label: 'Επικοινωνήστε μαζί μας', route: '/contact' },
];
