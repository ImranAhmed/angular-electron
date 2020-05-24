export interface AppNavigation {
    appName: string;
    id: string;
    icon: string;
    href: string;
    navigation: Navigation[];
}

export interface NavigationLink {
    name: string;
    id: string;
    href: string;
}

export interface Navigation extends NavigationLink {
    icon: string;
    children: NavigationLink[];
}
