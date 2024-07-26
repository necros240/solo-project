import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  role: 'Customer' | 'Employee' | 'Manager';
  token: string;
}

interface IUserContext {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserRole: (id: string, role: 'Customer' | 'Employee' | 'Manager') => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

type UserAction =
  | { type: 'LOGIN'; payload: IUser }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_ROLE'; payload: { role: 'Customer' | 'Employee' | 'Manager'; id: string } };

const userReducer = (state: IUser | null, action: UserAction): IUser | null => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'UPDATE_ROLE':
      if (state && state._id === action.payload.id) {
        return { ...state, role: action.payload.role };
      }
      return state;
    default:
      return state;
  }
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post<IUser>('/api/users/login', { email, password });
    dispatch({ type: 'LOGIN', payload: data });
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  const updateUserRole = async (id: string, role: 'Customer' | 'Employee' | 'Manager') => {
    await axios.put(`/api/users/${id}/role`, { role });
    if (user && user._id === id) {
      dispatch({ type: 'UPDATE_ROLE', payload: { role, id } });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
