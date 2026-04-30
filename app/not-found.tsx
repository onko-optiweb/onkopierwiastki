import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='text-center space-y-6'>
        <h1 className='text-6xl font-bold text-primary'>404</h1>
        <p className='text-lg text-neutral-500'>Strona nie została znaleziona.</p>
        <Link
          href='/'
          className='btn btn-primary text-white'
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
