import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent, query: string) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with contact and account info */}
      <div className="bg-nigerian-green text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +234 123 4567
            </span>
            <span className="hidden md:flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@nigerianaimarket.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/account" className="hover:text-ankara-yellow">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </span>
            </Link>
            <Link href="/vendor/dashboard" className="hover:text-ankara-yellow">
              <span>Vendor Portal</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-12 mr-2">
              <div className="absolute inset-0 bg-ankara-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
            </div>
            <div className="text-nigerian-green font-display">
              <span className="text-xl font-bold">Nigerian</span>
              <span className="text-sm block -mt-1">AI Market</span>
            </div>
          </Link>
          
          {/* Search - larger screens */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form className="relative w-full" onSubmit={(e) => handleSearch(e, searchQuery)}>
              <input 
                type="text" 
                placeholder="Search products or vendors..." 
                className="input pr-10 bg-gray-100 border-0 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
          
          {/* Navigation - larger screens */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/categories/clothing" className="nav-link">Categories</Link>
            <Link href="/products" className="nav-link">Deals</Link>
            <Link href="/about" className="nav-link">Vendors</Link>
            <Link href="/cart" className="relative">
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-ankara-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/cart" className="relative p-2">
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 bg-ankara-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden pt-4 pb-2">
            <form onSubmit={(e) => handleSearch(e, mobileSearchQuery)}>
              <input 
                type="text" 
                placeholder="Search products or vendors..." 
                className="input bg-gray-100 border-0 focus:bg-white"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-4 space-y-3">
            <Link href="/categories/clothing" className="block py-2 px-4 hover:bg-gray-100 rounded-md">Categories</Link>
            <Link href="/products" className="block py-2 px-4 hover:bg-gray-100 rounded-md">Deals</Link>
            <Link href="/about" className="block py-2 px-4 hover:bg-gray-100 rounded-md">Vendors</Link>
            <Link href="/account" className="block py-2 px-4 hover:bg-gray-100 rounded-md">Account</Link>
            <Link href="/vendor/dashboard" className="block py-2 px-4 hover:bg-gray-100 rounded-md">Vendor Portal</Link>
          </nav>
        )}
      </div>
      
      {/* Categories bar - desktop only */}
      <div className="hidden md:block border-t">
        <div className="container-custom">
          <div className="flex justify-between">
            <nav className="flex space-x-8 py-3 text-sm">
              <Link href="/categories/clothing" className="hover:text-nigerian-green">Clothing</Link>
              <Link href="/categories/electronics" className="hover:text-nigerian-green">Electronics</Link>
              <Link href="/categories/food" className="hover:text-nigerian-green">Food & Groceries</Link>
              <Link href="/categories/health" className="hover:text-nigerian-green">Health & Beauty</Link>
              <Link href="/categories/home" className="hover:text-nigerian-green">Home & Kitchen</Link>
              <Link href="/categories/art" className="hover:text-nigerian-green">Art & Crafts</Link>
              <Link href="/categories/services" className="hover:text-nigerian-green">Services</Link>
            </nav>
            <div className="py-3 text-sm">
              <Link href="/help" className="hover:text-nigerian-green flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 