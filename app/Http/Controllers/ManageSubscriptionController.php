<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageSubscriptionController extends Controller
{
    public function __invoke(Request $request)
    {
        $checkout = $request->user()
            ->newSubscription(config('stripe.product_id'), config('stripe.price_id'))
            ->checkout([
                'success_url' => route('dashboard'),
                'cancel_url' => route('subscription'),
            ]);

        return Inertia::render('manage-subscription', [
            'stripeKey' => config('cashier.key'),
            'checkoutSessionId' => $checkout->id
        ]);
    }
}
