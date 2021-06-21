/*
This is the Dashboard component. If a user is logged in, he/she can update his/her name and website.
You can add as many elements as you want. Don't forget to update your getProfile() and updateProfile()
function with your new elements.
*/

import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import MyModal from "./MyModal";
import { supabase } from "../utils/supabaseClient";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

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
    }
  }

  return (
    <div className='form-widget mt-10 flex flex-col text-left'>
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
          value={session.user.email}
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
  );
}
