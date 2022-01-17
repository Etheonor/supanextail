import Image from 'next/image';

type Properties = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Properties): JSX.Element => {
  return (
    <div className="flex items-center">
      <Image
        src={picture}
        className="w-12 h-12 rounded-full mr-4"
        alt={name}
        width={48}
        height={48}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
