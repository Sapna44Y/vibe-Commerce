import React from 'react';
import { 
  Heart, 
  Github, 
  Twitter, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShoppingBag,
  Shield,
  Truck,
  HeadphonesIcon
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                <ShoppingBag className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Vibe Commerce
                </h3>
                <p className="text-purple-200 text-sm">Shop with Good Vibes ✨</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Your one-stop destination for amazing products with exceptional quality. 
              We're committed to providing the best shopping experience with fast delivery 
              and excellent customer service.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                'About Us',
                'Our Products',
                'Special Offers',
                'New Arrivals',
                'Best Sellers',
                'Clearance Sale'
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <ArrowRight size={14} className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
                  <HeadphonesIcon size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-sm text-gray-400">We're here to help</p>
                </div>
              </li>
              
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors duration-300">
                  <Truck size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-400">On orders over $100</p>
                </div>
              </li>
              
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <div className="bg-purple-500/20 p-2 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Shield size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-gray-400">100% protected</p>
                </div>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-semibold mb-4 text-white">Follow Us</h5>
              <div className="flex gap-3">
                {[
                  { icon: <Twitter size={18} />, color: 'hover:bg-blue-400', href: '#' },
                  { icon: <Facebook size={18} />, color: 'hover:bg-blue-600', href: '#' },
                  { icon: <Instagram size={18} />, color: 'hover:bg-pink-500', href: '#' },
                  { icon: <Github size={18} />, color: 'hover:bg-gray-700', href: '#' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 ${social.color} text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Truck className="text-green-400" size={24} />,
              title: "Free Delivery",
              description: "Free shipping on orders over $100"
            },
            {
              icon: <Shield className="text-blue-400" size={24} />,
              title: "Secure Payment",
              description: "100% secure payment processing"
            },
            {
              icon: <HeadphonesIcon className="text-purple-400" size={24} />,
              title: "24/7 Support",
              description: "Round-the-clock customer service"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">{feature.title}</h5>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400">
              <span>&copy; {currentYear} Vibe Commerce. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart size={14} className="text-red-400 fill-current animate-pulse" /> by Vibe Team
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm mr-2">We accept:</span>
              <div className="flex gap-1">
                {['💳', '🅿️', '💰', '💵'].map((method, index) => (
                  <span key={index} className="text-lg bg-white/10 p-1 rounded">{method}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-3 rounded-xl shadow-2xl border border-white/20 transition-all duration-300 transform hover:scale-110 z-50 group"
        >
          <ArrowRight size={20} className="transform -rotate-90 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative w-full h-16"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25" 
            className="fill-current text-purple-900/50"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5" 
            className="fill-current text-purple-900/30"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-current text-purple-900/20"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;