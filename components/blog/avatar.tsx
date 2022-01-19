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
        className="w-12 h-12 rounded-full"
        alt={name}
        width={48}
        height={48}
      />
      <div className="ml-3 font-medium">{name}</div>
    </div>
  );
};

export default Avatar;
