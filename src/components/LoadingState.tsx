import React from 'react';
import Loader from './ui/loader';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading...", 
  size = 'medium',
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'scale-50',
    medium: 'scale-100', 
    large: 'scale-150'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 z-[9999] bg-background backdrop-blur-sm min-h-screen w-screen' 
    : 'w-full h-full';

  return (
    <div className={`${containerClasses} flex flex-col items-center justify-center space-y-4`}>
      <div className={`${sizeClasses[size]} transform`}>
        <Loader />
      </div>
      <p className="text-foreground/70 text-sm font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingState;
