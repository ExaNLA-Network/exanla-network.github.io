'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Email obfuscation function
const deobfuscateEmail = (obfuscated: string): string => {
  return obfuscated.split('').reverse().join('').replace(/\[at\]/, '@');
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const obfuscatedEmail = 'ed.hcileuj-zf[ta]alnaxe'; // exanla@fz-juelich.de reversed

  useEffect(() => {
    // Deobfuscate email only on client side
    setEmail(deobfuscateEmail(obfuscatedEmail));
  }, []);

  return (
    <footer className="bg-[#003D66] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">ExaNLA</h2>
            <p className="text-gray-200">
              Exascale Numerical Linear Algebra Collaboration
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/committee" className="text-gray-200 hover:text-white">
                  Committee
                </Link>
              </li>
              <li>
                <Link href="/libraries" className="text-gray-200 hover:text-white">
                  Libraries
                </Link>
              </li>
              <li>
                <Link href="/applications" className="text-gray-200 hover:text-white">
                  Applications
                </Link>
              </li>
              <li>
                <Link href="/benchmarks" className="text-gray-200 hover:text-white">
                  Benchmarks
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-200 hover:text-white">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-200 hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <address className="text-gray-200 not-italic">
              {email ? (
                <p>
                  Email: <a href={`mailto:${email}`} className="hover:text-white underline">{email}</a>
                </p>
              ) : (
                <p className="text-gray-300">Email: Loading...</p>
              )}
              <p className="mt-2">
                Forschungszentrum Jülich GmbH<br />
                Wilhelm-Johnen-Straße<br />
                52428 Jülich<br />
                Germany
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-500">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} ExaNLA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 