import { Sun, Github } from 'lucide-react';

const Home = () => (
  <div>
    <header className='flex items-center justify-between pt-[0px] pr-[20px] pb-[0px] pl-[20px] h-[52px]'>
      <span>logo</span>
      <div className='flex gap-4'>
        portfolio
        <Sun />
        <Github />
      </div>
    </header>
    <main className='p-[20px] max-w-[1200px] m-0 mx-auto'>메인영역</main>
    <footer></footer>
  </div>
);

export default Home;
