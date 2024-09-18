import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      {/* Container */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section - Company Info */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold">Spin to Win</h3>
          <p className="text-sm opacity-70">© 2024 SpintoWin. All Rights Reserved.</p>
        </div>
        
        {/* Center Section - Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/about" className="text-sm hover:text-yellow-300">About Us</a>
          <a href="/services" className="text-sm hover:text-yellow-300">Services</a>
          <a href="/contact" className="text-sm hover:text-yellow-300">Contact</a>
        </div>
      </div>

      {/* Bottom Divider and Privacy Links */}
      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="container mx-auto text-center">
          <a href="/privacy" className="text-sm hover:text-yellow-300 mr-4">Privacy Policy</a>
          <a href="/terms" className="text-sm hover:text-yellow-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
