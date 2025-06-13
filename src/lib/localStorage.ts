/**
 * Utility functions for localStorage usage in TypeScript.
 */

export function setItem<T>(key: string, value: T): void {
   try {
      localStorage.setItem(key, JSON.stringify(value));
   } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
   }
}

export function getItem<T>(key: string): T | null {
   try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
   } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return null;
   }
}

export function removeItem(key: string): void {
   try {
      localStorage.removeItem(key);
   } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
   }
}

export function clearStorage(): void {
   try {
      localStorage.clear();
   } catch (error) {
      console.error('Error clearing localStorage:', error);
   }
}