import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api';
import { toast } from 'react-toastify';

function LoginForm() {
  const { login: authLogin, user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    console.log('LoginForm: useEffect - user:', user, 'isLoading:', isLoading);
    if (!isLoading && user && loginSuccess) {
      console.log('LoginForm: Navigating to / after successful login');
      navigate('/');
    }
  }, [user, isLoading, navigate, loginSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log('LoginForm: handleSubmit - Submitting with email:', email.value);
    try {
      const response = await login(email.value, password.value);
      console.log('LoginForm: handleSubmit - API response:', response);
      if (response.error) {
        toast.error(response.error);
      } else {
        authLogin(response.user, response.token);
        setLoginSuccess(true);
        toast.success('ล็อกอินสำเร็จ!');
      }
    } catch (error) {
      console.error('LoginForm: handleSubmit - Error:', error);
      toast.error('เกิดข้อผิดพลาดในการล็อกอิน');
    }
  };

  if (isLoading) {
    console.log('LoginForm: Rendering loading state');
    return (
      <div className="container mx-auto px-4 py-4 bg-gray-200">
        <p className="text-gray-700">กำลังโหลด...</p>
      </div>
    );
  }

  console.log('LoginForm: Rendering form');

  return (
    <div className="container mx-auto px-4 py-4 bg-gray-200">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">ล็อกอิน</h2>
        <div className="mb-4">
          <label className="block text-gray-700">อีเมล</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          ล็อกอิน
        </button>
      </form>
    </div>
  );
}

export default LoginForm;