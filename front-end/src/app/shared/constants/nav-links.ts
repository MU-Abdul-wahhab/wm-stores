export interface NavLink {
    label: string;
    path: string;
    icon?: string;
    subNavLink?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Home', path: '/home'},
    { label: 'About', path: '/shop'},
    { label: 'Shop', path: '/about' },
    { label: 'Blog', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Careers', path: '/careers' },
];
