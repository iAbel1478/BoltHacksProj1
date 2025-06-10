import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Learning Leopards Logo and Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-black font-bold text-sm">Learning<br/>Leopards</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Learning Leopards</h3>
                <p className="text-gray-600">
                  Learning Leopards offers educational games, videos, and activities that help children
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Learning Leopards offers educational games, videos, and activities that help children 
              learn and grow. Our content is designed by education experts to support learning 
              through play.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-400 transition-colors">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-400 transition-colors">
                <span className="text-white font-bold text-sm">@</span>
              </div>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-400 transition-colors">
                <span className="text-white font-bold text-sm">▶</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Games</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Videos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shows</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Activities</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Parents & Teachers</a></li>
            </ul>
          </div>

          {/* Characters */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Popular Characters</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Daniel Tiger</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Wild Kratts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Curious George</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Carl the Collector</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Lyla in the Loop</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Learning Leopards. All rights reserved. | Privacy Policy | Terms of Use
          </div>
          <div className="text-gray-400 text-sm">
            Educational content designed for children ages 2-8
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;