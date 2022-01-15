import { Dialog, Transition } from '@headlessui/react';

import { Fragment } from 'react';

type PaymentModalProperties = {
  open: boolean;
  setPayment: (argument0: boolean) => void;
};

const PaymentModal = ({
  open,
  setPayment,
}: PaymentModalProperties): JSX.Element => {
  function closeModal(): void {
    setPayment(false);
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50"
          onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="inline-block w-full max-w-lg p-8 my-8 overflow-hidden text-left align-middle transition-all transform border-2 shadow-xl rounded-2xl bg-base-100 text-base-content border-accent-focus">
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-2xl font-bold leading-6 text-center">
                  Payment successful 🎉
                </Dialog.Title>
                <div className="mt-2">
                  <p>
                    Your payment has been successfully submitted. Thank you for
                    your support!
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="flex m-auto btn btn-accent"
                    onClick={closeModal}>
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PaymentModal;
