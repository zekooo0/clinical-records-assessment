import { cn } from '../../utils/cn';

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={cn(
        'bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
