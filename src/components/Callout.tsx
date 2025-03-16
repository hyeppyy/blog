import { ReactNode } from 'react';

interface CalloutProps {
  children: ReactNode;
  color?: 'pink' | 'yellow' | 'gray';
}

const Callout: React.FC<CalloutProps> = ({ children, color = 'pink' }) => {
  const colors = {
    pink: 'bg-[rgba(var(--primary-rgb),0.1)] text-[--primary-deep] dark:text-[--primary-dark]',
    yellow:
      'bg-amber-50 dark:bg-amber-300/10 text-yellow-900 dark:text-yellow-500',
    gray: 'bg-[--gray] dark:bg-gray-300/10 text-[black] dark:text-[--gray-dark]',
  };

  return (
    <div className={`p-[16px] rounded-lg ${colors[color]}`}>{children}</div>
  );
};

export default Callout;
