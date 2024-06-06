import { cn } from '@/lib/utils';
import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                cn('inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out',
                    active
                        ? 'border-primary'
                        : 'border-transparent opacity-80 hover:opacity-100 hover:border-primary/80',
                    className
                )
            }
        >
            {children}
        </Link >
    );
}
