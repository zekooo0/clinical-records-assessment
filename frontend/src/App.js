import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRecords } from './api/apis';
import './App.css';
import AddRecordForm from './components/AddRecordForm';
import Button from './components/ui/Button';
import ReusableTable from './components/ReusableTable';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenForm = () => {
    setIsOpen(true);
  };

  const {
    data: records,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['records'],
    queryFn: getRecords,
  });

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
  ];
  return (
    <div className='App'>
      <header className='App-header flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-primary'>
          Q-Centrix Clinical Records Management
        </h1>
        <Button onClick={onOpenForm}>Add Record</Button>
        <AddRecordForm isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>

      <div className='flex items-center justify-center'>
        {records?.data?.data?.length > 0 && (
          <ReusableTable data={records?.data?.data} columns={columns} />
        )}
      </div>
    </div>
  );
}

export default App;
