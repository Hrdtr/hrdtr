export const useRecentlyUsedUtilities = () => {
  return useLocalStorage<string[]>('recently-used-utilities', ['/utils/base64-text-encoder']);
}