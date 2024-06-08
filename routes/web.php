<?php

use App\Http\Controllers\BillingPortalController;
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

/*
*   All routes that require auth and verification
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/billing-portal', BillingPortalController::class)->name('billing-portal');

    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
});

/*
*   All routes that require auth and verification and no subscription
*/
Route::middleware(['auth', 'verified', Unsubscribed::class])->group(function () {
    Route::get('/subscription', ManageSubscriptionController::class)->name('subscription');
});

/*
*   All routes that require auth, verification, and subscription
*/
Route::middleware(['auth', 'verified', Subscribed::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard', [
            "message" => "Hello World!",
            "posts" => \App\Models\Post::orderBy("created_at", "desc")
                ->paginate(2)
                ->onEachSide(1)
                ->through(function (Post $post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'description' => $post->description
                    ];
                })
        ]);
    })->name('dashboard');
});

/*
*   All routes that require auth but and can be unverified
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
