/*
This is the contact component. It will allow your user to send you an email. 
We use Sendgrid by default and you'll need to check /api/sendgrid.js and don't forget to add 
the environment variables. 
If you want to change the email provider, don't hesitate to create a new api route and change 
the axios.post here, line 18.
*/

import axios, { AxiosError } from 'axios';

import { toast } from 'react-toastify';

const sendEmail = async (): Promise<void> => {
  const name = (document.querySelector('#name') as HTMLInputElement).value;
  const email = (document.querySelector('#email') as HTMLInputElement).value;
  const message = (document.querySelector('#message') as HTMLInputElement)
    .value;

  interface EmailData {
    success: boolean;
    message: string;
  }

  interface ErrorAxios {
    data: {
      error: string;
      success: boolean;
    };
  }

  if (name && email && message) {
    try {
      const mail = await axios.post<EmailData>('/api/sendgrid', {
        email,
        name,
        message,
      });
      if (mail.data.success === true) {
        toast.success(mail.data.message);
        (document.querySelector('#name') as HTMLInputElement).value = '';
        (document.querySelector('#email') as HTMLInputElement).value = '';
        (document.querySelector('#message') as HTMLInputElement).value = '';
      }
    } catch (error: unknown) {
      const errorChecked = error as AxiosError;
      const errorMessage = errorChecked.response as ErrorAxios;
      toast.error(errorMessage.data.error);
    }
  } else {
    toast.info('Please fill all the fields ', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const Contact = (): JSX.Element => {
  return (
    <div className="max-w-xl px-5 py-10 m-auto">
      <div>
        <div className="flex justify-center">
          <h2 className="mt-0 mb-5 text-3xl font-bold text-center sm:text-4xl font-title">
            Contact
          </h2>
        </div>
        <p className="m-auto text-center">
          Do you have a question about SupaNexTail? A cool feature you'd like us
          to integrate? A bug to report? Don't hesitate!
        </p>
      </div>
      <form className="grid grid-cols-1 gap-4 p-5 m-auto mt-5 md:grid-cols-2">
        <div className="flex flex-col max-w-xs">
          <p className="mb-4 font-light text-left">Your Name</p>
          <input
            id="name"
            name="name"
            placeholder="Enter your name"
            className="input input-primary input-bordered"
          />
        </div>
        <div className="flex flex-col max-w-xs mb-3">
          <p className="mb-4 font-light text-left">Your email</p>
          <input
            id="email"
            name="email"
            placeholder="Enter your email adress"
            className="input input-primary input-bordered"
          />
        </div>
        <div className="flex flex-col col-span-full w-fulll">
          <p className="mb-4 font-light text-left">Message</p>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message here..."
            rows={5}
            className="w-full h-32 pt-2 resize-none input input-primary input-bordered"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={(event) => {
            event.preventDefault();
            void sendEmail();
          }}>
          Submit{' '}
        </button>
      </form>
    </div>
  );
};

export default Contact;
