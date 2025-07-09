
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Mountain,
  Home,
  FileText,
  Info,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  MapPin,
  Camera,
  Users,
  TreePine,
  Sun,
  Cloud,
} from 'lucide-react';

function Navbar() {
  const { user, logout, isLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Navbar: user state changed:', user);
  }, [user]);

  const handleLogout = () => {
    console.log('Navbar: handleLogout called');
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleLoginClick = () => {
    console.log('Navbar: handleLoginClick called');
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Navbar: toggleMenu, isMenuOpen:', !isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    console.log('Navbar: closeMenu');
  };

  if (isLoading) {
    console.log('Navbar: isLoading true, rendering loading state');
    return (
      <div className="container mx-auto px-4 py-4 bg-gray-200 text-gray-700">
        กำลังโหลด...
      </div>
    );
  }

  console.log('Navbar: Rendering with user:', user);

  return (
    <nav className="relative overflow-hidden bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-500 to-green-600">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-400 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg viewBox="0 0 1200 200" className="absolute bottom-0 w-full h-full">
            <path d="M0,200 L0,120 L100,60 L200,100 L300,40 L400,80 L500,20 L600,70 L700,30 L800,90 L900,50 L1000,110 L1100,70 L1200,100 L1200,200 Z" 
                  fill="rgba(34, 197, 94, 0.8)" />
            <path d="M0,200 L0,140 L150,80 L250,120 L350,60 L450,100 L550,40 L650,90 L750,50 L850,110 L950,70 L1050,130 L1150,90 L1200,120 L1200,200 Z" 
                  fill="rgba(34, 197, 94, 0.6)" />
            <path d="M0,200 L0,160 L200,100 L300,140 L400,80 L500,120 L600,60 L700,110 L800,70 L900,130 L1000,90 L1100,150 L1200,110 L1200,200 Z" 
                  fill="rgba(34, 197, 94, 0.4)" />
          </svg>
        </div>
        <div className="absolute top-4 left-20 opacity-30">
          <Cloud className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="absolute top-6 right-32 opacity-40">
          <Cloud className="w-6 h-6 text-white animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        <div className="absolute top-8 left-1/2 opacity-20">
          <Cloud className="w-10 h-10 text-white animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        <div className="absolute top-4 right-8 opacity-80">
          <Sun className="w-8 h-8 text-yellow-200 animate-spin" style={{animationDuration: '20s'}} />
        </div>
        <div className="absolute bottom-16 left-16 opacity-40">
          <TreePine className="w-6 h-6 text-green-800" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-30">
          <TreePine className="w-8 h-8 text-green-800" />
        </div>
      </div>
      <div className="absolute inset-0 bg-opacity-10 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center space-x-3 text-white hover:text-yellow-200 transition-all duration-300 group">
            <div className="bg-opacity-20 p-3 rounded-full group-hover:bg-opacity-30 transition-all backdrop-blur-sm border border-white border-opacity-20 group-hover:scale-110">
              <Mountain className="w-7 h-7" />
            </div>
            <div className="hidden md:block">
              <div className="text-2xl font-bold drop-shadow-lg">เชียงดาว</div>
              <div className="text-sm text-blue-100 drop-shadow-md">Chiang Dao Community</div>
            </div>
            <div className="md:hidden">
              <div className="text-xl font-bold drop-shadow-lg">เชียงดาว</div>
            </div>
          </a>
          <div className="hidden md:flex items-center space-x-2">
            <a
              href="/"
              className="flex items-center space-x-2 px-5 py-3 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-transparent hover:border-white hover:border-opacity-30 hover:shadow-lg"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">หน้าแรก</span>
            </a>
            <a
              href="/posts"
              className="flex items-center space-x-2 px-5 py-3 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-transparent hover:border-white hover:border-opacity-30 hover:shadow-lg"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">โพสต์</span>
            </a>
            <a
              href="/about"
              className="flex items-center space-x-2 px-5 py-3 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-transparent hover:border-white hover:border-opacity-30 hover:shadow-lg"
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">เกี่ยวกับ</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {user && user.id ? (
              <>
                <a
                  href={`/profile/${user.id}`}
                  className="flex items-center space-x-2 px-5 py-3 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-transparent hover:border-white hover:border-opacity-30 hover:shadow-lg"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">โปรไฟล์</span>
                </a>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 px-5 py-3 text-white hover:bg-red-500 hover:bg-opacity-80 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-transparent hover:border-red-300 hover:border-opacity-50 hover:shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">ออกจากระบบ</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center space-x-2 px-6 py-3 bg-opacity-20 text-white hover:bg-opacity-30 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white border-opacity-30 hover:shadow-lg font-medium"
              >
                <LogIn className="w-5 h-5" />
                <span>ล็อกอิน</span>
              </button>
            )}
          </div>
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-yellow-200 transition-all duration-300 p-2 rounded-lg hover:bg-opacity-20 backdrop-blur-sm"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-opacity-10 backdrop-blur-sm shadow-2xl border-t border-white border-opacity-20 rounded-b-2xl mx-4">
            <div className="px-4 py-6 space-y-3">
              <a
                href="/"
                onClick={closeMenu}
                className="w-full flex items-center space-x-3 px-5 py-4 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">หน้าแรก</span>
              </a>
              <a
                href="/posts"
                onClick={closeMenu}
                className="w-full flex items-center space-x-3 px-5 py-4 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">โพสต์</span>
              </a>
              <a
                href="/about"
                onClick={closeMenu}
                className="w-full flex items-center space-x-3 px-5 py-4 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Info className="w-5 h-5" />
                <span className="font-medium">เกี่ยวกับ</span>
              </a>
              <div className="border-t border-white border-opacity-20 pt-4 mt-4">
                {user && user.id ? (
                  <>
                    <a
                      href={`/profile/${user.id}`}
                      onClick={closeMenu}
                      className="w-full flex items-center space-x-3 px-5 py-4 text-white hover:bg-opacity-20 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">โปรไฟล์</span>
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-5 py-4 text-white hover:bg-red-500 hover:bg-opacity-80 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">ออกจากระบบ</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="w-full flex items-center space-x-3 px-5 py-4 bg-opacity-20 text-white hover:bg-opacity-30 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30 font-medium"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>ล็อกอิน</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:block bg-opacity-10 backdrop-blur-sm border-t border-white border-opacity-20 relative z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-12 text-white text-sm">
            <div className="flex items-center space-x-2 hover:text-yellow-200 transition-colors duration-300">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">อำเภอเชียงดาว จังหวัดเชียงใหม่</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-yellow-200 transition-colors duration-300">
              <Camera className="w-4 h-4" />
              <span className="font-medium">แชร์ภาพการท่องเที่ยว</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-yellow-200 transition-colors duration-300">
              <Users className="w-4 h-4" />
              <span className="font-medium">ชุมชนนักท่องเที่ยว</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-yellow-200 transition-colors duration-300">
              <TreePine className="w-4 h-4" />
              <span className="font-medium">ธรรมชาติอันงดงาม</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;