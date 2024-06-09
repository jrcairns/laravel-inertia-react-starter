<?php

use App\Http\Controllers\BillingPortalController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManageSubscriptionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Middleware\Subscribed;
use App\Http\Middleware\Unsubscribed;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
*   Render landing page with component props
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // routes for paying or non paying users that are verified
});

Route::middleware(['auth', 'verified', Unsubscribed::class])->group(function () {
    Route::get('/subscription', ManageSubscriptionController::class)->name('subscription');
});

Route::middleware([
    'auth',
    'verified',
    Subscribed::class
])->group(function () {
    Route::get('/billing-portal', BillingPortalController::class)->name('billing-portal');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__ . '/auth.php';
