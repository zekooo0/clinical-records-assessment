import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRecords } from './api/apis';
import './App.css';
import RecordForm from './components/RecordForm';
import ReusableTable from './components/ReusableTable';
import TableControls from './components/TableControls';
import Pagination from './components/Pagination';
import Button from './components/ui/Button';
import { Trash2, UserRoundPen } from 'lucide-react';
import DeleteRecordModal from './components/DeleteRecordModal';
import Footer from './components/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [record, setRecord] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const [search] = useQueryState('search');
  const [status] = useQueryState('status');
  const [department] = useQueryState('department');
  const [sortBy] = useQueryState('sortBy');
  const [sortOrder] = useQueryState('sortOrder');
  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: Number,
  });

  const {
    data: records,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['records', search, status, department, sortBy, sortOrder, page],
    queryFn: () =>
      getRecords({ search, status, department, sortBy, sortOrder, page }),
  });

  const pagination = records?.data?.pagination;

  const columns = [
    {
      accessorKey: 'patientId',
      header: 'Patient ID',
    },
    {
      accessorKey: 'patientName',
      header: 'Patient Name',
    },
    {
      accessorKey: 'dateOfBirth',
      header: 'Date of Birth',
    },
    {
      accessorKey: 'diagnosis',
      header: 'Diagnosis',
    },
    {
      accessorKey: 'admissionDate',
      header: 'Admission Date',
    },
    {
      accessorKey: 'dischargeDate',
      header: 'Discharge Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <button onClick={() => handleEdit(row.original)}>
            <UserRoundPen className='text-secondary' />
          </button>
          <button onClick={() => handleDelete(row.original)}>
            <Trash2 className='text-red-500' />
          </button>
        </div>
      ),
    },
  ];

  const onOpenForm = () => {
    setRecord(null);
    setIsEdit(false);
    setIsOpen(true);
  };

  const handleEdit = (record) => {
    setIsEdit(true);
    setRecord(record);
    setIsOpen(true);
  };

  const handleDelete = (record) => {
    setIsDelete(true);
    setRecord(record);
  };

  return (
    <div className='App flex flex-col'>
      <header className='App-header flex items-center justify-between'>
        <h1 className=' sm:text-xl lg:text-3xl font-bold text-primary'>
          Q-Centrix Clinical Records Management
        </h1>
        <Button onClick={onOpenForm}>Add Record</Button>
      </header>

      <div className='flex flex-col gap-4 w-full max-w-[1200px] mx-auto'>
        <TableControls />
        <ReusableTable
          data={records?.data?.data}
          columns={columns}
          isLoading={isLoading}
        />
        <Pagination
          page={pagination?.page ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </div>
      <RecordForm
        key={record?.id ?? 'new'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={isEdit}
        record={record}
      />
      <DeleteRecordModal
        isOpen={isDelete}
        setIsOpen={setIsDelete}
        record={record}
      />
      <Footer />
    </div>
  );
}

export default App;
