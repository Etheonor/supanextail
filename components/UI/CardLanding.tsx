/*
This card is used on the landing page
*/

import Image from 'next/image';

type CardLandingProperties = {
  image: string;
  title: string;
  text: string;
};

const CardLanding = ({
  image,
  title,
  text,
}: CardLandingProperties): JSX.Element => {
  return (
    <div className="flex h-48 p-5 mb-5 w-80 sm:ml-5 bg-base-100">
      <div>
        <div className="flex w-12 h-12 border rounded-full bg-neutral-content">
          <div className="flex m-auto">
            <Image src={image} width={24} height={24} alt={`${title} logo`} />
          </div>
        </div>
      </div>
      <div className="ml-8">
        <p className="text-lg font-semibold font-title">{title}</p>
        <p className="mt-3">{text}</p>
      </div>
    </div>
  );
};

export default CardLanding;
