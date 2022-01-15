/* 
This card is used on the landing page
*/

import { FiStar } from 'react-icons/fi';

type KeyFeatureProperties = {
  children: JSX.Element;
};

const KeyFeature = ({ children }: KeyFeatureProperties): JSX.Element => (
  <div className="flex p-5 mb-5 italic shadow-sm bg-base-100">
    <div className="flex w-12 h-12 p-2 my-auto text-white rounded-sm bg-accent-focus">
      <FiStar className="m-auto text-2xl" />
    </div>
    <div className="m-auto ml-3">{children}</div>
  </div>
);

export default KeyFeature;
