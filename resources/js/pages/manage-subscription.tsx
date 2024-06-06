import Authenticated from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { loadStripe } from "@stripe/stripe-js";

type Data = {
    stripeKey: string;
    checkoutSessionId: string
}

export default function ManageSubscription({ auth, stripeKey, checkoutSessionId }: PageProps<Data>) {
    async function handleClick() {
        const stripe = await loadStripe(stripeKey)
        await stripe?.redirectToCheckout({ sessionId: checkoutSessionId })
    }
    return (
        <Authenticated user={auth.user}>
            <div>
                <h1>manage billing</h1>
                <button onClick={handleClick}>checkout</button>
            </div>
        </Authenticated>
    )
}