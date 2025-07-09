const API_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('VerifyToken error:', error);
    throw error;
  }
};

export const createPost = async (postData, token) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: postData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('CreatePost error:', error);
    throw error;
  }
};

export const getRecentPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('GetRecentPosts error:', error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('GetAllPosts error:', error);
    throw error;
  }
};

export const likePost = async (postId, token) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('LikePost error:', error);
    throw error;
  }
};

export const commentPost = async (postId, comment, token) => {
  try {
    const response = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId, content: comment }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('CommentPost error:', error);
    throw error;
  }
};

export const getUserProfile = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('GetUserProfile error:', error);
    throw error;
  }
};

export const updatePassword = async (passwordData, token) => {
  try {
    const response = await fetch(`${API_URL}/users/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('UpdatePassword error:', error);
    throw error;
  }
};