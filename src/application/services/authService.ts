
import { User, AuthUser } from "@/domain/models/user";

// These functions would eventually call the backend API
export const loginUser = async (email: string, password: string): Promise<AuthUser> => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to login');
  }

  const data = await response.json();

  return {
    id: data.user.username,
    username: data.user.username,
    email: data.user.email,
    name: data.user.name,
    createdAt: new Date(), // or use server time if available: new Date(data.user.createdAt)
  };
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<AuthUser> => {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      name: username, // or pass real name from your form
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to register user');
  }

  const data = await response.json();
  console.log(response)
  return {
    id: data.user.username, // assuming username is unique
    username: data.user.username,
    email: data.user.email,
    name: data.user.name,
    createdAt: new Date(), // or data.user.createdAt if available
  };
};

export const logoutUser = async (): Promise<void> => {
  // Mock implementation until backend is integrated
  return Promise.resolve();
};

export const getCurrentUser = (): AuthUser | null => {
  const userJson = localStorage.getItem("currentUser");
  if (userJson) {
    return JSON.parse(userJson) as AuthUser;
  }
  return null;
};

export const saveUserToStorage = (user: AuthUser): void => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeUserFromStorage = (): void => {
  localStorage.removeItem("currentUser");
};
