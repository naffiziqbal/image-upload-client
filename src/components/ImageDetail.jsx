import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { GALLERY_API_BASE, API_BASE_URL, fetchOptions, uploadFetchOptions } from '../config'

const ImageDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    featured: false
  })
  const [editLoading, setEditLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const API_BASE = GALLERY_API_BASE

  useEffect(() => {
    fetchImage()
  }, [id])

  const fetchImage = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/${id}`, fetchOptions)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Image not found')
        }
        throw new Error('Failed to fetch image')
      }

      const data = await response.json()
      if (data.success) {
        setImage(data.data)
        setEditForm({
          title: data.data.title,
          description: data.data.description || '',
          category: data.data.category || '',
          tags: data.data.tags ? data.data.tags.join(', ') : '',
          featured: data.data.featured || false
        })
      } else {
        throw new Error(data.error || 'Failed to fetch image')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', editForm.title.trim())
      
      if (editForm.description.trim()) {
        formData.append('description', editForm.description.trim())
      }
      
      if (editForm.category) {
        formData.append('category', editForm.category)
      }
      
      if (editForm.tags.trim()) {
        formData.append('tags', editForm.tags.trim())
      }
      
      formData.append('featured', editForm.featured)

      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        body: formData,
        ...uploadFetchOptions
      })

      const data = await response.json()

      if (data.success) {
        setImage(data.data)
        setEditForm({
          title: data.data.title,
          description: data.data.description || '',
          category: data.data.category || '',
          tags: data.data.tags ? data.data.tags.join(', ') : '',
          featured: data.data.featured || false
        })
        setIsEditing(false)
      } else {
        throw new Error(data.error || 'Update failed')
      }
    } catch (err) {
      setError(err.message || 'Update failed. Please try again.')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return
    }

    setDeleteLoading(true)

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        ...fetchOptions
      })

      const data = await response.json()

      if (data.success) {
        navigate('/')
      } else {
        throw new Error(data.error || 'Delete failed')
      }
    } catch (err) {
      setError(err.message || 'Delete failed. Please try again.')
      setDeleteLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Error: {error}</div>
        <button
          onClick={fetchImage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4"
        >
          Try Again
        </button>
        <Link
          to="/"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>
    )
  }

  if (!image) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 text-lg mb-4">Image not found</div>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>
    )
  }

  const imageUrl = `${API_BASE_URL}/uploads/${image.imagePath}`

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {image.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Uploaded {new Date(image.createdAt).toLocaleDateString()}</span>
            {image.featured && (
              <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={image.title}
              className="w-full h-auto"
            />
          </div>
          
          {/* Image Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">File Name:</span>
                <span className="font-medium">{image.originalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">File Type:</span>
                <span className="font-medium">{image.mimeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">File Size:</span>
                <span className="font-medium">{(image.fileSize / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">Loading...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleEditSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Image Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={editForm.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={editForm.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Mark as featured image
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* Display Details */
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Details</h3>
              
              {image.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-gray-800">{image.description}</p>
                </div>
              )}

              {image.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {image.category}
                  </span>
                </div>
              )}

              {image.tags && image.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  image.featured 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {image.featured ? 'Featured' : 'Not Featured'}
                </span>
              </div>
            </div>
          )}

          {/* Back to Gallery */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageDetail
