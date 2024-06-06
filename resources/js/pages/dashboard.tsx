import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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

export default function Dashboard({ auth, message, posts }: PageProps<Data>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl  leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-4">
                    <div className="bg-background overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">{message}</div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4 items-start">
                        <div className="bg-background overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <CreatePostForm />
                            </div>
                        </div>
                        <div className="bg-background overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 space-y-4">
                                <h2 className='font-medium'>Your Posts</h2>
                                <ul className="flex flex-col">
                                    {posts.data.map(post => (
                                        <li className='border-b py-4 first:border-t' key={post.id}>
                                            <p className='font-medium'>{post.title}</p>
                                            <p className='text-muted-foreground'>{post.content}</p>
                                        </li>
                                    ))}
                                </ul>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                className={cn({ "pointer-events-none opacity-50": posts.current_page === 1 })}
                                                href={posts.links[0].url}
                                            />
                                        </PaginationItem>
                                        {posts.links.slice(1, -1).map((link, index: number) => (
                                            link.label === "..." ? (
                                                <PaginationItem key={index}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            ) : (
                                                <PaginationItem key={index}>
                                                    <PaginationLink isActive={link.active} href={link.url}>{link.label}</PaginationLink>
                                                </PaginationItem>
                                            )
                                        ))}
                                        <PaginationItem>
                                            <PaginationNext
                                                className={cn({ "pointer-events-none opacity-50": posts.current_page === posts.last_page })}
                                                href={posts.links[posts.links.length - 1].url}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


function CreatePostForm() {
    const titleRef = useRef<HTMLInputElement>(null)

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        content: ''
    });

    const storePost: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('posts.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                titleRef.current?.focus()
            },
        });
    };

    return (
        <form className='space-y-6' onSubmit={storePost}>
            <div className='space-y-1.5'>
                <Label htmlFor="title">Title</Label>

                <Input
                    ref={titleRef}
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="block w-full"
                />

                <InputError message={errors.title} className="mt-2" />
            </div>
            <div className='space-y-1.5'>
                <Label htmlFor="content">Content</Label>
                <Input
                    id="content"
                    name="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="block w-full"
                />

                <InputError message={errors.content} className="mt-2" />
            </div>
            <Button disabled={processing}>Create Post</Button>
        </form>
    );
}
