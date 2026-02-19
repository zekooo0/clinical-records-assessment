import { CalendarDays } from 'lucide-react';
import DatePicker from 'react-datepicker';

export default function PopupDatePicker({ label, date, onChange, ...props }) {
  return (
    <div className='relative w-full flex flex-col items-start gap-2'>
      <label className='text-sm font-medium'>{label}</label>
      <DatePicker
        selected={date}
        onChange={onChange}
        {...props}
        customInput={
          <div className='border border-gray-300 rounded-md px-3 py-2 flex items-center justify-between w-full cursor-pointer'>
            {date ? date.toLocaleDateString() : 'Pick a date'}
            <CalendarDays />
          </div>
        }
        popperProps={{ strategy: 'fixed' }}
        popperPlacement='bottom-start'
        wrapperClassName='w-full'
        showYearDropdown
        dropdownMode='select'
        dateFormat='YYYY-MM-DD'
      />
    </div>
  );
}
