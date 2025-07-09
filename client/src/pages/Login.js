import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Login() {
  const { loginUser, user, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('LoginForm: useEffect - user:', user, 'isLoading:', isLoading);
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success('ล็อกอินสำเร็จ!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'ล็อกอินล้มเหลว');
    }
  };

  console.log('LoginForm: Rendering', isLoading ? 'loading state' : 'form');

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">ล็อกอิน</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">อีเมล</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          ล็อกอิน
        </button>
      </form>
    </div>
  );
}

export default Login;