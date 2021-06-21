/*
This is the pricing component. 
You can switch between flat payment or subscription by setting the flat variable.
*/

import { Switch } from "@headlessui/react";
import { useState } from "react";

const Pricing = () => {
  const [enabled, setEnabled] = useState(false);
  const flat = false;
  const pricing = {
    monthly: {
      personal: "$5/mo",
      team: "15/mo",
      pro: "35/mo",
    },
    yearly: {
      personal: "$50/yr",
      team: "$150/yr",
      pro: "$350/yr",
    },
    flat: {
      personal: "€49",
      team: "€99",
      pro: "€149",
    },
  };
  return (
    <div className='w-full mx-auto px-5 py-10 mb-10'>
      <div className='text-center max-w-xl mx-auto'>
        <h1 className='text-3xl sm:text-5xl font-bold font-title mb-5'>
          Pricing
        </h1>
        <h3 className='text-lg font-light leading-8 p-3 mb-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit repellat
          dignissimos laboriosam odit accusamus porro
        </h3>
      </div>
      {!flat && (
        <div className='flex justify-between max-w-xs m-auto mb-3'>
          <div>
            <p className={`${enabled ? "text-gray-500" : null}`}>
              Billed monthly
            </p>
          </div>
          <div>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`bg-primary relative inline-flex flex-shrink-0 h-[38px] w-[74px] 
            border-2 border-transparent rounded-full cursor-pointer transition-colors 
            ease-in-out duration-200 focus:outline-none focus-visible:ring-2  
            focus-visible:ring-white focus-visible:ring-opacity-75`}>
              <span className='sr-only'>Switch bill</span>
              <span
                aria-hidden='true'
                className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
          </div>
          <div>
            <p className={`${!enabled ? "text-gray-500" : null}`}>
              Billed annually
            </p>
          </div>
        </div>
      )}
      <div className='max-w-4xl mx-auto md:flex space-x-4'>
        <div className='w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col'>
          <div className='w-full flex-grow'>
            <h2 className='text-center font-bold uppercase mb-4'>Personal</h2>
            <h3 className='text-center font-bold text-4xl mb-5'>
              {flat
                ? pricing.flat.personal
                : enabled
                ? pricing.yearly.personal
                : pricing.monthly.personal}
            </h3>
            <ul className='text-sm px-5 mb-8'>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Lorem ipsum
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Dolor sit amet
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <button className='btn btn-primary w-full'>Buy Now</button>
          </div>
        </div>
        <div className='w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col'>
          <div className='w-full flex-grow'>
            <h2 className='text-center font-bold uppercase mb-4'>Team</h2>
            <h3 className='text-center font-bold text-4xl mb-5'>
              {flat
                ? pricing.flat.team
                : enabled
                ? pricing.yearly.team
                : pricing.monthly.team}
            </h3>
            <ul className='text-sm px-5 mb-8'>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Lorem ipsum
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Dolor sit amet
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Consectetur
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Adipisicing
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Elit repellat
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <button className='btn btn-primary w-full'>Buy Now</button>
          </div>
        </div>
        <div className='w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col'>
          <div className='w-full flex-grow'>
            <h2 className='text-center font-bold uppercase mb-4'>Pro</h2>
            <h3 className='text-center font-bold text-4xl mb-5'>
              {flat
                ? pricing.flat.pro
                : enabled
                ? pricing.yearly.pro
                : pricing.monthly.pro}
            </h3>
            <ul className='text-sm px-5 mb-8'>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Lorem ipsum
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Dolor sit amet
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Consectetur
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Adipisicing
              </li>
              <li className='leading-tight'>
                <i className='mdi mdi-check-bold text-lg'></i> Much more...
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <button className='btn btn-primary w-full'>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
