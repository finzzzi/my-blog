import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Blog Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <span className="text-xl font-bold text-gray-800">My Blog</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition">
            Blog
          </Link>
          <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition">
            Categories
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">
            About
          </Link>
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button - would typically toggle a mobile menu */}
          <button className="text-gray-600 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;