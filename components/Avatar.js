import { useEffect, useState } from "react";

import { supabase } from "utils/supabaseClient";

const Avatar = ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      if (event.target.files[0].size > 150000) {
        alert("File is too big!");
        event.target.value = "";
        setUploading(false)
        return;
      }

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className='m-auto mb-5'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt='Avatar'
          className='avatar rounded-full w-28 h-28 flex m-auto'
        />
      ) : (
        <div className='avatar rounded-full w-28 h-28' />
      )}
      <div style={{ width: size }}>
        <label
          className='mt-2 btn btn-primary text-center cursor-pointer text-xs'
          htmlFor='single'>
          {uploading ? "Uploading ..." : "Update my avatar"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default Avatar;
