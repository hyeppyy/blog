import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => (
  <div className='flex flex-col items-center pt-[120px] gap-[24px]'>
    <Image
      src={'/images/404.png'}
      alt='404 image'
      className='rounded-3xl object-cover'
      width={300}
      height={100}
      style={{ width: 'auto', height: 'auto' }}
      priority
    />
    <h1 className='text-2xl font-bold dark:text-[var(--primary-dark)]'>
      페이지를 찾을 수 없습니다.
    </h1>
    <Link
      href='/'
      aria-label='메인 페이지로 이동하는 버튼'
      className='text-sm w-fit px-[12px] py-[8px] rounded-lg border border-[var(--gray-01-dark)] dark:border-[var(--gray-03-dark)] text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)] text-center'
    >
      메인 페이지로 이동
    </Link>
  </div>
);

export default NotFound;
