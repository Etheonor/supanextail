## Welcome to SupaNexTail!

## Documentation 2.0

A new documentation is available here : https://doc.supanextail.dev/

## ![](https://lh4.googleusercontent.com/0qrns6BGMEh95de3BAE12YRRJceEACWdH09Yj6r7J5MswKG_R6zv7jcHEOUWFiWa7_2Yr6n6m0gSHg7iLa4lb-E0jEqZH6uJHJg3aNjbYO9LGWtCVV4dIi6BKKYUAMiFfvEOtefl)

### What is SupaNexTail?

SupaNexTail is a boilerplate to quickly create a MVP for a SaaS. It’s built with Next.js, Supabase, TailwindCSS, and Stripe.

### How can I use it?

Simply follow the installation process. You need to have some knowledge with React and know how to set up a database on Supabase.

### Installation

#### SupaNexTail project

You'll need to fork this repository. I suggest to keep your repository sync with SupaNexTail, in order to get all future updates.

To do that, you'll have extended information on this page: https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork

#### Supabase

You need to create a Supabase project and make a SQL Query with the « SetupSupabaseSQL.sql » (You can copy the content and create a query in the Supabase dashboard)

1.  Go to https://supabase.io/
2.  Create an account and go to your dashboard

![](https://lh5.googleusercontent.com/8Ry_yqGbMp7-8obVn_62kE4pcyNf5u0FkWe_-Mhec1bHMoGJtCG18HUH2j8DwOyuplOpKoCgoMSOtFvTA3G4kkpDAITo_xI-RgkHo5Brh2aSgcqJjs21ZDsqXD9GxQORw4tn3sPH)

3.  When your project is created, go to the SQL tab and create a new query

![](https://lh6.googleusercontent.com/kg7pBNhb9P49vYOMMVhsD4JiMxXSqRSLFnU_BEDTUH19CYUVEPRmaxg5WC3Ef_M2e5Y23DhV6__h9xFKn2GgXkltWBV4su-h8s8qdsP1GaAGkL1Q7cjqQ-TN57VfnGLD1HZOiCDp)

4.  Paste the content of setupSupabaseSQL.sql and run the query
5.  Your Supabase account is ready! Don’t forget to retrieve your env variables in settings -> API

![](https://lh3.googleusercontent.com/FVmq_BSn4TB6ISx8B7WLa8biEm8kvcexqqzBMLmBtZt30NDz58Q7MV5umD0G_VccZ8LYmE_33z46Z-eLcR4Smg_mnKsU0ybC__tV__Jaet6T_YSJAcebbijvvyFUDLpBOTRty4pV)

#### Stripe

1.  Create a Stripe account and a new project
2.  Create Products (as many as you want). For example SupaNexTail have 6 prices, 3 monthly plans and 3 annually plans.

![](https://lh3.googleusercontent.com/G_MYkYXRoGJb2VhWf9GIP6J5Iis0F2gg1OMdHa6BY-3Rb3VUVGg-fUUOZX6wG1AjFLu-AvgOEml6MkivEZ_8WWaBSrp3OW8lDp7c00o1-TFAa-Z0vCcuL4YTUQcTCuVYQkBbA_Wx)

3.  You’ll need to retrieve the price ID from each product on Stripe and paste them on utils/priceListjs. Of course you can handle the prices differently if you want. You’ll have to update the Pricing component too if you have a different amount of price ids.
4.  Don’t forget to retrieve the variables from Stripe

![](https://lh4.googleusercontent.com/ASiVfOBvKvD_vnKL7rOiVFlyiG6kR_95e6kQHyv7H3grlNt5PRGBhv_pmszrZeJmdF5sWRq41IV4QdwzcoMW0esb9l5pR_aVCCym5I5ksipGhmSCVVaB4gGNa17GUfFD-0DL7HuP) 5. You also need to configure the webhook section. Two events are needed

- customer.subscription.deleted
- checkout.session.completed

![](https://lh3.googleusercontent.com/zYnWdnmHFX2uIpi_UzSIvDvqOP_cO8WWfsL-iRwifqHbiGcUy1322Jj8hMAqfId5oXdHpY26lNg154ASTa5qkoEUtCTnN3JfKVA4WZWAboZVPiaPCp9i4ydV0yuWIfEmtu4NJkhP)

#### Sendgrid

Sendgrid is optional but you’ll need to configure it if you want to use the contact form.

![](https://lh4.googleusercontent.com/9EZ6EcWyc2EEILZJBs2xIEt_eesh2yTMz4WZsm2y8qYgQt-QdiODJfMriwkiBILM3S0iLAGNoN9JETgNp6DOpTIfKgChuY5yaoTBCEzIQwhSflYYJS6EGQrR5s9jRXMHOidTFXf8)

If you want to use the mailing list system, you’ll need to do a little bit more configuration. I wrote an article about it [here](https://dev.to/michael_webdev/create-a-mailing-list-with-sendgrid-and-next-js-41f7)

The backend is ready to use. You just have to add your SENDGRID_MAILING_ID env variables (more explanation about it in the article).

#### Misc.

- Supabase variables are mandatory, you can skip sendgrid as it’s just for the contact form. Stripe variables are needed if you want the subscription system.
- Don’t forget to do an `npm install` locally
- You can launch the website locally with `npm run dev `
- If you want to setup the website with Vercel, you can install the Vercel CLI and simply enter the command `vercel`

Notes:

If you want to use Stripe, be sure to set up your webhooks in the dashboard. If you want to test it locally, install Stripe CLI and use this command line:

```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The two event needed are:

- customer.subscription.deleted
- checkout.session.completed

### Known issues

- When a user sign up and you have the confirmation email enabled on Supabase, you don’t have a message that tells you to check your email. It will be fixed with a new version of Supabase UI in a few days.
