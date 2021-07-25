import CardsLanding from "components/CardsLanding";
import Image from "next/image";
import MailingList from "./MailingList";
import landTop from "public/landing/land-top.svg";
import start from "public/landing/start.svg";
import supabaseImage from "public/landing/supabase.svg";

const Landing = () => {
  return (
    <div className='mt-10 mb-20 text-base-content w-full'>
      <div className='flex max-w-6xl m-auto justify-around'>
        <div className='max-w-sm mr-16 my-auto'>
          <h2 className='text-4xl font-bold font-title text-left leading-normal'>
            Build your <span className='text-primary'>SaaS</span> in the blink
            of an eye!
          </h2>
          <p>
            SupaNexTail got your back, and takes care of the initial setup,
            sometimes time consuming, but essential to your success.
          </p>
        </div>
        <div className='max-w-xl'>
          <Image src={landTop} height={417} width={583} />
        </div>
      </div>

      <CardsLanding />
      <div className='flex max-w-6xl m-auto justify-around mt-14 flex-wrap'>
        <div className='max-w-sm mr-16 my-auto'>
          <h2 className='text-4xl font-bold font-title text-left leading-normal'>
            All you need to start <span className='text-primary'>now</span>
          </h2>
          <p>
            SupaNexTail got your back, and takes care of the initial setup,
            sometimes time consuming, but essential to your success.
          </p>
        </div>
        <div className='max-w-xl'>
          <Image src={start} />
        </div>
      </div>
      <div className='flex max-w-6xl m-auto justify-around mt-24 flex-wrap'>
        <div className='max-w-md my-auto order-1 lg:order-2'>
          <h2 className='text-4xl font-bold font-title text-left leading-normal'>
            Leverage the power of <span className='text-primary'>Supabase</span>
          </h2>
          <p>
            Supabase is an open source Firebase alternative. You’ll have a
            database, an auth system, a storage system, and much more in one
            product.
          </p>
          <p>
            SupaNexTail uses Supabase at its core, and preconfigures all the
            useful elements for your site. User registration, synchronization
            with Stripe, we’ve got you covered!
          </p>
        </div>
        <div className='max-w-md order-2 lg:order-1 flex'>
          <Image src={supabaseImage} />
        </div>
      </div>
      <MailingList />
    </div>
  );
};

export default Landing;
