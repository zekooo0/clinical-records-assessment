import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from './ui/Button';
import Input from './ui/Input';
import Modal from './ui/Modal';
import PopupDatePicker from './ui/PopupDatePicker';
import { useForm, Controller } from 'react-hook-form';
import { createRecord, updateRecord } from '../api/apis';
import { formatISO } from 'date-fns';
import toast from 'react-hot-toast';

export default function RecordForm({ isOpen, setIsOpen, isEdit, record }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      patientId: isEdit ? record.patientId : '',
      patientName: isEdit ? record.patientName : '',
      diagnosis: isEdit ? record.diagnosis : '',
      department: isEdit ? record.department : '',
      status: isEdit ? record.status : '',
      dateOfBirth: isEdit ? new Date(record.dateOfBirth) : '',
      admissionDate: isEdit ? new Date(record.admissionDate) : '',
      dischargeDate: isEdit ? new Date(record.dischargeDate) : '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return isEdit ? updateRecord(record.id, data) : createRecord(data);
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['records'] });
      reset();
    },
    onError: (error) => {
      const message = error.response?.data?.error ?? 'Failed to save record';
      toast.error(message);
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

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    <Modal
      title={isEdit ? 'Edit record' : 'Add new record'}
      isOpen={isOpen}
      setIsOpen={onCloseModal}
    >
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
            rules={{
              required: 'Date of Birth is required',
              validate: (val) => {
                const admissionDate = getValues('admissionDate');
                if (admissionDate && val >= admissionDate)
                  return 'Date of Birth must be before Admission Date';
              },
            }}
            render={({ field }) => (
              <PopupDatePicker
                label='Date of Birth'
                date={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  trigger('admissionDate');
                }}
                maxDate={yesterday}
              />
            )}
          />
          {errors.dateOfBirth && (
            <span className='text-red-500 text-xs'>
              {errors.dateOfBirth.message}
            </span>
          )}
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
          <div className='w-full'>
            <Controller
              control={control}
              name='admissionDate'
              rules={{
                required: 'Admission Date is required',
                validate: (val) => {
                  const dateOfBirth = getValues('dateOfBirth');
                  const dischargeDate = getValues('dischargeDate');
                  if (dateOfBirth && val <= dateOfBirth)
                    return 'Admission Date must be after Date of Birth';
                  if (dischargeDate && val >= dischargeDate)
                    return 'Admission Date must be before Discharge Date';
                },
              }}
              render={({ field }) => (
                <PopupDatePicker
                  label='Admission Date'
                  date={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    trigger('dischargeDate');
                    trigger('dateOfBirth');
                  }}
                  maxDate={yesterday}
                />
              )}
            />
            {errors.admissionDate && (
              <span className='text-red-500 text-xs'>
                {errors.admissionDate.message}
              </span>
            )}
          </div>
          <div className='w-full'>
            <Controller
              control={control}
              name='dischargeDate'
              rules={{
                required: 'Discharge Date is required',
                validate: (val) => {
                  const admissionDate = getValues('admissionDate');
                  if (admissionDate && val <= admissionDate)
                    return 'Discharge Date must be after Admission Date';
                },
              }}
              render={({ field }) => (
                <PopupDatePicker
                  label='Discharge Date'
                  date={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    trigger('admissionDate');
                  }}
                  maxDate={yesterday}
                />
              )}
            />
            {errors.dischargeDate && (
              <span className='text-red-500 text-xs'>
                {errors.dischargeDate.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <select
            className='border border-gray-300 rounded-md p-2 w-full'
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

        <Button
          type='submit'
          disabled={isPending}
          className={`${isPending ? 'bg-gray-400' : 'bg-primary'}`}
        >
          {isEdit ? 'Update Record' : 'Add Record'}
        </Button>
      </form>
    </Modal>
  );
}
