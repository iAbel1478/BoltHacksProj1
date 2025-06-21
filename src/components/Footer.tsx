import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 text-white py-16 border-t-4 border-yellow-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Learning Leopards Logo and Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-full w-16 h-16 flex items-center justify-center shadow-xl border-4 border-yellow-300">
                <span className="text-white font-black text-sm text-center">Learning<br/>Leopards</span>
              </div>
              <div>
                <h3 className="text-3xl font-black drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Learning Leopards
                </h3>
                <p className="text-yellow-100 font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Fun educational games for kids!
                </p>
              </div>
            </div>
            <p className="text-yellow-100 mb-6 font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Learning Leopards offers educational games, videos, and activities that help children 
              learn and grow. Our content is designed by education experts to support learning 
              through play and fun!
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg border-2 border-yellow-300">
                <span className="text-white font-black text-lg">f</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg border-2 border-yellow-300">
                <span className="text-white font-black text-lg">@</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg border-2 border-yellow-300">
                <span className="text-white font-black text-lg">▶</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black mb-6 text-yellow-200 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              🚀 Quick Links
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🎮 Games</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>📺 Videos</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🎭 Shows</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🎨 Activities</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>👨‍👩‍👧‍👦 Parents & Teachers</a></li>
            </ul>
          </div>

          {/* Characters */}
          <div>
            <h4 className="text-xl font-black mb-6 text-yellow-200 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              🦁 Popular Characters
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🐯 Daniel Tiger</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🐾 Wild Kratts</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🐒 Curious George</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>📦 Carl the Collector</a></li>
              <li><a href="#" className="text-yellow-100 hover:text-white transition-colors font-semibold hover:scale-105 transform inline-block" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🔄 Lyla in the Loop</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-4 border-yellow-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-yellow-100 text-sm mb-4 md:mb-0 font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            © 2025 Learning Leopards. All rights reserved. | Privacy Policy | Terms of Use
          </div>
          <div className="text-yellow-100 text-sm font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            🎓 Educational content designed for children ages 2-8
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;