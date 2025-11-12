export interface NavLink {
    label: string;
    path: string;
    icon?: string;
    subNavLink?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Home', path: '/'},
    { label: 'About', path: 'evara/about'},
    { label: 'Shop', path: 'shop' },
    { label: 'Blog', path: 'evara/blog' },
    { label: 'Contact', path: 'evara/contact' },
    { label: 'FAQs', path: 'evara/faqs' },
    { label: 'Careers', path: 'evara/careers' },
];
