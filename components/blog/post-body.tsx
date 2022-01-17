type Properties = {
  content: string;
};

const PostBody = ({ content }: Properties): JSX.Element => {
  return (
    <div className="max-w-2xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostBody;
