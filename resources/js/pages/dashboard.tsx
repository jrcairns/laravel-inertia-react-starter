import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

type Post = {
    id: string;
    title: string;
    content: string;
}

type PaginationLink = {
    url: string
    active: boolean
    label: string
}

type Data = {
    message: string;
    posts: {
        data: Post[]
        current_page: number
        last_page: number
        links: PaginationLink[]
    }
}

export default function Dashboard({ auth, message }: PageProps<Data>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl  leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-4">
                    <Card>
                        <CardContent>{message}</CardContent>
                    </Card>
                    {/* <div className="grid lg:grid-cols-2 gap-4 items-start">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Posts</CardTitle>
                                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
                            </CardHeader>
                            <CardContent className='p-0'>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Posts</CardTitle>
                                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
                            </CardHeader>
                            <CardContent className='p-0'>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}