import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { likePost, commentPost } from '../api';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';

function PostCard({ post, onUpdate }) {
  const { user, token } = useContext(AuthContext);

  // ตรวจสอบว่า post และ post.user มีอยู่
  if (!post || !post.user) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 animate-pulse">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/6 mt-1"></div>
            </div>
          </div>
          <div className="mt-4 h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const handleLike = async () => {
    if (!user || !token) {
      toast.error('กรุณาล็อกอินเพื่อกดไลค์');
      return;
    }
    try {
      const response = await likePost(post.id, token);
      toast.success('กดไลค์สำเร็จ!');
      onUpdate(response);
    } catch (error) {
      toast.error(error.message || 'ไม่สามารถกดไลค์ได้');
      console.error('Error in handleLike:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user || !token) {
      toast.error('กรุณาล็อกอินเพื่อแสดงความคิดเห็น');
      return;
    }
    const comment = e.target.comment.value;
    try {
      const response = await commentPost(post.id, comment, token);
      toast.success('แสดงความคิดเห็นสำเร็จ!');
      e.target.reset();
      onUpdate(response);
    } catch (error) {
      toast.error(error.message || 'ไม่สามารถแสดงความคิดเห็นได้');
      console.error('Error in handleComment:', error);
    }
  };

  // ฟังก์ชันสำหรับสร้าง Avatar placeholder
  const getAvatarPlaceholder = (name) => {
    const initials = name ? name.charAt(0).toUpperCase() : '?';
    return initials;
  };

  const isLiked = post.likes?.some(like => like.userId === user?.id);
  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-green-200 mb-4 mx-4 md:mx-8 lg:mx-16 xl:mx-32 max-w-2xl lg:max-w-4xl xl:max-w-5xl hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.user.id}`} className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm">
              {getAvatarPlaceholder(post.user.name)}
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/profile/${post.user.id}`} className="block">
              <h3 className="font-semibold text-gray-900 hover:underline truncate">
                {post.user.name || 'ผู้ใช้ไม่ระบุ'}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm flex items-center">
              {moment(post.createdAt).fromNow()}
              <span className="mx-1">·</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ชุมชนเชียงดาว
              </span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        </div>
      )}

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="relative">
          {post.images.length === 1 ? (
            <img
              src={post.images[0].imageUrl}
              alt="Post"
              className="w-full max-h-96 object-cover"
              onError={e => {
                e.target.onerror = null;
                e.target.src = '/fallback-image.png';
              }}
            />
          ) : post.images.length === 2 ? (
            <div className="grid grid-cols-2 gap-1">
              {post.images.map((image, index) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={`Post ${index + 1}`}
                  className="w-full h-48 object-cover"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/fallback-image.png';
                  }}
                />
              ))}
            </div>
          ) : post.images.length === 3 ? (
            <div className="grid grid-cols-2 gap-1">
              <img
                src={post.images[0].imageUrl}
                alt="Post 1"
                className="w-full h-96 object-cover"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/fallback-image.png';
                }}
              />
              <div className="grid grid-rows-2 gap-1">
                {post.images.slice(1, 3).map((image, index) => (
                  <img
                    key={image.id}
                    src={image.imageUrl}
                    alt={`Post ${index + 2}`}
                    className="w-full h-48 object-cover"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = '/fallback-image.png';
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {post.images.slice(0, 3).map((image, index) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={`Post ${index + 1}`}
                  className="w-full h-32 object-cover"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/fallback-image.png';
                  }}
                />
              ))}
              {post.images.length > 4 && (
                <div className="relative">
                  <img
                    src={post.images[3].imageUrl}
                    alt="Post 4"
                    className="w-full h-32 object-cover"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = '/fallback-image.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">+{post.images.length - 4}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reactions Summary */}
      {(likesCount > 0 || commentsCount > 0) && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            {likesCount > 0 && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                  </div>
                  <span>{likesCount}</span>
                </div>
              </div>
            )}
            {commentsCount > 0 && (
              <div className="flex items-center space-x-1">
                <span>{commentsCount} ความคิดเห็น</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex justify-around">
          <button
            onClick={handleLike}
            disabled={!user || !token}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg flex-1 transition-all duration-200 ${
              isLiked
                ? 'text-green-700 bg-green-50 hover:bg-green-100 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            } ${(!user || !token) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
            </svg>
            <span className="font-medium">ถูกใจ</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg flex-1 text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium">แสดงความคิดเห็น</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg flex-1 text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
            </svg>
            <span className="font-medium">แชร์</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-4 py-3">
        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    {getAvatarPlaceholder(comment.user?.name)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <p className="font-semibold text-sm text-gray-900">
                      {comment.user?.name || 'ผู้ใช้ไม่ระบุ'}
                    </p>
                    <p className="text-gray-800 text-sm">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <button className="hover:underline">ถูกใจ</button>
                    <button className="hover:underline">ตอบกลับ</button>
                    <span>{moment(comment.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-2">ยังไม่มีความคิดเห็น</p>
        )}

        {/* Comment Input */}
        {user && token ? (
          <div className="mt-4 flex space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                {getAvatarPlaceholder(user.name)}
              </div>
            </div>
            <div className="flex-1">
              <form onSubmit={handleComment} className="flex space-x-2">
                <input
                  type="text"
                  name="comment"
                  placeholder="เขียนความคิดเห็น..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm"
                >
                  ส่ง
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm">
              <Link to="/login" className="text-green-600 hover:text-green-700 hover:underline font-medium">
                เข้าสู่ระบบ
              </Link>
              {' '}เพื่อแสดงความคิดเห็น
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;