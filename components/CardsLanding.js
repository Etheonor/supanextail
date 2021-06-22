import CardLanding from "components/UI/CardLanding";
import Image from "next/image";
import cardAuth from "public/cardAuth.svg";
import cardFee from "public/cardFee.svg";
import cardPage from "public/cardPage.svg";
import cardResponsive from "public/cardResponsive.svg";
import cardServer from "public/cardServer.svg";
import cardStripe from "public/cardStripe.svg";
import cardTheme from "public/cardTheme.svg";

const CardsLanding = () => {
  return (
    <div className='flex flex-wrap justify-center mt-10'>
      <CardLanding
        image={cardPage}
        text='7 pages fully designed and easily customizable'
      />
      <CardLanding
        image={cardServer}
        text='Integrated backend already setup with Next.js API Routes'
      />
      <CardLanding
        image={cardAuth}
        text='Auth and user management with Supabase'
      />
      <CardLanding
        image={cardResponsive}
        text='Mobile ready, fully responsive and customizable with Tailwind CSS'
      />
      <CardLanding
        image={cardTheme}
        text='Custom themes available and easily switch to dark mode'
      />
      <CardLanding
        image={cardStripe}
        text='Stripe integration. Fully functional subscription system'
      />
      <CardLanding
        image={cardFee}
        text='One-time fee. No subscription, you’ll have access to all the updates'
      />
    </div>
  );
};

export default CardsLanding;
