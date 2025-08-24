// Backend API configuration
export const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:3000'
export const GALLERY_API_BASE = `${API_BASE_URL}/api/v1/gallery`

// Common fetch options for CORS
export const fetchOptions = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

// Fetch options for file uploads (multipart/form-data)
export const uploadFetchOptions = {
  mode: 'cors',
  credentials: 'include',
  // Don't set Content-Type for FormData, let the browser set it
}
