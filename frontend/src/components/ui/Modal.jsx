import { X } from 'lucide-react';

export default function Modal({ title, children, isOpen, setIsOpen }) {
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col gap-4 w-fit min-w-[320px] mx-4 sm:mx-0 sm:min-w-[520px] max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
              <h3 className='text-xl font-bold'>{title}</h3>
              <X onClick={onClose} className='hover:cursor-pointer' />
            </div>
            <>{children}</>
          </div>
        </div>
      )}
    </>
  );
}
