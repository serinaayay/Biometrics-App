import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RegisData {
  email1: string;
  password: string;
  confirmPassword: string;
}

const defaultRegisData: RegisData = {
  email1: '',
  password: '',
  confirmPassword: '',
};

interface RegisContextType {
  regisData: RegisData;
  updateRegisData: (data: Partial<RegisData>) => void;
  resetRegisData: () => void;
}

const RegisContext = createContext<RegisContextType | undefined>(undefined);

interface RegisProviderProps {
  children: ReactNode;
}

export const RegisProvider: React.FC<RegisProviderProps> = ({ children }) => {
  const [regisData, setRegisData] = useState<RegisData>(defaultRegisData);

  const updateRegisData = (data: Partial<RegisData>) => {
    setRegisData((prev) => ({ ...prev, ...data }));
  };

  const resetRegisData = () => {
    setRegisData(defaultRegisData);
  };

  return (
    <RegisContext.Provider value={{ regisData, updateRegisData, resetRegisData }}>
      {children}
    </RegisContext.Provider>
  );
};

// Custom hook to use the context
export const useRegis = (): RegisContextType => {
  const context = useContext(RegisContext);
  if (context === undefined) {
    throw new Error('useRegis must be used within a RegisProvider');
  }
  return context;
};

export const validateRegisData = (data: Partial<RegisData>): string[] => {
  const errors: string[] = [];

  if (!data.email1?.trim()) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(data.email1)) {
    errors.push('Invalid email format');
  }

  if (!data.password?.trim()) {
    errors.push('Password is required');
  } else if (data.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!data.confirmPassword?.trim()) {
    errors.push('Confirm password is required');
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
};