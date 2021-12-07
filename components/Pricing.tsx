/*
This is the pricing component. 
You can switch between flat payment or subscription by setting the flat variable.
----------
Dont forget to create your customer portal on Stripe 
https://dashboard.stripe.com/test/settings/billing/portal 
*/

import { getSub, supabase } from 'utils/supabaseClient'
import { useEffect, useState } from 'react'

import axios from 'axios'
import router from 'next/router'
import { useAuth } from 'utils/AuthContext'

const Pricing = (): JSX.Element => {
  const { user, session } = useAuth()
  const [customerId, setCustomerId] = useState<null | string>(null)
  const [sub, setSub] = useState(false)

  useEffect(() => {
    if (user) {
      getSub().then((result) => setSub(result))
      supabase
        .from('subscriptions')
        .select(`customer_id`)
        .eq('id', user.id)
        .single()
        .then((result) => {
          setCustomerId(result.data?.customer_id)
        })
    }
  }, [user])

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLButtonElement>,
    priceId: string
  ) => {
    e.preventDefault()
    // Create a Checkout Session. This will redirect the user to the Stripe website for the payment.
    if (sub) {
      axios
        .post('/api/stripe/customer-portal', {
          customerId,
        })
        .then((result) => {
          router.push(result.data.url)
        })
    } else
      axios
        .post('/api/stripe/create-checkout-session', {
          priceId,
          email: user.email,
          customerId,
          userId: user.id,
          tokenId: session.access_token,
          pay_mode: 'subscription',
        })
        .then((result) => router.push(result.data.url))
  }
  return (
    <div>
      <div className="container px-6 py-8 mx-auto text-base-100">
        <h2 className="mt-0 mb-5 text-3xl font-bold text-center sm:text-4xl font-title text-base-content">
          Pricing
        </h2>
        <div className="flex flex-col items-center justify-center mt-16 space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center rounded-lg shadow-lg bg-base-100 lg:mx-4 text-base-content">
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

          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center rounded-lg shadow-lg bg-base-100 lg:mx-4 text-base-content">
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
                onClick={(e) => {
                  handleSubmit(e, 'price_1JtHhaDMjD0UnVmM5uCyyrWn')
                }}
              >
                {sub ? 'Handle subscription' : 'Subscribe'}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => router.push('/login')}
              >
                Log in
              </button>
            )}
          </div>

          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center rounded-lg shadow-lg bg-base-100 lg:mx-4 text-base-content">
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
                onClick={(e) => {
                  handleSubmit(e, 'price_1JtHhaDMjD0UnVmM5uCyyrWn')
                }}
              >
                {sub ? 'Handle subscription' : 'Subscribe'}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => router.push('/login')}
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
