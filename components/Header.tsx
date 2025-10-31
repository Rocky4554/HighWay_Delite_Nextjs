import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="h-[87px] bg-[#F9F9F9] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)] flex justify-between items-center px-[124px] py-4 sticky top-0 z-50">
     
      <Link href="/" className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="Highway Delite" 
          width={150} 
          height={55}
          className="object-contain"
          priority
        />
      </Link>

     
      <SearchBar />
    </header>
  );
}