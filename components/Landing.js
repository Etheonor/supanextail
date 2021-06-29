import CardsLanding from "components/CardsLanding";
import MailingList from "./MailingList";

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
      <div>
        <div className='max-w-3xl m-auto my-10'>
          <h2 className='text-3xl font-semibold font-title'>Available soon</h2>
          <p className='text-lg max-w-lg text-center m-auto leading-9'>
            You will save{" "}
            <span className='text-accent text-2xl font-bold underline'>
              weeks
            </span>{" "}
            of work on your first integration. Want to check a demo? This
            website is built with it!
          </p>
        </div>
        <hr />
        <MailingList />
      </div>
    </div>
  );
};

export default Landing;
