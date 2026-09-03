import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  saveCustomProfileImage,
  loadCustomProfileImage,
  clearCustomProfileImage,
  saveProfileSettings,
  loadProfileSettings,
  ProfileSettings,
} from '../utils/imageStorage';

const DEFAULT_AVATAR = '/profile.jpg';

interface ProfileImageContextType {
  profileImage: string;
  hasCustomImage: boolean;
  settings: ProfileSettings;
  updateSettings: (newSettings: Partial<ProfileSettings>) => void;
  uploadImageFile: (file: File) => Promise<boolean>;
  setImageUrl: (url: string) => Promise<boolean>;
  resetToDefault: () => Promise<void>;
  isLoading: boolean;
}

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

export function ProfileImageProvider({ children }: { children: React.ReactNode }) {
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_AVATAR);
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const [settings, setSettings] = useState<ProfileSettings>({
    aspectRatio: 'portrait',
    objectFit: 'cover',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const savedSettings = loadProfileSettings();
        setSettings(savedSettings);

        const customImg = await loadCustomProfileImage();
        if (customImg) {
          setProfileImage(customImg);
          setHasCustomImage(true);
        }
      } catch (err) {
        console.error('Failed to load profile image from storage:', err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const updateSettings = (newSettings: Partial<ProfileSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveProfileSettings(updated);
      return updated;
    });
  };

  const uploadImageFile = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        if (result) {
          setProfileImage(result);
          setHasCustomImage(true);
          await saveCustomProfileImage(result);
          resolve(true);
        } else {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  };

  const setImageUrl = async (url: string): Promise<boolean> => {
    const trimmed = url.trim();
    if (!trimmed) return false;
    setProfileImage(trimmed);
    setHasCustomImage(true);
    await saveCustomProfileImage(trimmed);
    return true;
  };

  const resetToDefault = async () => {
    await clearCustomProfileImage();
    setProfileImage(DEFAULT_AVATAR);
    setHasCustomImage(false);
  };

  return (
    <ProfileImageContext.Provider
      value={{
        profileImage,
        hasCustomImage,
        settings,
        updateSettings,
        uploadImageFile,
        setImageUrl,
        resetToDefault,
        isLoading,
      }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
}

export function useProfileImage() {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error('useProfileImage must be used within a ProfileImageProvider');
  }
  return context;
}
