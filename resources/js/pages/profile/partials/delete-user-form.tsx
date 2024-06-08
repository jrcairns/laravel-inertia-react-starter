import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <form>
            <Card>
                <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription className='max-w-xl'>
                        Once your account is deleted, all of its resources and data will be permanently deleted. Before
                        deleting your account, please download any data or information that you wish to retain.
                    </CardDescription>
                </CardHeader>
                <CardFooter className='border-t-0'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                                <DialogDescription>
                                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                                    enter your password to confirm you would like to permanently delete your account.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='space-y-4' onSubmit={deleteUser}>
                                <div>
                                    <Label htmlFor="password" className="sr-only">Password</Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="block w-full"
                                        placeholder="Password"
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button disabled={processing} variant="destructive">Delete Account</Button>
                                </DialogFooter>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </form>
    );
}
