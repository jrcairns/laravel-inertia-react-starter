import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import DeleteUserForm from './partials/delete-user-form';
import UpdatePasswordForm from './partials/update-password-form';
import UpdateProfileInformationForm from './partials/update-profile-information-form';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Container } from '@/components/container';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <Container className="grid gap-[--gutter] py-[--gutter]">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                />

                <UpdatePasswordForm />

                <DeleteUserForm />
            </Container>
        </AuthenticatedLayout>
    );
}
