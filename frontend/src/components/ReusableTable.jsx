import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useQueryState } from 'nuqs';

export default function ReusableTable({ data, columns, isLoading }) {
  const [sortBy, setSortBy] = useQueryState('sortBy', { defaultValue: 'id' });
  const [sortOrder, setSortOrder] = useQueryState('sortOrder', {
    defaultValue: 'asc',
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSort = (columnId) => {
    if (sortBy === columnId) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnId);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ columnId }) => {
    if (sortBy !== columnId)
      return <ArrowUpDown className='w-3.5 h-3.5 opacity-40' />;
    return sortOrder === 'asc' ? (
      <ArrowUp className='w-3.5 h-3.5 text-primary' />
    ) : (
      <ArrowDown className='w-3.5 h-3.5 text-primary' />
    );
  };

  return (
    <div className='flex flex-col gap-4 min-w-0'>
      <div className='overflow-x-auto rounded-lg border border-secondary'>
        <table className='min-w-full text-sm'>
          <thead className='bg-accent text-white'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-4 py-3 text-left font-semibold tracking-wide border-b border-secondary'
                  >
                    {header.column.columnDef.enableSorting === false ? (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    ) : (
                      <button
                        className='flex items-center gap-1.5 hover:text-primary/80 transition-colors'
                        onClick={() => onSort(header.id)}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <SortIcon columnId={header.id} />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-secondary/20 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-secondary/5'
                  }`}
                >
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className='px-6 py-3'>
                      <div className='h-4 rounded bg-secondary/20 animate-pulse w-full' />
                    </td>
                  ))}
                </tr>
              ))
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-center py-4'>
                  No records found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`border-b border-secondary/20 transition-colors hover:bg-primary/10 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-secondary/5'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='px-4 py-3 text-accent'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
