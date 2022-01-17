/*
This is the form component to register an email adress to your mailing list. 
This is just the frontend, and the email will be send to our backend API (/api/mailingList)
*/

import axios, { AxiosError } from 'axios';

import Image from 'next/image';
import Mailing from 'public/landing/mailing.svg';
import { toast } from 'react-toastify';
import { useState } from 'react';

const MailingList = (): JSX.Element => {
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  interface ErrorAxios {
    data: {
      error: string;
      success: boolean;
    };
  }
  const validateEmail = (): void => {
    // Regex patern for email validation
    const regex =
      /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/;

    if (regex.test(mail)) {
      // this is a valid email address
      void subscribe();
      setValid(true);
    } else {
      // invalid email.
      toast.error('Your email is invalid');
      setValid(false);
    }
  };

  const subscribe = async (): Promise<void> => {
    setLoading(true);

    try {
      const data = await axios.put('api/mailingList', {
        mail,
      });

      if (data.status === 200) {
        toast.success('You have been added to our mailing list. Welcome 👋');
        setLoading(false);
        setMail('');
      }
    } catch (error: unknown) {
      const errorChecked = error as AxiosError;
      const errorMessage = errorChecked.response as ErrorAxios;

      if (errorMessage.data.error) {
        toast.error(errorMessage.data.error);
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex flex-col m-auto my-10 mt-24">
      <h2 className="text-3xl font-bold text-center uppercase md:text-4xl font-title">
        Stay Tuned
      </h2>
      <Image src={Mailing as string} alt="Mail" />
      <label className="label">
        <p className="max-w-md m-auto text-center">
          Want to be the first to know when SupaNexTail launches and get an
          exclusive discount? Sign up for the newsletter!
        </p>
      </label>
      <div className="m-auto mt-5">
        <input
          onChange={(event) => {
            setMail(event.target.value);
          }}
          type="email"
          placeholder="Your email"
          className={`input input-primary input-bordered ${
            valid ? '' : 'input-error'
          }`}
        />
        <button
          onClick={validateEmail}
          className={`btn ml-3 ${
            loading ? 'btn-disabled loading' : 'btn-primary'
          }`}>
          I'm in!
        </button>
      </div>
    </div>
  );
};

export default MailingList;
