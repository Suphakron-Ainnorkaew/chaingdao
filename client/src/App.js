
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Posts from './pages/Posts';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary: Caught error:', error);
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-4 py-4 bg-gray-200 text-red-500">
          <h1>เกิดข้อผิดพลาดในแอปพลิเคชัน</h1>
          <p>{this.state.error?.message || 'ไม่สามารถแสดงรายละเอียดข้อผิดพลาดได้'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log('App: Rendering App component');
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/profile/:userId"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
