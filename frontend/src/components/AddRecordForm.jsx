import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from './ui/Button';
import Input from './ui/Input';
import Modal from './ui/Modal';
import PopupDatePicker from './ui/PopupDatePicker';
import { useForm, Controller } from 'react-hook-form';
import { createRecord } from '../api/apis';
import { formatISO } from 'date-fns';
import toast from 'react-hot-toast';

export default function AddRecordForm({ isOpen, setIsOpen }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      patientId: '',
      patientName: '',
      diagnosis: '',
      department: '',
      status: '',
      dateOfBirth: '',
      admissionDate: '',
      dischargeDate: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return createRecord(data);
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['records'] });
      reset();
    },
    onError: (error) => {
      console.log(error);
      toast.error('Failed to add record', error.message);
    },
  });

  const onSubmit = (data) => {
    data.dateOfBirth = formatISO(data.dateOfBirth, {
      representation: 'date',
    });
    data.admissionDate = formatISO(data.admissionDate, {
      representation: 'date',
    });
    data.dischargeDate = formatISO(data.dischargeDate, {
      representation: 'date',
    });

    mutate(data);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    <Modal title={'Add new record'} isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        className='flex flex-col gap-4 overflow-y-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col lg:flex-row items-center gap-4 w-full'>
          <div className='w-full'>
            <Input
              label='Patient Id'
              placeholder='P###'
              {...register('patientId', {
                required: 'Patient ID is required',
                pattern: {
                  value: /^P\d+$/,
                  message: 'Patient ID must be in format P###',
                },
              })}
            />
            {errors.patientId && (
              <span className='text-red-500 text-xs'>
                {errors.patientId.message}
              </span>
            )}
          </div>

          <div className='w-full'>
            <Input
              label='Patient Name'
              placeholder='John Doe'
              {...register('patientName', {
                required: 'Patient Name is required',
                minLength: {
                  value: 2,
                  message: 'Patient Name must be at least 2 characters',
                },
              })}
            />
            {errors.patientName && (
              <span className='text-red-500 text-xs'>
                {errors.patientName.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <Controller
            control={control}
            name='dateOfBirth'
            render={({ field }) => (
              <PopupDatePicker
                label='Date of Birth'
                date={field.value}
                onChange={field.onChange}
                maxDate={yesterday}
              />
            )}
          />
        </div>

        <div>
          <textarea
            className='border border-gray-300 rounded-md p-2 max-h-[300px] min-h-[50px] w-full'
            placeholder='diagnosis'
            {...register('diagnosis', {
              required: 'Diagnosis is required',
              minLength: {
                value: 2,
                message: 'Diagnosis must be at least 2 characters',
              },
            })}
          />
          {errors.diagnosis && (
            <span className='text-red-500 text-xs'>
              {errors.diagnosis.message}
            </span>
          )}
        </div>

        <div className='flex flex-col lg:flex-row items-center gap-4'>
          <Controller
            control={control}
            name='admissionDate'
            render={({ field }) => (
              <PopupDatePicker
                label='Admission Date'
                date={field.value}
                onChange={field.onChange}
                maxDate={yesterday}
              />
            )}
          />
          <Controller
            control={control}
            name='dischargeDate'
            render={({ field }) => (
              <PopupDatePicker
                label='Discharge Date'
                date={field.value}
                onChange={field.onChange}
                maxDate={yesterday}
              />
            )}
          />
        </div>

        <div>
          <select
            className='border border-gray-300 rounded-md p-2 w-full'
            defaultValue=''
            {...register('status', { required: 'Status is required' })}
          >
            <option value='' disabled>
              Select Status
            </option>
            <option value='Active'>Active</option>
            <option value='Discharged'>Discharged</option>
            <option value='Pending'>Pending</option>
            <option value='Cancelled'>Cancelled</option>
          </select>
          {errors.status && (
            <span className='text-red-500 text-xs'>
              {errors.status.message}
            </span>
          )}
        </div>

        <div className='w-full'>
          <Input
            label='Department'
            placeholder='e.g. Cardiology'
            {...register('department', {
              required: 'Department is required',
              minLength: {
                value: 2,
                message: 'Department must be at least 2 characters',
              },
            })}
          />
          {errors.department && (
            <span className='text-red-500 text-xs'>
              {errors.department.message}
            </span>
          )}
        </div>

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Record'}
        </Button>
      </form>
    </Modal>
  );
}
