/*
This is the pricing component. 
You can switch between flat payment or subscription by setting the flat variable.
----------
Dont forget to create your customer portal on Stripe 
https://dashboard.stripe.com/test/settings/billing/portal 
*/

import { getSub, supabase } from 'utils/supabaseClient';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { definitions } from 'types/database/index';
import router from 'next/router';
import { useAuth } from 'utils/AuthContext';

const Pricing = (): JSX.Element => {
  const { user, session } = useAuth();
  const [customerId, setCustomerId] = useState<undefined | string>();
  const [sub, setSub] = useState<definitions['subscriptions'] | undefined>();

  useEffect(() => {
    if (user) {
      const subFunction = async (): Promise<void> => {
        const sub = await getSub();
        if (sub) {
          setSub(sub);
        }
        const subSupa = await supabase
          .from<definitions['subscriptions']>('subscriptions')
          .select(`customer_id`)
          .eq('id', user.id)
          .single();

        setCustomerId(subSupa.data?.customer_id);
      };
      void subFunction();
    }
  }, [user]);

  interface Test {
    url: string;
  }

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLButtonElement>,
    priceId: string
  ): Promise<void> => {
    event.preventDefault();
    // Create a Checkout Session. This will redirect the user to the Stripe website for the payment.
    if (user && session) {
      if (sub) {
        const stripeInfo = await axios.post<Test>(
          '/api/stripe/customerPortal',
          {
            customerId,
          }
        );
        void router.push(stripeInfo.data.url);
      } else {
        const stripeInfo = await axios.post<Test>('/api/stripe/checkout', {
          priceId,
          email: user.email,
          customerId,
          userId: user.id,
          tokenId: session.access_token,
          pay_mode: 'subscription',
        });
        void router.push(stripeInfo.data.url);
      }
    }
  };
  return (
    <div>
      <div className="container px-6 py-8 mx-auto text-base-100">
        <h2 className="mt-0 mb-5 text-3xl font-bold text-center sm:text-4xl font-title text-base-content">
          Pricing
        </h2>
        <div className="flex flex-col items-center justify-center mt-16 space-y-8 lg:flex-row lg:items-stretch lg:-mx-4 lg:space-y-0">
          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center rounded-lg shadow-lg lg:mx-4 bg-base-100 text-base-content">
            <div className="flex-shrink-0">
              <h3 className="inline-flex items-center badge-neutral badge badge-lg bg-base-content text-base-100">
                Casual
              </h3>
            </div>
            <div className="flex-shrink-0">
              <span className="pt-2 text-4xl font-bold uppercase">FREE</span>
            </div>
            <ul className="flex-1 space-y-4 text-base-content">
              <li>Up to 10 projects</li>
              <li>Up to 20 collaborators</li>
              <li>10Gb of storage</li>
            </ul>

            <button className="btn btn-primary">Start for free</button>
          </div>

          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center rounded-lg shadow-lg lg:mx-4 bg-base-100 text-base-content">
            <div className="flex-shrink-0">
              <h3 className="inline-flex items-center badge-neutral badge badge-lg bg-base-content text-base-100">
                Professional
              </h3>
            </div>
            <div className="flex-shrink-0">
              <span className="pt-2 text-4xl font-bold uppercase">$4.90</span>
              <span>/month</span>
            </div>
            <ul className="flex-1 space-y-4 text-base-content">
              <li>Up to 30 projects</li>
              <li>Up to 25 collaborators</li>
              <li>100Gb of storage</li>
              <li>Real-time collaborations</li>
            </ul>
            {user ? (
              <button
                className="btn btn-primary"
                onClick={(event) => {
                  void handleSubmit(event, 'price_1JtHhaDMjD0UnVmM5uCyyrWn');
                }}>
                {sub ? 'Handle subscription' : 'Subscribe'}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => router.push('/login')}>
                Log in
              </button>
            )}
          </div>

          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center rounded-lg shadow-lg lg:mx-4 bg-base-100 text-base-content">
            <div className="flex-shrink-0">
              <h3 className="inline-flex items-center badge-neutral badge badge-lg bg-base-content text-base-100">
                Business
              </h3>
            </div>
            <div className="flex-shrink-0">
              <span className="pt-2 text-4xl font-bold uppercase">$24.90</span>
              <span>/month</span>
            </div>
            <ul className="flex-1 space-y-4 text-base-content">
              <li>Up to 60 projects</li>
              <li>Up to 200 collaborators</li>
              <li>1Tb of storage</li>
              <li>Real-time collaborations</li>
            </ul>

            {user ? (
              <button
                className="btn btn-primary"
                onClick={(event) => {
                  void handleSubmit(event, 'price_1JtHhaDMjD0UnVmM5uCyyrWn');
                }}>
                {sub ? 'Handle subscription' : 'Subscribe'}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => router.push('/login')}>
                Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
