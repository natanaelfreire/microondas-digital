export function getStorageToken() {
  const storageToken = localStorage.getItem('SavedTokenMicroondas');
  return storageToken;
}