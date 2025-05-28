'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    // Handle root path specially
    if (path === '/') {
      return pathname === '/';
    }
    // For other paths, check if the pathname starts with the path
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/committee', label: 'Committee' },
    { href: '/libraries', label: 'Libraries' },
    { href: '/applications', label: 'Applications' },
    { href: '/benchmarks', label: 'Benchmarks' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-white h-12 w-12 flex items-center justify-center rounded-full">
                <Image
                  src="/ExaNLA_logo.png"
                  alt="ExaNLA Logo"
                  width={45}
                  height={45}
                  className="h-12 w-12 object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-gray-900">ExaNLA</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
              <Link 
                  key={link.href}
                  href={link.href} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive(link.href) 
                    ? 'bg-[#FFA500] text-white' 
                    : 'text-gray-600 hover:bg-[#FFA500] hover:text-white'
                }`}
              >
                  {link.label}
              </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive(link.href) 
                  ? 'bg-[#FFA500] text-white' 
                  : 'text-gray-300 hover:bg-[#FFA500] hover:text-white'
              }`}
            >
                {link.label}
            </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 