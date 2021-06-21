/*
This is the contact component. It will allow your user to send you an email. 
We use Sendgrid by default and you'll need to check /api/sendgrid.js and don't forget to add 
the environment variables. 
If you want to change the email provider, don't hesitate to create a new api route and change 
the axios.post here, line 18.
*/

import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const sendEmail = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      axios
        .post("/api/sendgrid", { email, name, message })
        .then((result) => {
          if (result.data.success === true) {
            toast.success(result.data.message);
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.info("Please enter at least one URL", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <div className='font-main container'>
        <div className=' m-auto max-w-lg'>
          <div className='flex justify-center'>
            <h2 className='text-3xl sm:text-5xl text-center mb-5 mt-0 font-bold font-title'>
              Contact
            </h2>
          </div>
          <p className='text-lg font-light leading-8 p-3'>
            Do you have a question about SupaNexTail? A cool feature you'd like
            us to integrate? A bug to report? Don't hesitate!
          </p>
        </div>
        <form className='max-w-4xl m-auto mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 p-5'>
          <div className='flex flex-col max-w-xs'>
            <label className='font-light mb-4 text-left'>Your Name</label>
            <input
              id='name'
              name='name'
              placeholder='Enter your name'
              className='input input-primary input-bordered'></input>
          </div>
          <div className='flex flex-col max-w-xs mb-3'>
            <label className='font-light mb-4 text-left'>Your email</label>
            <input
              id='email'
              name='email'
              placeholder='Enter your email adress'
              className='input input-primary input-bordered'></input>
          </div>
          <div className='flex flex-col col-span-full w-fulll'>
            <label className='font-light mb-4 text-left'>Message</label>
            <textarea
              id='message'
              name='message'
              placeholder='Enter your message here...'
              rows='5'
              className='input input-primary input-bordered resize-none w-full h-32 pt-2'></textarea>
          </div>
          <button
            className='btn btn-primary btn-sm'
            onClick={(e) => {
              e.preventDefault();
              sendEmail();
            }}>
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
