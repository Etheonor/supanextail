/*
This is the Dashboard component. If a user is logged in, he/she can update his/her name and website.
You can add as many elements as you want. Don't forget to update your getProfile() and updateProfile()
function with your new elements.
*/

import Avatar from "./Avatar";
import { PriceIds } from "utils/priceList";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Account(props) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(props.profile.username);
  const [website, setWebsite] = useState(props.profile.website);
  const [avatar_url, setAvatarUrl] = useState(null);

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      toast.success("Your profile has been updated");
    }
  }

  return (
    <div className='flex flex-col text-left w-full'>
      <div className='max-w-sm flex flex-col justify-center m-auto w-full p-5'>
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
        <div className='mb-5 flex flex-col'>
          <label htmlFor='email' className='my-auto text-sm mb-2'>
            Email
          </label>
          <input
            className='input input-primary input-bordered input-sm flex-1'
            id='email'
            type='text'
            value={props.session.user.email}
            disabled
          />
        </div>
        <div className='mb-5 flex flex-col'>
          <label htmlFor='username' className='my-auto text-sm mb-2'>
            Name
          </label>
          <input
            className='input input-primary input-bordered input-sm flex-1'
            id='username'
            type='text'
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-5 flex flex-col'>
          <label htmlFor='website' className='my-auto text-sm mb-2'>
            Website
          </label>
          <input
            className='input input-primary input-bordered input-sm flex-1'
            id='website'
            type='website'
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className='m-auto'>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}>
            {loading ? "Loading ..." : "Update My Profile"}
          </button>
        </div>
      </div>

      <div className='max-w-xl flex flex-col justify-center m-auto w-full p-5 bordered border-2 border-primary shadow-lg my-5'>
        <h2>Your current plan</h2>
        <p>{props.plan.plan ? PriceIds[props.plan.plan] : "Free tier"}</p>
      </div>
    </div>
  );
}
