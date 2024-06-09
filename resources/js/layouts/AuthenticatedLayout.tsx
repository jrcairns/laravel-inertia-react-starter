// import ApplicationLogo from '@/components/application-logo';
// import NavLink from '@/components/nav-link';
// import ResponsiveNavLink from '@/components/responsive-nav-link';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Toaster } from '@/components/ui/toaster';
// import { useToast } from '@/components/ui/use-toast';
// import { nav } from '@/config/nav';
import { User } from '@/types';
// import { Link, usePage } from '@inertiajs/react';
// import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

type Toast = {
    type?: "success" | "error" | "info" | "warning"
    message: string
    description?: string
}

// export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
//     const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
// const page = usePage<{ toast: Toast; subscribed: boolean }>()
// const { toast } = useToast()

// useEffect(() => {
//     if (page.props.toast) {
//         toast({
//             variant: page.props.toast.type ?? "default",
//             title: page.props.toast.message,
//             ...(page.props.toast.description && { description: page.props.toast.description }),
//         })
//     }
// }, [page.props])

//     return (
//         <div className="min-h-screen">
//             <nav className="bg-background border-b">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16">
//                         <div className="flex">
//                             <div className="shrink-0 flex items-center">
//                                 <Link href="/">
//                                     <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
//                                 </Link>
//                             </div>

//                             <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
// {nav.map(item => (
//     <NavLink key={item.route} href={route(item.route)} active={route().current(item.route)}>{item.label}</NavLink>
// ))}
//                             </div>
//                         </div>

//                         <div className="hidden sm:flex sm:items-center sm:ms-6">
//                             <div className="ms-3 relative">
//                                 <DropdownMenu>
//                                     <DropdownMenuTrigger asChild>
//                                         <Button className='space-x-2 px-3' variant="outline">
//                                             <span>{user.name}</span>
//                                             {page.props.subscribed && (
//                                                 <Badge>PRO</Badge>
//                                             )}
//                                             <svg
//                                                 className="h-4 w-4"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 viewBox="0 0 20 20"
//                                                 fill="currentColor"
//                                             >
//                                                 <path
//                                                     fillRule="evenodd"
//                                                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                                     clipRule="evenodd"
//                                                 />
//                                             </svg>
//                                         </Button>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent align='end'>
//                                         <DropdownMenuItem>
//                                             <Link href={route('profile.edit')}>Profile</Link>
//                                         </DropdownMenuItem>
//                                         <DropdownMenuItem>
//                                             <a href={route('billing-portal')} target='_blank'>Manage Billing</a>
//                                         </DropdownMenuItem>
//                                         <DropdownMenuItem>
//                                             <Link href={route('logout')} method="post" as="button">Log out</Link>
//                                         </DropdownMenuItem>
//                                     </DropdownMenuContent>
//                                 </DropdownMenu>
//                             </div>
//                         </div>

//                         <div className="-me-2 flex items-center sm:hidden">
//                             <button
//                                 onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
//                                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
//                             >
//                                 <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                                     <path
//                                         className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                     <path
//                                         className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
//                     <div className="pt-2 pb-3 space-y-1">
//                         {nav.map(item => (
//                             <ResponsiveNavLink key={item.route} href={route(item.route)} active={route().current(item.route)}>{item.label}</ResponsiveNavLink>
//                         ))}
//                     </div>

//                     <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
//                         <div className="px-4">
//                             <div className="font-medium text-base text-gray-800 dark:text-gray-200">
//                                 {user.name}
//                             </div>
//                             <div className="font-medium text-sm text-gray-500">{user.email}</div>
//                         </div>

//                         <div className="mt-3 space-y-1">
//                             <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
//                             <ResponsiveNavLink method="post" href={route('logout')} as="button">
//                                 Log Out
//                             </ResponsiveNavLink>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {header && (
//                 <header className="bg-background border-b">
//                     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
//                 </header>
//             )}

//             <main>{children}</main>
//             <Toaster />
//         </div>
//     );
// }

import { Link, usePage } from "@inertiajs/react"
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { PropsWithChildren, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { nav } from "@/config/nav"
import NavLink from "@/components/nav-link"
import { cn } from '@/lib/utils';
import { Container } from '@/components/container';

export default function Authenticated({ user, children }: PropsWithChildren<{ user: User }>) {
    const page = usePage<{ toast: Toast; subscribed: boolean }>()
    const { toast } = useToast()

    useEffect(() => {
        if (page.props.toast) {
            toast({
                variant: page.props.toast.type ?? "default",
                title: page.props.toast.message,
                ...(page.props.toast.description && { description: page.props.toast.description }),
            })
        }
    }, [page.props])
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/10 [--gutter:theme('spacing.4')] md:[--gutter:theme('spacing.6')]">
            <header className="sticky top-0 border-b bg-background z-50">
                <Container className='items-center max-w-none gap-4 flex h-16'>
                    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        {nav.map(item => (
                            <NavLink key={item.route} href={route(item.route)} active={route().current(item.route)}>{item.label}</NavLink>
                        ))}
                    </nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                {nav.map(item => (
                                    <NavLink key={item.route} href={route(item.route)} active={route().current(item.route)}>{item.label}</NavLink>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <form className="ml-auto flex-1 sm:flex-initial">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                />
                            </div>
                        </form>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <span>{user.name}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem>
                                    <Link className="w-full" href={route('profile.edit')}>Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={route('billing-portal')} target='_blank'>Manage Billing</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={route('logout')} method="post" as="button">Log out</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </Container>
            </header>
            <div className='animate-fade-in0 flex-1 flex' key={page.component}>
                {children}
            </div>
            <Toaster />
        </div>
    )
}