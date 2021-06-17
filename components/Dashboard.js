import { useState, useEffect } from "react";
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
      <div className="mb-5 flex">
        <label htmlFor='email' className="my-auto">Email</label>
        <input className="input input-primary input-bordered input-sm ml-2 flex-1" id='email' type='text' value={session.user.email} disabled />
      </div>
      <div className="mb-5 flex">
        <label htmlFor='username' className="my-auto">Name</label>
        <input
          className='input input-primary input-bordered input-sm flex-1 ml-2'
          id='username'
          type='text'
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-5 flex">
        <label htmlFor='website' className="my-auto">Website</label>
        <input
          className='input input-primary input-bordered input-sm flex-1 ml-2'
          id='website'
          type='website'
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="m-auto">
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
