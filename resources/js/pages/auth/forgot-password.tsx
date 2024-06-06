import GuestLayout from '@/layouts/GuestLayout';
import InputError from '@/components/input-error';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="text-center">
                <h1 className="text-3xl font-bold">Forgot Password</h1>
            </div>

            <div className=" text-sm text-muted-foreground">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="font-medium text-sm text-green-600">{status}</div>}

            <form className='space-y-6' onSubmit={submit}>
                <div className='space-y-1.5'>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <Button className="w-full" disabled={processing}>
                    Email Password Reset Link
                </Button>
            </form>
        </GuestLayout>
    );
}
