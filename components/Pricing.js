/*
This is the pricing component. 
You can switch between flat payment or subscription by setting the flat variable.
----------
Dont forget to create your customer portal on Stripe 
https://dashboard.stripe.com/test/settings/billing/portal 
*/

import { getSub, supabase } from 'utils/supabaseClient';
import { useEffect, useState } from 'react';

import { Prices } from 'utils/priceList';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import router from 'next/router';
import { useAuth } from 'utils/AuthContext';

const Pricing = () => {
  const [enabled, setEnabled] = useState(false);
  const { user } = useAuth();
  const [customerId, setCustomerId] = useState(null);
  const [sub, setSub] = useState(false);
  const flat = false; // Switch between subscription system or flat prices

  const portal = () => {
    axios
      .post('/api/stripe/customer-portal', {
        customerId,
      })
      .then((result) => {
        router.push(result.data.url);
      });
  };

  useEffect(() => {
    if (user) {
      getSub().then((result) => setSub(result));
      supabase
        .from('subscriptions')
        .select(`customer_id`)
        .eq('id', user.id)
        .single()
        .then((result) => {
          setCustomerId(result.data?.customer_id);
        });
    }
  }, [user]);

  const pricing = {
    monthly: {
      personal: '$5/mo',
      team: '$15/mo',
      pro: '$35/mo',
    },
    yearly: {
      personal: '$50/yr',
      team: '$150/yr',
      pro: '$350/yr',
    },
    flat: {
      personal: '€49',
      team: '€99',
      pro: '€149',
    },
  };

  const handleSubmit = async (e, priceId) => {
    e.preventDefault();
    // Create a Checkout Session. This will redirect the user to the Stripe website for the payment.
    axios
      .post('/api/stripe/create-checkout-session', {
        priceId,
        email: user.email,
        customerId,
        userId: user.id,
        tokenId: session.access_token,
        pay_mode: flat ? 'payment' : 'subscription',
      })
      .then((result) => router.push(result.data.url));
  };
  return (
    <div className="w-full mx-auto px-5 py-10 mb-10">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-title mb-5">
          Pricing
        </h1>
        <h3 className="text-lg font-light leading-8 p-3 mb-5">
          This is an example of a pricing page. You can choose a payment method,
          monthly or yearly.
        </h3>
      </div>
      {!flat && (
        <div className="flex justify-between max-w-xs m-auto mb-3">
          <div>
            <p className={`${enabled ? 'text-gray-500' : null}`}>
              Billed monthly
            </p>
          </div>
          <div>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`bg-primary relative inline-flex flex-shrink-0 h-[38px] w-[74px] 
            border-2 border-transparent rounded-full cursor-pointer transition-colors 
            ease-in-out duration-200 focus:outline-none focus-visible:ring-2  
            focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Switch bill</span>
              <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
          </div>
          <div>
            <p className={`${!enabled ? 'text-gray-500' : null}`}>
              Billed annually
            </p>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto md:flex space-x-4">
        <div className="w-full md:w-1/3 md:max-w-none px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
          <div className="w-full flex-grow">
            <h2 className="text-center font-bold uppercase mb-4">Personal</h2>
            <h3 className="text-center font-bold text-4xl mb-5">
              {flat
                ? pricing.flat.personal
                : enabled
                ? pricing.yearly.personal
                : pricing.monthly.personal}
            </h3>
            <ul className="text-sm px-5 mb-8 text-left">
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> A cool feature
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Another feature
              </li>
            </ul>
          </div>
          <div className="w-full">
            <button
              className="btn btn-primary w-full"
              onClick={
                user
                  ? sub
                    ? () => {
                        portal();
                      }
                    : (e) =>
                        handleSubmit(
                          e,
                          enabled
                            ? Prices.personal.annually.id
                            : Prices.personal.monthly.id
                        )
                  : () => {
                      router.push('/auth');
                    }
              }
            >
              {user ? (sub ? 'Upgrade' : 'Buy Now') : 'Register'}
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:max-w-none px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
          <div className="w-full flex-grow">
            <h2 className="text-center font-bold uppercase mb-4">Team</h2>
            <h3 className="text-center font-bold text-4xl mb-5">
              {flat
                ? pricing.flat.team
                : enabled
                ? pricing.yearly.team
                : pricing.monthly.team}
            </h3>
            <ul className="text-sm px-5 mb-8 text-left">
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> All basic features
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Dolor sit amet
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Consectetur
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Adipisicing
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Elit repellat
              </li>
            </ul>
          </div>
          <div className="w-full">
            <button
              className="btn btn-primary w-full"
              onClick={
                user
                  ? sub
                    ? () => {
                        portal();
                      }
                    : (e) =>
                        handleSubmit(
                          e,
                          enabled
                            ? Prices.team.annually.id
                            : Prices.team.monthly.id
                        )
                  : () => {
                      router.push('/auth');
                    }
              }
            >
              {user ? (sub ? 'Upgrade' : 'Buy Now') : 'Register'}
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:max-w-none px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
          <div className="w-full flex-grow">
            <h2 className="text-center font-bold uppercase mb-4">Pro</h2>
            <h3 className="text-center font-bold text-4xl mb-5">
              {flat
                ? pricing.flat.pro
                : enabled
                ? pricing.yearly.pro
                : pricing.monthly.pro}
            </h3>
            <ul className="text-sm px-5 mb-8 text-left">
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Lorem ipsum
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Dolor sit amet
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Consectetur
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Adipisicing
              </li>
              <li className="leading-tight">
                <i className="mdi mdi-check-bold text-lg" /> Much more...
              </li>
            </ul>
          </div>
          <div className="w-full">
            <button
              className="btn btn-primary w-full"
              onClick={
                user
                  ? sub
                    ? () => {
                        portal();
                      }
                    : (e) =>
                        handleSubmit(
                          e,
                          enabled
                            ? Prices.pro.annually.id
                            : Prices.pro.monthly.id
                        )
                  : () => {
                      router.push('/auth');
                    }
              }
            >
              {user ? (sub ? 'Upgrade' : 'Buy Now') : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
