import Post from 'types/post';
import PostPreview from './post-preview';

type Properties = {
  posts: Post[];
};

const MoreStories = ({ posts }: Properties): JSX.Element => {
  return (
    <section>
      <h2 className="mb-8 text-2xl md:text-4xl font-semibold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map(
          (post) =>
            post && (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            )
        )}
      </div>
    </section>
  );
};

export default MoreStories;
