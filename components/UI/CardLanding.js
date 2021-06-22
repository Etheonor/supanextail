import Image from "next/image";

const CardLanding = (props) => {
  return (
    <div className='w-80 shadow-md h-48 p-5 sm:ml-5 mb-5 font-bold bg-base-100'>
      <Image src={props.image} width={props.image.width * 0.7} />
      <p className='mt-3'>{props.text}</p>
    </div>
  );
};

export default CardLanding;
