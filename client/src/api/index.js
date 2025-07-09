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
    return await response.json();
  } catch (error) {
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
    return await response.json();
  } catch (error) {
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
    return await response.json();
  } catch (error) {
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
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getRecentPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts/all`);
    return await response.json();
  } catch (error) {
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
    return await response.json();
  } catch (error) {
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
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    return await response.json();
  } catch (error) {
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
    return await response.json();
  } catch (error) {
    throw error;
  }
};