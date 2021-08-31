/*
This is the Dashboard component. If a user is logged in, he/she can update his/her name and website.
You can add as many elements as you want. Don't forget to update your getProfile() and updateProfile()
function with your new elements.
It also show you the current subscription plan
*/

import { useEffect, useState } from 'react';

import Avatar from './Avatar';
import Image from 'next/image';
import PaymentModal from './PaymentModal';
import Plan from 'public/plan.svg';
import { PriceIds } from 'utils/priceList';
import { Session } from '@supabase/gotrue-js';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

type DashboardProps = {
	profile: { username: string; website: string; avatar_url: string };
	session: Session;
	plan: string;
};

const Dashboard = ({ profile, session, plan }: DashboardProps): JSX.Element => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState(profile.username);
	const [website, setWebsite] = useState(profile.website);
	const [avatar_url, setAvatarUrl] = useState(profile.avatar_url);
	const [payment, setPayment] = useState(false);

	useEffect(() => {
		if (router.query.session_id && router.query.session_id !== 'canceled') {
			setPayment(true);
		}
	}, [router.query.session_id]);

	async function updateProfile({
		username,
		website,
		avatar_url,
	}: {
		username: string;
		website: string;
		avatar_url: string;
	}) {
		try {
			setLoading(true);
			const user = supabase.auth.user();

			const updates = {
				id: user?.id,
				username,
				website,
				avatar_url,
				updated_at: new Date(),
			};

			const { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal', // Don't return the value after inserting
			});

			if (error) {
				throw error;
			}
		} catch (error) {
			alert('There was an issue with the update');
		} finally {
			setLoading(false);
			toast.success('Your profile has been updated');
		}
	}

	return (
		<div className="flex flex-col text-left w-full max-w-xl m-auto px-5 py-10">
			<div className="max-w-sm flex flex-col justify-center m-auto w-full p-5">
				<h1 className="text-4xl font-bold md:text-5xl font-title text-center mb-10">Dashboard</h1>
				<Avatar
					url={avatar_url}
					size={150}
					onUpload={(url) => {
						setAvatarUrl(url);
						updateProfile({ username, website, avatar_url: url });
					}}
				/>
				<div className="mb-5 flex flex-col">
					<label htmlFor="email" className="my-auto text-sm mb-2">
						Email
					</label>
					<input
						className="input input-primary input-bordered input-sm flex-1 text-base-100"
						id="email"
						type="text"
						value={session.user?.email}
						disabled
					/>
				</div>
				<div className="mb-5 flex flex-col">
					<label htmlFor="username" className="my-auto text-sm mb-2">
						Name
					</label>
					<input
						className="input input-primary input-bordered input-sm flex-1"
						id="username"
						type="text"
						value={username || ''}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="mb-5 flex flex-col">
					<label htmlFor="website" className="my-auto text-sm mb-2">
						Website
					</label>
					<input
						className="input input-primary input-bordered input-sm flex-1"
						id="website"
						type="website"
						value={website || ''}
						onChange={(e) => setWebsite(e.target.value)}
					/>
				</div>

				<div className="m-auto">
					<button
						className="btn btn-primary btn-sm"
						onClick={() => updateProfile({ username, website, avatar_url })}
						disabled={loading}
					>
						{loading ? 'Loading ...' : 'Update My Profile'}
					</button>
				</div>
			</div>

			<div className="max-w-xl flex flex-row flex-wrap m-auto w-full p-5 bordered border-2 border-primary shadow-lg my-5">
				<Image src={Plan} alt="credit card" />
				<div className="flex flex-col m-auto">
					<h2>Your current plan</h2>
					<p className="">{plan ? PriceIds[plan] : 'Free tier'}</p>
				</div>
			</div>
			<PaymentModal open={payment} setPayment={setPayment} />
		</div>
	);
};

export default Dashboard;
