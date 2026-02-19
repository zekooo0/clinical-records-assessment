import { forwardRef } from 'react';

const Input = forwardRef(({ label, value, onChange, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-2 items-start w-full'>
      <label htmlFor={label} className='text-sm font-medium'>
        {label}
      </label>
      <input
        ref={ref}
        id={label}
        className='border border-gray-300 rounded-md px-3 py-2 w-full'
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
});

export default Input;
