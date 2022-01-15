import CardsLanding from 'components/CardsLanding';
import Image from 'next/image';
import MailingList from './MailingList';
import landTop from 'public/landing/land-top.svg';
import start from 'public/landing/start.svg';
import supabaseImage from 'public/landing/supabase.svg';

const Landing = (): JSX.Element => (
  <div className="w-full mt-10 mb-20 text-base-content">
    <div className="flex flex-wrap justify-around max-w-6xl m-auto">
      <div className="max-w-sm my-auto mr-16">
        <h2 className="text-4xl font-bold leading-normal text-center lg:text-left font-title">
          Build your <span className="text-primary">SaaS</span> in the blink of
          an eye!
        </h2>
        <p className="text-center lg:text-left">
          SupaNexTail got your back, and takes care of the initial setup,
          sometimes time consuming, but essential to your success.
        </p>
      </div>
      <div className="max-w-xl">
        <Image
          src={landTop as string}
          height={417}
          width={583}
          alt="Construction of a website"
        />
      </div>
    </div>

    <CardsLanding />
    <div className="flex flex-wrap justify-around max-w-6xl m-auto mt-14">
      <div className="max-w-sm my-auto mr-16">
        <h2 className="text-4xl font-bold leading-normal text-left font-title">
          All you need to start <span className="text-primary">now</span>
        </h2>
        <p>
          SupaNexTail got your back, and takes care of the initial setup,
          sometimes time consuming, but essential to your success.
        </p>
      </div>
      <div className="max-w-xl">
        <Image src={start as string} alt="screenshot of the website" />
      </div>
    </div>
    <div className="flex flex-wrap justify-around max-w-6xl m-auto mt-24">
      <div className="order-1 max-w-md my-auto lg:order-2">
        <h2 className="text-4xl font-bold leading-normal text-left font-title">
          Leverage the power of <span className="text-primary">Supabase</span>
        </h2>
        <p>
          Supabase is an open source Firebase alternative. You’ll have a
          database, an auth system, a storage system, and much more in one
          product.
        </p>
        <p>
          SupaNexTail uses Supabase at its core, and preconfigures all the
          useful elements for your site. User registration, synchronization with
          Stripe, we’ve got you covered!
        </p>
      </div>
      <div className="flex order-2 max-w-md lg:order-1">
        <Image
          src={supabaseImage as string}
          alt="screenshot of the Supabase website"
        />
      </div>
    </div>
    <MailingList />
  </div>
);

export default Landing;
