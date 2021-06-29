import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const MailingList = () => {
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(false);

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
          type='text'
          placeholder='Your email'
          className='input input-primary input-bordered'></input>
        <button
          onClick={subscribe}
          className={`btn ml-3 ${
            loading ? "btn-disabled loading" : "btn-primary"
          }`}>
          I'm in!
        </button>
      </div>
    </div>
  );
};

export default MailingList;
