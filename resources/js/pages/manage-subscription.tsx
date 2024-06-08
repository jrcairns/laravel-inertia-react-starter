import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Authenticated from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from 'lucide-react'

type Data = {
    stripeKey: string
    product: StripeProduct
}

type StripeProduct = {
    name: string
    description: string
    default_price: string
    sessions: StripeCheckoutSession[]
}

type StripeCheckoutSession = {
    amount: number
    currency: string
    id: string
    interval: string
}

export default function ManageSubscription({ auth, stripeKey, product }: PageProps<Data>) {

    const handleClick = (sessionId: string) => async () => {
        const stripe = await loadStripe(stripeKey)
        await stripe?.redirectToCheckout({ sessionId })
    }

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Subscription Required</h2>}
        >
            <Head title="Purchase Subscription" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4 sm:gap-6 grid sm:grid-cols-2">
                    {product.sessions.map(session => (
                        <Card key={session.id}>
                            <CardHeader>
                                <CardTitle className="space-x-1">
                                    <span>{product.name}</span>
                                    <span>
                                        {new Intl.NumberFormat('en-US', {
                                            style: "currency",
                                            currency: session.currency,
                                            currencyDisplay: "symbol",
                                            minimumFractionDigits: 0,
                                        }).format(session.amount)}/{session.interval}
                                    </span>
                                </CardTitle>
                                <CardDescription>{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-primary/80 text-pretty">Instantly create and deploy custom forms with unique web URLs in seconds. Simplify your workflow and start tracking analytics effortlessly.</p>
                                <ul className="mt-6 space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <CheckIcon className="h-3.5 w-3.5" />
                                        <span className="font-medium text-sm flex-1">Feature 1</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckIcon className="h-3.5 w-3.5" />
                                        <span className="font-medium text-sm flex-1">Feature 2</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CheckIcon className="h-3.5 w-3.5" />
                                        <span className="font-medium text-sm flex-1">Feature 3</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="ml-auto" onClick={handleClick(session.id)}>
                                    Go To Checkout
                                    <ArrowRightIcon className="ml-1.5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </Authenticated>
    )
}
