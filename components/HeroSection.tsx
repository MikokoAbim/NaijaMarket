import { useState } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Welcome to Nigerian AI Market",
      description: "Discover authentic Nigerian products enhanced by AI technology",
      image: "/images/placeholder.jpg",
      link: "/products"
    },
    {
      id: 2,
      title: "Traditional Meets Modern",
      description: "Experience the fusion of Nigerian craftsmanship and AI innovation",
      image: "/images/placeholder.jpg",
      link: "/about"
    }
  ];
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };
  
  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-900">
      {/* Slide Content */}
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          
          {/* Content */}
          <div className="container-custom h-full flex items-center relative z-20">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                {slide.description}
              </p>
              <Link 
                href={slide.link}
                className="btn-primary inline-flex items-center"
              >
                Shop Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-nigerian-green' : 'bg-gray-400'
              }`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Nigerian Pattern Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-nigerian-green via-ankara-yellow to-ankara-orange z-20"></div>
    </div>
  );
};

export default HeroSection; 