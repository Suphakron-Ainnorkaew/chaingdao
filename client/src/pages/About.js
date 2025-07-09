import React from 'react';
import { Mountain, Users, Heart, Camera, MessageCircle, Star, Sparkles, TreePine, Sun, Moon, Play, Eye, MapPin, Calendar } from 'lucide-react';
import p1Image from '../assets/p1.png';
import p2Image from '../assets/p2.png';
import p3Image from '../assets/p3.png';
import p4Image from '../assets/p4.png';
import p5Image from '../assets/p5.png';
import p6Image from '../assets/p6.png';
import p7Image from '../assets/p7.png';
import p8Image from '../assets/p8.png';
import p9Image from '../assets/p9.png';
import p10Image from '../assets/p10.png';
import p11Image from '../assets/p11.png';
import p12Image from '../assets/p12.png';
import p13Image from '../assets/p13.png';
import p14Image from '../assets/p14.png';
import p15Image from '../assets/p15.png';
import p16Image from '../assets/p16.png';
function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs with improved animations */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-15 animate-pulse blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-ping blur-md"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-15 animate-pulse blur-lg"></div>
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-300 to-transparent bg-repeat" 
               style={{backgroundImage: `radial-gradient(circle at 50% 50%, rgba(100,100,100,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px'}}></div>
        </div>
        
        {/* More Sparkle Effects */}
        <div className="absolute top-1/4 left-1/4 text-yellow-400 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-pink-400 animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-cyan-400 animate-ping">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="absolute top-1/2 right-1/2 text-purple-400 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      {/* Hero Section with Enhanced Visual Appeal */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            {/* Enhanced Animated Logo */}
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-spin w-32 h-32 blur-md opacity-60"></div>
              <div className="relative w-32 h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                <Mountain className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg">
                <Sun className="w-5 h-5 text-white m-1.5" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse shadow-lg">
                <Moon className="w-5 h-5 text-white m-1.5" />
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-rose-400 to-red-500 rounded-full animate-bounce"></div>
            </div>
            
            {/* Enhanced Animated Title */}
            <div className="relative mb-8">
              <h1 className="text-8xl font-black mb-6 relative">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse blur-sm">
                  เกี่ยวกับ
                </span>
                <span className="relative bg-gradient-to-r from-slate-800 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  เกี่ยวกับ
                </span>
              </h1>
              <div className="absolute -top-6 -right-6 text-yellow-400 animate-bounce">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-4 -left-4 text-pink-400 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            
            {/* Enhanced Animated Subtitle */}
            <div className="flex items-center justify-center space-x-6 mb-12">
              <div className="w-20 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
              <div className="relative">
                <TreePine className="w-10 h-10 text-emerald-500 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
              </div>
              <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ชุมชนออนไลน์สำหรับคนเชียงดาว เพื่อแบ่งปันเรื่องราวและภาพถ่ายสวยงาม
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Photo Focus */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        {/* Enhanced Featured Image Gallery */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                ความงามของเชียงดาว
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
          </div>
          
          {/* Main Featured Image */}
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              <img 
                src={p1Image}
                alt="Beautiful Chiang Dao Landscape" 
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
              
              {/* Enhanced Floating Elements on Image */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce border-2 border-white/30">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center animate-ping">
                <Eye className="w-7 h-7 text-white" />
              </div>
              
              {/* Enhanced Image Info Overlay */}
              <div className="absolute bottom-8 left-8 right-24">
                <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-bold text-lg">ชุมชนเชียงดาว</span>
                          <p className="text-sm text-gray-200">เชียงใหม่, ประเทศไทย</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-bold text-lg">2024</span>
                          <p className="text-sm text-gray-200">ปัจจุบัน</p>
                        </div>
                      </div>
                    </div>
                    <div className="animate-pulse">
                      <Heart className="w-10 h-10 text-pink-400" />
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">
                    ภาพถ่ายจากชุมชนเชียงดาว แสดงถึงความงามและวิถีชีวิตที่เรียบง่ายของคนท้องถิ่น
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Photo Gallery Grid */}
          {(() => {
            const galleryImages = [p14Image, p15Image, p16Image];
            return (
              <div className="grid md:grid-cols-3 gap-6">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-white/20 backdrop-blur-sm">
                      <img 
                        src={img}
                        alt={`Chiang Dao Photo ${idx+2}`} 
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Photo overlay info */}
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-white">
                              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                                <Camera className="w-4 h-4" />
                              </div>
                              <span className="font-semibold text-sm">ภาพ {idx+2}</span>
                            </div>
                            <Play className="w-5 h-5 text-white animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Enhanced Content Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
            <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-10 border border-white/30 hover:border-white/50 transition-all duration-700 hover:transform hover:scale-105 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mr-6 shadow-2xl">
                    <Heart className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-800">พันธกิจของเรา</h2>
              </div>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Chiang Dao Community เป็นแพลตฟอร์มออนไลน์สำหรับชุมชนในอำเภอเชียงดาว เพื่อให้ผู้คนในพื้นที่สามารถแบ่งปันเรื่องราว ประสบการณ์ และภาพถ่ายต่างๆ ร่วมกันได้อย่างง่ายดาย
                </p>
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-32 animate-pulse"></div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  แพลตฟอร์มนี้ถูกออกแบบมาให้ใช้งานง่าย สามารถโพสต์ข้อความ รูปภาพ กดไลค์ และแสดงความคิดเห็นได้ คล้ายกับโซเชียลมีเดียทั่วไป แต่เน้นการเชื่อมต่อภายในชุมชนท้องถิ่น
                </p>
              </div>
            </div>
          </div>

          {/* Team Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
            <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-10 border border-white/30 hover:border-white/50 transition-all duration-700 hover:transform hover:scale-105 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mr-6 shadow-2xl">
                    <Users className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-800">ทีมพัฒนา</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-10">
                พัฒนาโดยทีมงานที่ต้องการส่งเสริมการมีส่วนร่วมในชุมชนเชียงดาว
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full border-4 border-white/30 flex items-center justify-center shadow-xl animate-pulse">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full border-4 border-white/30 flex items-center justify-center shadow-xl animate-pulse">
                    <span className="text-white font-bold text-xl">B</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full border-4 border-white/30 flex items-center justify-center shadow-xl animate-pulse">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg">
                  <span className="text-gray-800 font-semibold text-lg">ทีมท้องถิ่น</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="relative group mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
          <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-6 mb-8">
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                <h2 className="text-5xl font-bold text-gray-800">ฟีเจอร์หลัก</h2>
                <div className="w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
              </div>
              <div className="w-40 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="text-center group/item">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover/item:opacity-70 transition-opacity duration-500"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover/item:scale-110 transition-transform duration-500">
                    <MessageCircle className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-4">แบ่งปันเรื่องราว</h3>
                <p className="text-gray-600 leading-relaxed text-lg">โพสต์ข้อความและรูปภาพได้อย่างง่ายดาย พร้อมเอฟเฟกต์สวยงาม</p>
              </div>

              {/* Feature 2 */}
              <div className="text-center group/item">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 group-hover/item:opacity-70 transition-opacity duration-500"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover/item:scale-110 transition-transform duration-500">
                    <Heart className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-4">โต้ตอบกับชุมชน</h3>
                <p className="text-gray-600 leading-relaxed text-lg">กดไลค์และแสดงความคิดเห็น สร้างปฏิสัมพันธ์ที่มีความหมาย</p>
              </div>

              {/* Feature 3 */}
              <div className="text-center group/item">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50 group-hover/item:opacity-70 transition-opacity duration-500"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover/item:scale-110 transition-transform duration-500">
                    <Star className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-4">เชื่อมต่อท้องถิ่น</h3>
                <p className="text-gray-600 leading-relaxed text-lg">สร้างเครือข่ายในชุมชนเชียงดาว เสริมสร้างความเข้มแข็ง</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="relative inline-flex items-center justify-center space-x-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-16 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-700 border-4 border-white/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <Users className="w-10 h-10 animate-pulse" />
              <span className="text-3xl font-bold">เข้าร่วมชุมชนเชียงดาว</span>
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>
          </div>
          
          {/* Enhanced Floating Elements around CTA */}
          <div className="absolute -top-12 -left-12 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-25 animate-ping"></div>
          <div className="absolute -bottom-8 -right-12 w-18 h-18 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default About;