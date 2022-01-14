/*
As a user, you can upload an avatar in your dashboard. This component will handle 
the upload.
You can tweak the max size, line 47
*/

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { supabase } from 'utils/supabaseClient';

type AvatarProperties = {
  url: string;
  size: number;
  onUpload: (filePath: string) => void;
};

const customImgLoader = ({ src }: { src: string }): string => {
  return `${src}`;
};

const Avatar = ({ url, size, onUpload }: AvatarProperties): JSX.Element => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) void downloadImage(url);
  }, [url]);

  async function downloadImage(path: string): Promise<void> {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      if (data) {
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Error downloading image:', error.message);
      }
    }
  }

  async function uploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExtension = file.name.split('.').pop();
      const fileName = fileExtension ? `${Math.random()}.${fileExtension}` : '';
      const filePath = `${fileName}`;

      if (event.target.files[0].size > 150_000) {
        alert('File is too big!');
        event.target.value = '';
        setUploading(false);
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="m-auto mb-5">
      {avatarUrl ? (
        <div className="flex justify-center w-full">
          <Image
            loader={customImgLoader} //Using custom loader because of this issue https://github.com/vercel/next.js/discussions/19732
            src={avatarUrl}
            height={100}
            width={100}
            alt="Avatar"
            className="rounded-full w-28 h-28 avatar"
          />
        </div>
      ) : (
        <div className="rounded-full w-28 h-28 avatar" />
      )}
      <div style={{ width: size }}>
        <label
          className="mt-2 text-xs text-center cursor-pointer btn btn-primary btn-sm"
          htmlFor="single">
          {uploading ? 'Uploading ...' : 'Update my avatar'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default Avatar;
