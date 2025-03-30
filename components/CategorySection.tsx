import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  link: string;
  color: string;
}

const CategorySection = () => {
  const categories: Category[] = [
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Traditional and modern Nigerian fashion',
      image: '/images/placeholder.jpg',
      count: 150,
      link: '/categories/clothing',
      color: 'bg-ankara-red'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'High-quality electronics and gadgets',
      image: '/images/placeholder.jpg',
      count: 75,
      link: '/categories/electronics',
      color: 'bg-ankara-blue'
    },
    {
      id: 'home',
      name: 'Home & Living',
      description: 'Beautiful items for your home',
      image: '/images/placeholder.jpg',
      count: 200,
      link: '/categories/home',
      color: 'bg-ankara-yellow'
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      description: 'Natural beauty and wellness products',
      image: '/images/placeholder.jpg',
      count: 100,
      link: '/categories/beauty',
      color: 'bg-ankara-green'
    },
    {
      id: 'art',
      name: 'Art & Crafts',
      description: 'Handmade crafts, paintings, sculptures',
      image: '/images/placeholder.jpg',
      link: '/categories/art',
      count: 80,
      color: 'bg-ankara-orange'
    },
    {
      id: 'food',
      name: 'Food & Groceries',
      description: 'Authentic Nigerian ingredients, snacks, and meals',
      image: '/images/placeholder.jpg',
      link: '/categories/food',
      count: 120,
      color: 'bg-nigerian-green'
    },
    {
      id: 'books',
      name: 'Books & Media',
      description: 'Nigerian literature, music, films, and more',
      image: '/images/placeholder.jpg',
      link: '/categories/books',
      count: 90,
      color: 'bg-ankara-purple'
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-3">Explore Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover Nigeria's rich culture and creativity through our carefully curated product categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              href={category.link} 
              key={index}
              className="group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500" 
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className={`w-12 h-1 mb-4 ${category.color}`}></div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm">{category.description}</p>
                </div>
              </div>
              <div className="bg-white p-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Browse Products</span>
                <span className={`${category.color} p-1 rounded-full`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/categories" 
            className="btn-outline inline-flex items-center"
          >
            View All Categories
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 