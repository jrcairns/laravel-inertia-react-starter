
# laravel-inertia-react-starter

## Setup

```
git clone git@github.com:jrcairns/laravel-inertia-react-starter.git
```

```
composer install && npm install
```

```
cp .env.example .env
```

### Populate the folllwing environment variables
```
STRIPE_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=

STRIPE_PRODUCT_ID=
STRIPE_PRICE_ID=
```

### Generate an APP_KEY for your `.env` file
```
php artisan key:generate
```

### Run your database migrations
```
php artisan migrate
```

### Start your server and client
```
php artisan serve

npm run dev
```

### Visit your page
```
http://localhost:8000
```

### Start listening for stripe events
```
stripe listen --forward-to http://localhost:8000/stripe/webhook

Your webhook signing secret is whsec_****
```