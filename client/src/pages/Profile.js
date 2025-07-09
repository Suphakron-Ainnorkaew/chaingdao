import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile } from '../api';
import { toast } from 'react-toastify';
import { 
  User, 
  Mail, 
  Calendar, 
  Heart, 
  MapPin, 
  Camera, 
  Edit, 
  Share2, 
  MessageCircle, 
  ArrowLeft,
  Gift,
  UserCheck,
  Loader2
} from 'lucide-react';

function Profile() {
  const { user, token, isLoading } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log('Profile: useEffect - user:', user, 'isLoading:', isLoading, 'userId:', userId);
    if (!user && !isLoading) {
      toast.error('กรุณาล็อกอินก่อน');
      navigate('/login');
    } else if (userId && token) {
      const fetchProfile = async () => {
        try {
          const response = await getUserProfile(userId, token);
          if (response.error) {
            throw new Error(response.error);
          }
          setProfile(response);
        } catch (error) {
          console.error('Profile: Error fetching profile:', error);
          toast.error('ไม่สามารถโหลดโปรไฟล์ได้');
          navigate('/login');
        }
      };
      fetchProfile();
    }
  }, [user, isLoading, userId, token, navigate]);

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

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>กลับ</span>
          </button>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            โปรไฟล์
          </h2>
          <div className="w-16"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          {/* Header with gradient background */}
          <div className="relative h-40 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
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
          <div className="relative -mt-20 flex justify-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <User size={60} className="text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
                <Camera size={20} className="text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {/* Name */}
            <div className="text-center mt-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {profile.name}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                สมาชิกตั้งแต่ {formatDate(profile.createdAt || new Date())}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center mt-8 space-x-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-gray-500">โพสต์</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">256</div>
                <div className="text-sm text-gray-500">ผู้ติดตาม</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">189</div>
                <div className="text-sm text-gray-500">กำลังติดตาม</div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-8 space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">อีเมล</p>
                    <p className="text-gray-800 font-medium">{profile.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-full">
                    <Gift size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">วันเกิด</p>
                    <p className="text-gray-800 font-medium">{new Date(profile.birthDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full">
                    <UserCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">อายุ</p>
                    <p className="text-gray-800 font-medium">{profile.age} ปี</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">เพศ</p>
                    <p className="text-gray-800 font-medium">{genderText(profile.gender)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <div className="flex items-center justify-center space-x-2">
                  <Edit size={20} />
                  <span>แก้ไขโปรไฟล์</span>
                </div>
              </button>
              <button className="bg-white/80 backdrop-blur-sm text-gray-700 py-4 px-6 rounded-2xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;