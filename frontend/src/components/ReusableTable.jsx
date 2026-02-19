import { useReactTable } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/react-table';
import { Search } from 'lucide-react';

export default function ReusableTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row gap-3'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary' />
          <input
            type='text'
            placeholder='Search patients...'
            className='w-full pl-9 pr-4 py-2 rounded-lg border border-secondary/40 text-sm text-accent placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
          />
        </div>
        <select className='px-3 py-2 rounded-lg border border-secondary/40 text-sm text-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'>
          <option value=''>All Statuses</option>
          <option value='Active'>Active</option>
          <option value='Discharged'>Discharged</option>
          <option value='Pending'>Pending</option>
          <option value='Cancelled'>Cancelled</option>
        </select>
        <input
          type='text'
          placeholder='Filter by department...'
          className='px-3 py-2 rounded-lg border border-secondary/40 text-sm text-accent placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
        />
      </div>

      <div className='overflow-x-auto rounded-lg border border-secondary'>
        <table className='w-full text-sm'>
          <thead className='bg-accent text-white'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-4 py-3 text-left font-semibold tracking-wide border-b border-secondary'
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`border-b border-secondary/20 transition-colors hover:bg-primary/10 ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-secondary/5'
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-4 py-3 text-accent'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
