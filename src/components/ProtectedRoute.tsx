import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Login } from '@/components/Login';
import { LoadingState } from '@/components/LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingState message="Loading..." fullScreen size="large" />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return <>{children}</>;
};
