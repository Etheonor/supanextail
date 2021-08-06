import Image from "next/image";
import authImage from "public/auth.png";

const AuthText = () => {
  return (
    <div className='lg:mt-0 max-w-lg flex flex-col text-xl'>
      <div className='mt-10 mb-3 m-auto'>
        <Image
          src={authImage}
          width={authImage.width / 1.5}
          height={authImage.height / 1.5}
        />
      </div>
      <h2 className='text-4xl font-title font-semibold text-center'>
        Join SupaNexTail for <span className='text-primary'>free</span>!
      </h2>
      <p className='mb-5 mt-8 leading-9'>
        Create your website in a few minutes with our boilerplate. You can use
        the login system, this will allow you to discover the sample dashboard
        page.
      </p>
    </div>
  );
};

export default AuthText;
