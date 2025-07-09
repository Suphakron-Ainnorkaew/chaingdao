import React, { useState, useEffect } from 'react';
import { getAllPosts, createPost } from '../api';
import PostCard from '../components/PostCard';
import { toast } from 'react-toastify';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImages, setNewPostImages] = useState([]);
  const [posting, setPosting] = useState(false);
  // ดึง token จาก localStorage (หรือ context)
  const token = localStorage.getItem('token');
  const handleCreatePost = async () => {
    if (!newPostContent.trim() && newPostImages.length === 0) {
      toast.error('กรุณากรอกข้อความหรือเลือกรูปภาพ');
      return;
    }
    setPosting(true);
    try {
      const formData = new FormData();
      formData.append('content', newPostContent);
      for (let i = 0; i < newPostImages.length; i++) {
        formData.append('images', newPostImages[i]);
      }
      const post = await createPost(formData, token);
      setPosts([post, ...posts]);
      setNewPostContent("");
      setNewPostImages([]);
      toast.success('โพสต์สำเร็จ!');
    } catch (error) {
      toast.error('โพสต์ไม่สำเร็จ');
    } finally {
      setPosting(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
          return;
        }

        // กรองโพสต์ที่มี user และ comments ที่มี user ครบถ้วน
        const filteredPosts = response.filter(post =>
          post &&
          post.user &&
          post.user.name &&
          Array.isArray(post.comments) &&
          post.comments.every(comment => comment.user && comment.user.name)
        );
        setPosts(filteredPosts);
        setLoading(false);
      } catch (error) {
        toast.error('ไม่สามารถโหลดโพสต์ได้');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts =>
      posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-green-100">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">ชุมชนเชียงดาว</h1>
                  <p className="text-gray-600 text-sm">แลกเปลี่ยนข้อมูลข่าวสารในชุมชน</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  🏔️ อำเภอเชียงดาว
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  🌿 ชุมชนออนไลน์
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">กำลังโหลดโพสต์...</h2>
            <p className="text-gray-600">รอสักครู่ กำลังดึงข้อมูลจากชุมชน</p>
          </div>

          {/* Loading Skeleton */}
          <div className="mt-8 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-green-200 mx-4 md:mx-8 lg:mx-16 xl:mx-32 max-w-2xl lg:max-w-4xl xl:max-w-5xl animate-pulse">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="flex space-x-4">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-green-100">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">ชุมชนเชียงดาว</h1>
                  <p className="text-gray-600 text-sm">แลกเปลี่ยนข้อมูลข่าวสารในชุมชน</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  🏔️ อำเภอเชียงดาว
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  🌿 ชุมชนออนไลน์
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">ยังไม่มีโพสต์ในชุมชน</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              เป็นคนแรกที่แชร์ข้อมูลข่าวสารในชุมชนเชียงดาว มาร่วมกันสร้างชุมชนออนไลน์ที่มีชีวิตชีวา
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
                สร้างโพสต์แรก
              </button>
              <button className="px-6 py-3 border border-green-300 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all duration-200">
                เรียนรู้เพิ่มเติม
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ชุมชนเชียงดาว</h1>
                <p className="text-gray-600 text-sm">แลกเปลี่ยนข้อมูลข่าวสารในชุมชน</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                🏔️ อำเภอเชียงดาว
              </div>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                🌿 ชุมชนออนไลน์
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="font-medium">{posts.length}</span>
                <span>โพสต์ทั้งหมด</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
                <span>สมาชิกออนไลน์</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm">อัปเดตล่าสุด: เมื่อสักครู่</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6 mx-4 md:mx-8 lg:mx-16 xl:mx-32 max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="มีอะไรอยากแชร์กับชุมชนบ้าง?"
                  className="w-full bg-gray-100 rounded-full px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200"
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  disabled={posting}
                />
              </div>
              <button
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-60"
                onClick={handleCreatePost}
                disabled={posting}
              >
                {posting ? 'กำลังโพสต์...' : 'โพสต์'}
              </button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                  </svg>
                  <span>รูปภาพ</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={e => setNewPostImages(Array.from(e.target.files))}
                    disabled={posting}
                  />
                </label>
            {/* แสดง preview รูปภาพที่เลือก */}
            {newPostImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {newPostImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                  </svg>
                  <span>แท็กสถานที่</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={handlePostUpdate} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-white border border-green-300 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all duration-200 shadow-sm">
            โหลดโพสต์เพิ่มเติม
          </button>
        </div>
      </div>
    </div>
  );
}

export default Posts;