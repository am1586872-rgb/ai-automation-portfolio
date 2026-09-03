// Robust IndexedDB storage for large, uncompressed original images
const DB_NAME = 'PortfolioAssetsDB';
const STORE_NAME = 'user_assets';
const PROFILE_KEY = 'custom_profile_image';
const PROFILE_SETTINGS_KEY = 'profile_settings';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomProfileImage(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, PROFILE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to localStorage:', err);
    try {
      localStorage.setItem(PROFILE_KEY, dataUrl);
    } catch (e) {
      console.error('LocalStorage also failed (quota exceeded):', e);
    }
  }
}

export async function loadCustomProfileImage(): Promise<string | null> {
  try {
    const db = await openDB();
    return await new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(PROFILE_KEY);
      req.onsuccess = () => resolve((req.result as string) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return localStorage.getItem(PROFILE_KEY);
  }
}

export async function clearCustomProfileImage(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(PROFILE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
  localStorage.removeItem(PROFILE_KEY);
}

export interface ProfileSettings {
  aspectRatio: 'square' | 'portrait' | 'auto';
  objectFit: 'cover' | 'contain';
}

export function saveProfileSettings(settings: ProfileSettings) {
  try {
    localStorage.setItem(PROFILE_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function loadProfileSettings(): ProfileSettings {
  try {
    const saved = localStorage.getItem(PROFILE_SETTINGS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return { aspectRatio: 'portrait', objectFit: 'cover' };
}
