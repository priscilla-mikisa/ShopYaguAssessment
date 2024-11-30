import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdDashboard } from "react-icons/md";
import { FaStore, FaShoppingBag } from "react-icons/fa";
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const id = getCookie('userId') as string | null;
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div className="w-72 h-[100%] bg-customDarkBlue text-white flex flex-col">
      <div className="p-8">
        <div className="flex items-center justify-center mb-12">
          <Image
            src="/images/logo.png"
            width={140}
            height={50}
            alt="Shop Yangu Logo"
            className="mr-2"
          />
        </div>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-8 px-4">
          {[
            { name: 'Dashboard', icon: <MdDashboard />, href: '/components/Dashboard' },
            { name: 'Shops', icon: <FaStore />, href: '/components/Shop' },
            { name: 'Products', icon: <FaShoppingBag />, href: '/components/Products' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setActiveLink(item.href)}
                className={`flex items-center px-6 py-4 rounded-lg text-lg ${
                  activeLink === item.href
                    ? 'bg-white text-customDarkBlue font-bold shadow-md'
                    : 'hover:bg-gray-200 hover:text-customDarkBlue'
                } transition-all group`}
              >
                <span className="mr-6 text-2xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
