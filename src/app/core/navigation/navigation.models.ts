export interface NavigationItem {
  readonly label: string;
  readonly route: string;
  readonly children?: readonly NavigationItem[];
}
