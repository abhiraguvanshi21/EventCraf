import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  accountType: 'user' | 'vendor';
  shopName?: string;
  vendorType?: string;
}

interface BookingData {
  id: string;
  eventName: string;
  eventType: string;
  date: string;
  time: string;
  venue: string;
  guestCount: string;
  budget: string;
  description: string;
  theme: string;
  specialRequirements: string;
  selectedVendors: Array<{
    vendor: {
      id: string;
      name: string;
      service: string;
      category: string;
      rating: number;
      price: string;
      priceMin: number;
      priceMax: number;
      image: string;
      contact: string;
      description: string;
      location: string;
      experience: string;
      specialties: string[];
    };
    quantity: number;
    selectedBudget?: number;
  }>;
  totalAmount: number;
  advanceAmount: number;
  paidAmount: number;
  status: 'confirmed' | 'pending' | 'completed';
  bookingDate: string;
}

interface AuthContextType {
  user: User | null;
  bookingData: BookingData | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string,
    accountType: 'user' | 'vendor',
    shopName?: string,
    vendorType?: string,
    addToVendorList?: boolean
  ) => Promise<boolean>;
  logout: () => void;
  saveBookingData: (data: BookingData) => void;
  updateBookingData: (updates: Partial<BookingData>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('eventcraft_user');
    const savedBooking = localStorage.getItem('eventcraft_booking');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedBooking) setBookingData(JSON.parse(savedBooking));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const allUsers: User[] = JSON.parse(localStorage.getItem('eventcraft_users') || '[]');
    const allVendors: User[] = JSON.parse(localStorage.getItem('eventcraft_vendors') || '[]');

    const matchedUser = [...allUsers, ...allVendors].find(
      (u) => u.email === email && password.length >= 6
    );

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem('eventcraft_user', JSON.stringify(matchedUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    accountType: 'user' | 'vendor',
    shopName?: string,
    vendorType?: string,
    addToVendorList: boolean = false
  ): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!name || !email || password.length < 6) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      accountType,
      ...(accountType === 'vendor' ? { shopName, vendorType } : {})
    };

    const key = accountType === 'vendor' ? 'eventcraft_vendors' : 'eventcraft_users';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');

    const duplicate = existing.find((u: User) => u.email === email);
    if (duplicate) {
      setIsLoading(false);
      return false;
    }

    existing.push(newUser);
    localStorage.setItem(key, JSON.stringify(existing));

    if (addToVendorList && accountType === 'vendor') {
      const basicList = JSON.parse(localStorage.getItem('eventcraft_vendor_list') || '[]');
      basicList.push({ name, shopName, vendorType });
      localStorage.setItem('eventcraft_vendor_list', JSON.stringify(basicList));
    }

    setUser(newUser);
    localStorage.setItem('eventcraft_user', JSON.stringify(newUser));

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setBookingData(null);
    localStorage.removeItem('eventcraft_user');
    localStorage.removeItem('eventcraft_booking');
  };

  const saveBookingData = (data: BookingData) => {
    const bookingWithId = {
      ...data,
      id: Date.now().toString(),
      status: 'confirmed' as const,
      bookingDate: new Date().toISOString(),
      paidAmount: data.advanceAmount || 0
    };

    setBookingData(bookingWithId);
    localStorage.setItem('eventcraft_booking', JSON.stringify(bookingWithId));
  };

  const updateBookingData = (updates: Partial<BookingData>) => {
    if (bookingData) {
      const updated = { ...bookingData, ...updates };
      setBookingData(updated);
      localStorage.setItem('eventcraft_booking', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookingData,
        login,
        signup,
        logout,
        saveBookingData,
        updateBookingData,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
