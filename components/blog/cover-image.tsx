import Image from 'next/image';
import Link from 'next/link';

type Properties = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Properties): JSX.Element => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      layout="fill"
      objectFit="contain"
      objectPosition={'center top'}
      quality={100}
    />
  );
  return (
    <div className="sm:mx-0 flex justify-center relative max-w-full h-48">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
