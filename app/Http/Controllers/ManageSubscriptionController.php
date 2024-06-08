<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Cashier;

class ManageSubscriptionController extends Controller
{
    public function __invoke(Request $request)
    {
        $productId = config('stripe.product_id');


        $product = Cashier::stripe()->products->retrieve($productId, []);

        $prices = Cashier::stripe()->prices->search([
            'query' => "active:'true' AND product:'$productId'",
        ]);

        return Inertia::render('manage-subscription', [
            'stripeKey' => config('cashier.key'),
            'product' => [
                'name' => $product->name,
                'description' => $product->description,
                'default_price' => $product->default_price,
                'sessions' => array_map(function ($price) use ($request, $productId) {
                    $session = $request->user()
                        ->newSubscription($productId, $price->id)
                        ->checkout([
                            'success_url' => route('dashboard'),
                            'cancel_url' => route('subscription'),
                        ]);

                    return [
                        'id' => $session->id,
                        'amount' => $price->unit_amount / 100,
                        'currency' => $price->currency,
                        'interval' => $price->recurring->interval
                    ];
                }, $prices->data)
            ]
        ]);
    }
}
