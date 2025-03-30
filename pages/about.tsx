import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import { AIAssistant } from '../components/AIAssistant';

export default function About() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>About Us | Nigerian AI Market</title>
        <meta name="description" content="Learn about Nigerian AI Market, our mission, values, and the team behind our AI-powered e-commerce platform for Nigerian goods." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">About Us</span>
          </div>

          {/* Hero Section */}
          <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('/images/placeholder.jpg')` }}
            ></div>
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container-custom">
                <div className="max-w-lg">
                  <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
                    Our Story
                  </h1>
                  <p className="text-xl text-gray-200">
                    Connecting Nigeria's rich cultural heritage with the world through technology
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="bg-nigerian-green rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-display">Our Mission</h2>
                <p className="text-gray-600">
                  To create an innovative platform that makes Nigerian products accessible globally while empowering local artisans and businesses through technology and fair trade practices.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="bg-ankara-orange rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-display">Our Vision</h2>
                <p className="text-gray-600">
                  To become the leading AI-powered marketplace for authentic Nigerian products, showcasing our cultural heritage to the world while driving sustainable economic growth for local communities.
                </p>
              </div>
            </div>
          </div>
          
          {/* Company Overview */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 font-display">Who We Are</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <p className="text-gray-600 mb-4">
                  Nigerian AI Market was founded in 2023 by a team of technology enthusiasts and cultural advocates passionate about leveraging technology to promote Nigerian craftsmanship and entrepreneurship.
                </p>
                <p className="text-gray-600 mb-4">
                  Our platform combines the power of artificial intelligence with Nigeria's rich cultural heritage to create a unique shopping experience. We've developed advanced AI tools that not only make finding products easier but also provide personalized recommendations based on customer preferences.
                </p>
                <p className="text-gray-600">
                  We work directly with artisans, craftspeople, and vendors across Nigeria's diverse regions, ensuring authentic products that represent our country's cultural diversity. From traditional Adire fabrics to modern fashion inspired by our heritage, we bring the best of Nigeria to customers worldwide.
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 font-display">Key Facts</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="text-nigerian-green mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Founded in 2023</span> in Lagos, Nigeria
                      </div>
                    </li>
                    <li className="flex">
                      <div className="text-nigerian-green mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">200+ vendors</span> from across Nigeria
                      </div>
                    </li>
                    <li className="flex">
                      <div className="text-nigerian-green mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">1,500+ products</span> available on our platform
                      </div>
                    </li>
                    <li className="flex">
                      <div className="text-nigerian-green mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">AI-powered</span> shopping experience
                      </div>
                    </li>
                    <li className="flex">
                      <div className="text-nigerian-green mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Ships to 30+ countries</span> worldwide
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-nigerian-green to-ankara-green rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">Join Our Journey</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Whether you're a customer looking for authentic Nigerian products or a vendor interested in reaching a global audience, we invite you to be part of our story.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className="btn-white-outline">
                Start Shopping
              </Link>
              <Link href="/contact" className="btn-white">
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* AI Assistant Button */}
      <button 
        onClick={openAssistant}
        className="fixed bottom-6 right-6 bg-nigerian-green text-white rounded-full p-4 shadow-lg hover:bg-opacity-90 transition-all z-20"
        aria-label="Open AI Assistant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>
      
      {/* AI Assistant Modal */}
      <AIAssistant isOpen={isOpen} onClose={closeAssistant} />
    </div>
  );
} 