import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">

            <div className="flex items-center justify-center py-12 w-full">
                <div className="mx-auto grid w-[350px] gap-6">
                    {children}
                </div>
            </div>

            <div className="hidden bg-muted lg:block">
                <img
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
