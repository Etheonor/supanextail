import CardLanding from 'components/UI/CardLanding';
import cardAuth from 'public/landing/auth.svg';
import cardFee from 'public/landing/lifetime.svg';
import cardPage from 'public/landing/page.svg';
import cardResponsive from 'public/landing/responsive.svg';
import cardServer from 'public/landing/backend.svg';
import cardStripe from 'public/landing/stripe.svg';
import cardTheme from 'public/landing/theme.svg';

const CardsLanding = (): JSX.Element => (
	<div className="mt-14">
		<h2 className="uppercase font-bold text-4xl tracking-wide text-center">
			We've got you covered
		</h2>
		<p className="max-w-md m-auto text-center">
			Don’t waste your time and reinvent the wheel, we have provided you with a maximum of features
			so that you only have one goal, to make your SaaS a reality.
		</p>
		<div className="flex flex-wrap justify-center mt-10">
			<CardLanding
				image={cardPage}
				text="7 pages fully designed and easily customizable"
				title='"Templates"'
			/>
			<CardLanding
				image={cardServer}
				text="Integrated backend already setup with Next.js API Routes"
				title="Backend"
			/>
			<CardLanding image={cardAuth} text="Auth and user management with Supabase" title="Auth" />
			<CardLanding
				image={cardResponsive}
				text="Mobile ready, fully responsive and customizable with Tailwind CSS"
				title="Responsive"
			/>
			<CardLanding
				image={cardTheme}
				text="Custom themes available and easily switch to dark mode"
				title="Themes"
			/>
			<CardLanding
				image={cardStripe}
				text="Stripe integration. Fully functional subscription system"
				title="Payment"
			/>
			<CardLanding
				image={cardFee}
				text="One-time fee. No subscription, you’ll have access to all the updates"
				title="Lifetime access"
			/>
		</div>
	</div>
);

export default CardsLanding;
