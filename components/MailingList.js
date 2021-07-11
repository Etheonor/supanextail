/*
This is the form component to register an email adress to your mailing list. 
This is just the frontend, and the email will be send to our backend API (/api/mailingList)
*/

import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const MailingList = () => {
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  const validateEmail = () => {
    // Regex patern for email validation
    let regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(mail)) {
      // this is a valid email address
      subscribe();
      setValid(true);
    } else {
      // invalid email.
      toast.error("Your email is invalid");
      setValid(false);
    }
  };

  const subscribe = () => {
    setLoading(true);
    axios
      .put("api/mailingList", {
        mail,
      })
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className='my-10'>
      <hr className='my-5' />
      <h2 className='text-3xl md:text-3xl font-semibold font-title'>
        Stay Tuned!
      </h2>
      <label className='label'>
        <p className='text-lg max-w-xl text-center m-auto leading-9'>
          Want to be the first to know when SupaNexTail launches and get an
          exclusive discount? Sign up for the newsletter!
        </p>
      </label>
      <div className='mt-5'>
        <input
          onChange={(e) => {
            setMail(e.target.value);
          }}
          type='email'
          placeholder='Your email'
          className={`input input-primary input-bordered ${
            valid ? null : "input-error"
          }`}></input>
        <button
          onClick={validateEmail}
          className={`btn ml-3 ${
            loading ? "btn-disabled loading" : "btn-primary"
          }`}>
          I'm in!
        </button>
      </div>
      <hr className='my-5' />
    </div>
  );
};

export default MailingList;
