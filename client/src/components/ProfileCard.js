import React from 'react';
import { User, Calendar, Heart, MapPin, Camera, Edit, Share2, MessageCircle } from 'lucide-react';

function ProfileCard({ user = {
} }) {
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const genderText = (gender) => {
    switch(gender) {
      case 'MALE': return 'ชาย';
      case 'FEMALE': return 'หญิง';
      default: return 'อื่นๆ';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* Header with gradient background */}
      <div className="relative h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-all">
            <Share2 size={18} className="text-white" />
          </button>
          <button className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-all">
            <Edit size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-16 flex justify-center">
        <div className="relative">
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 p-1.5 rounded-full">
            <Camera size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Name and Bio */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {user.name}
          </h2>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            {user.bio || 'ไม่มีคำอธิบาย'}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center mt-6 space-x-8">
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">{user.posts}</div>
            <div className="text-xs text-gray-500">โพสต์</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-pink-600">{user.followers}</div>
            <div className="text-xs text-gray-500">ผู้ติดตาม</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{user.following}</div>
            <div className="text-xs text-gray-500">กำลังติดตาม</div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-6 space-y-3">
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ข้อมูลส่วนตัว</p>
                <p className="text-gray-800 font-medium">
                  {genderText(user.gender)} • {user.age} ปี
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                <MapPin size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ที่อยู่</p>
                <p className="text-gray-800 font-medium">{user.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full">
                <Calendar size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">สมัครสมาชิก</p>
                <p className="text-gray-800 font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-2xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <div className="flex items-center justify-center space-x-2">
              <Heart size={18} />
              <span>ติดตาม</span>
            </div>
          </button>
          <button className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-700 py-3 px-4 rounded-2xl font-medium hover:bg-opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;