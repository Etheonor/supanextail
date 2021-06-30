import CardsLanding from "components/CardsLanding";
import Image from "next/image";
import KeyFeature from "components/UI/KeyFeature";
import MailingList from "./MailingList";
import login from "public/login.png";
import supabaseImage from "public/supabase.jpg";

const Landing = () => {
  return (
    <div className='mt-36 mb-20 text-base-content max-w-5xl'>
      <div className='max-w-2xl m-auto'>
        <h2 className='text-5xl md:text-5xl font-bold font-title'>
          SupaNexTail <span className='text-accent'>Boilerplate</span>
        </h2>
        <hr className='my-5' />
        <p className='text-xl max-w-lg text-center m-auto'>
          Don’t waste your time and reinvent the wheel, setup your SaaS in
          <span className='text-accent text-2xl font-bold'> minutes</span>, not
          days.
        </p>
      </div>
      <CardsLanding />
      <MailingList />
      <div className='mt-24 lg:mt-12 flex justify-evenly'>
        <div>
          <h2 className='text-left text-3xl'>
            All you need to start{" "}
            <span className='font-bold text-accent'>now</span>
          </h2>
          <p className='max-w-lg mt-3 text-lg leading-9'>
            Creating a SaaS is not easy, especially if you are alone!
            SupaNexTail allows you to focus on the service you want to sell by
            taking care of the essential but time consuming features.
          </p>
          <KeyFeature>
            Authentication, payment system, mailing list, we got your back!
          </KeyFeature>
        </div>{" "}
        <div className='max-w-sm'>
          <Image src={login} />
        </div>
      </div>
      <div className='mt-24 lg:mt-12 flex justify-evenly'>
        <div className='max-w-md mr-10 m-auto'>
          <Image src={supabaseImage} />
        </div>
        <div>
          <h2 className='text-left text-3xl'>
            Leverage the power of
            <span className='font-bold text-accent'> Supabase</span>
          </h2>
          <p className='max-w-lg mt-3 text-lg leading-9'>
            Supabase is an open source Firebase alternative. You'll have a
            database, an auth system, a storage system, and much more in one
            product.
          </p>
          <p className='max-w-lg mt-3 text-lg leading-9'>
            SupaNexTail uses Supabase at its core, and preconfigures all the
            useful elements for your site. User registration, synchronization
            with Stripe, we've got you covered!
          </p>
          <KeyFeature>Managing a database has never been easier!</KeyFeature>
        </div>{" "}
      </div>
    </div>
  );
};

export default Landing;
