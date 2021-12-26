import Image from 'next/image';
import authImage from 'public/auth.png';

const AuthText = (): JSX.Element => (
  <div className="flex flex-col max-w-lg text-xl lg:mt-0">
    <div className="m-auto mt-10 mb-3">
      <Image
        src={authImage}
        width={authImage.width / 1.5}
        height={authImage.height / 1.5}
        alt="A rocketship"
      />
    </div>
    <h2 className="text-4xl font-semibold text-center font-title">
      Join SupaNexTail for <span className="text-primary">free</span>!
    </h2>
    <p className="mt-8 mb-5 leading-9">
      Create your website in a few minutes with our boilerplate. You can use the
      login system, this will allow you to discover the sample dashboard page.
    </p>
  </div>
);

export default AuthText;
