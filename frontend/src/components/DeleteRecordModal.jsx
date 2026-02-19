import { useMutation } from '@tanstack/react-query';
import Modal from './ui/Modal';
import { deleteRecord } from '../api/apis';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteRecordModal({ isOpen, setIsOpen, record }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteRecord(record.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });

  const onDelete = () => {
    deleteMutation.mutate();
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Delete Record'>
      <div className='flex flex-col gap-4'>
        <p className='text-black text-lg font-medium'>
          Are you sure you want to delete this record?
        </p>
        <div className='flex gap-2 justify-end'>
          <button
            onClick={() => setIsOpen(false)}
            className='px-4 py-2 rounded-lg cursor-pointer bg-black text-white'
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={deleteMutation.isPending}
            className='px-4 py-2 rounded-lg cursor-pointer bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed'
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
