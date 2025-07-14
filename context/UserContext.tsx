import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the user data structure based on the sign up forms
export interface UserData {
  // Personal Information (from SignUp screen)
  fullName: string;
  gender: 'Male' | 'Female' | 'Prefer not to say' | '';
  dateOfBirth: Date;
  placeOfBirth: string;
  nationality: string;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | '';
  temporaryAddress: string;
  permanentAddress: string;
  email: string;
  phoneNumber: string;

  // Educational Background (from SignUp2 screen)
  educationalAttainment: string;
  degree: string;
  university: string;

  // Employment Information (from SignUp2 screen)
  currentJob: string;
  otherJob: string;
  finalJob: string; // This will be used to store the final job choice
  skills: string[];
  workExperience: string;
  sssNumber: string;

  // Account status
  isVerified: boolean;
}

// Default user data
const defaultUserData: UserData = {
  fullName: '',
  gender: '',
  dateOfBirth: new Date(),
  placeOfBirth: '',
  nationality: '',
  maritalStatus: '',
  temporaryAddress: '',
  permanentAddress: '',
  email: '',
  phoneNumber: '',
  educationalAttainment: '',
  degree: '',
  university: '',
  currentJob: '',
  finalJob: '',
  otherJob: '',
  skills: [],
  workExperience: '',
  sssNumber: '',
  isVerified: false,
};

// Context interface
interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    setUserData(defaultUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, resetUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Helper functions for data validation
export const validatePersonalInfo = (data: Partial<UserData>): string[] => {
  const errors: string[] = [];

  if (!data.fullName?.trim()) {
    errors.push('Full name is required');
  }

  if (!data.gender) {
    errors.push('Gender is required');
  }

  if (!data.permanentAddress?.trim()) {
    errors.push('Permanent address is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.phoneNumber?.trim()) {
    errors.push('Phone number is required');
  }

  return errors;
};

export const validateEducationalInfo = (data: Partial<UserData>): string[] => {
  const errors: string[] = [];

  if (!data.educationalAttainment?.trim()) {
    errors.push('Educational attainment is required');
  }

  return errors;
};

export const validateEmploymentInfo = (data: Partial<UserData>): string[] => {
  const errors: string[] = [];

  if (!data.sssNumber?.trim()) {
    errors.push('SSS number is required');
  }

  return errors;
};
