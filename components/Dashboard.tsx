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
import { Session } from '@supabase/gotrue-js';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

type DashboardProperties = {
  profile: { username: string; website: string; avatar_url: string };
  session: Session;
  planName: string;
};

const Dashboard = ({
  profile,
  session,
  planName,
}: DashboardProperties): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [avatar_url, setAvatarUrl] = useState(profile?.avatar_url || '');
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
  }): Promise<void> {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
      toast.success('Your profile has been updated');
    }
  }

  return (
    <div className="flex flex-col w-full max-w-xl px-5 py-10 m-auto text-left">
      <div className="flex flex-col justify-center w-full max-w-sm p-5 m-auto">
        <h1 className="mb-10 text-4xl font-bold text-center md:text-5xl font-title">
          Dashboard
        </h1>
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            void updateProfile({ username, website, avatar_url: url });
          }}
        />
        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="my-auto mb-2 text-sm">
            Email
          </label>
          <input
            className="flex-1 input input-primary input-bordered input-sm text-base-100"
            id="email"
            type="text"
            value={session.user?.email}
            disabled
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="username" className="my-auto mb-2 text-sm">
            Name
          </label>
          <input
            className="flex-1 input input-primary input-bordered input-sm"
            id="username"
            type="text"
            value={username || ''}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="website" className="my-auto mb-2 text-sm">
            Website
          </label>
          <input
            className="flex-1 input input-primary input-bordered input-sm"
            id="website"
            type="website"
            value={website || ''}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className="m-auto">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}>
            {loading ? 'Loading ...' : 'Update My Profile'}
          </button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap w-full max-w-xl p-5 m-auto my-5 border-2 shadow-lg bordered border-primary">
        <Image src={Plan as string} alt="credit card" />
        <div className="flex flex-col m-auto">
          <h2>Your current plan</h2>
          <p className="">{planName}</p>
        </div>
      </div>
      <PaymentModal open={payment} setPayment={setPayment} />
    </div>
  );
};

export default Dashboard;
