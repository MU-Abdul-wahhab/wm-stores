export interface NavLink {
    label: string;
    path: string;
    icon?: string;
    subNavLink?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Home', path: '/home', subNavLink: [{ label: 'Home 1', path: '/home' }, { label: 'Home 2', path: '/home' }] },
    { label: 'About', path: '/shop', subNavLink: [{ label: 'About 1', path: '/home' }, { label: 'About 2', path: '/home' }] },
    { label: 'Shop', path: '/about' },
    { label: 'Blog', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Careers', path: '/careers' },
];