/* 
This card is used on the landing page
*/

import { FiStar } from 'react-icons/fi';

type KeyFeatureProps = {
	children: JSX.Element;
};

const KeyFeature = ({ children }: KeyFeatureProps): JSX.Element => (
	<div className="shadow-sm p-5 mb-5 bg-base-100 flex italic">
		<div className="p-2 bg-accent-focus w-12 h-12 text-white rounded-sm my-auto flex">
			<FiStar className="text-2xl m-auto" />
		</div>
		<div className="m-auto ml-3">{children}</div>
	</div>
);

export default KeyFeature;
