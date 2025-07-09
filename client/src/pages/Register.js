
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { register } from '../api';
import { toast } from 'react-toastify';

function RegisterForm() {
  const { login, user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registerSuccess, setRegisterSuccess] = useState(false);

  useEffect(() => {
    console.log('RegisterForm: useEffect - user:', user, 'isLoading:', isLoading);
    if (!isLoading && user && registerSuccess) {
      console.log('RegisterForm: Navigating to / after successful register');
      navigate('/');
    }
  }, [user, isLoading, navigate, registerSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, birthDate, age, gender } = e.target.elements;
    console.log('RegisterForm: handleSubmit - Submitting with email:', email.value);
    try {
      const response = await register({
        email: email.value,
        password: password.value,
        name: name.value,
        birthDate: birthDate.value,
        age: parseInt(age.value),
        gender: gender.value,
      });
      console.log('RegisterForm: handleSubmit - API response:', response);
      if (response.error) {
        toast.error(response.error);
      } else {
        login(response.user, response.token);
        setRegisterSuccess(true);
        toast.success('สมัครสมาชิกสำเร็จ!');
      }
    } catch (error) {
      console.error('RegisterForm: handleSubmit - Error:', error);
      toast.error('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  if (isLoading) {
    console.log('RegisterForm: Rendering loading state');
    return (
      <div className="container mx-auto px-4 py-4 bg-gray-200 text-gray-700">
        กำลังโหลด...
      </div>
    );
  }

  console.log('RegisterForm: Rendering form');

  return (
    <div className="container mx-auto px-4 py-4 bg-gray-200">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">สมัครสมาชิก</h2>
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
        <div className="mb-4">
          <label className="block text-gray-700">ชื่อ</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">วันเกิด</label>
          <input
            type="date"
            name="birthDate"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">อายุ</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">เพศ</label>
          <select name="gender" className="w-full p-2 border rounded" required>
            <option value="MALE">ชาย</option>
            <option value="FEMALE">หญิง</option>
            <option value="OTHER">อื่นๆ</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          สมัครสมาชิก
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;