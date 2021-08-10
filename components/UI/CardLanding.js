/*
This card is used on the landing page
*/

import Image from 'next/image';

const CardLanding = (props) => {
  const { image, title, text } = props;
  return (
    <div className="w-80 h-48 p-5 sm:ml-5 mb-5 bg-base-100 flex">
      <div>
        <div className="rounded-full w-12 h-12 border flex bg-neutral-content">
          <div className="m-auto flex">
            <Image src={image} width={24} height={24} />
          </div>
        </div>
      </div>
      <div className="ml-8">
        <p className="font-semibold font-title text-lg">{title}</p>
        <p className="mt-3">{text}</p>
      </div>
    </div>
  );
};

export default CardLanding;
