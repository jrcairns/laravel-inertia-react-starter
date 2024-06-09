import { cn } from '@/lib/utils';
import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                cn('transition-colors hover:text-foreground',
                    active
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                    className
                )
            }
        >
            {children}
        </Link >
    );
}
