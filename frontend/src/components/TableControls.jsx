import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

export default function TableControls() {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const [status, setStatus] = useQueryState('status', { defaultValue: '' });
  const [department, setDepartment] = useQueryState('department', {
    defaultValue: '',
  });
  return (
    <div className='flex flex-col sm:flex-row gap-3 w-full'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary' />
        <input
          type='text'
          placeholder='Search patients...'
          className='w-full pl-9 pr-4 py-2 rounded-lg border border-secondary/40 text-sm text-accent placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select
        className='px-3 py-2 rounded-lg border border-secondary/40 text-sm text-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value=''>All Statuses</option>
        <option value='Active'>Active</option>
        <option value='Discharged'>Discharged</option>
        <option value='Pending'>Pending</option>
        <option value='Cancelled'>Cancelled</option>
      </select>
      <input
        type='text'
        placeholder='Filter by department...'
        className='px-3 py-2 rounded-lg border border-secondary/40 text-sm text-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
    </div>
  );
}
