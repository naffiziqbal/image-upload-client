import { useState, useEffect } from 'react'
import { GALLERY_API_BASE } from '../config'

const FilterBar = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  const API_BASE = GALLERY_API_BASE

  useEffect(() => {
    // Fetch categories and tags
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/categories`)
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setCategories(data.data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    const fetchTags = async () => {
      try {
        const response = await fetch(`${API_BASE}/tags-list`)
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setTags(data.data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error)
      }
    }

    fetchCategories()
    fetchTags()
  }, [])

  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    })
  }

  const clearFilters = () => {
    onFilterChange({
      category: '',
      tags: '',
      featured: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search images..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Mobile expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
        </button>
      </div>

      {/* Expanded filters */}
      <div className={`mt-4 space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <select
              value={filters.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Featured */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
            <select
              value={filters.featured}
              onChange={(e) => handleInputChange('featured', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Images</option>
              <option value="true">Featured Only</option>
              <option value="false">Not Featured</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleInputChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="createdAt">Date Created</option>
              <option value="title">Title</option>
              <option value="fileSize">File Size</option>
            </select>
          </div>
        </div>

        {/* Sort Order */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort Order:</label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => handleInputChange('sortOrder', 'asc')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  filters.sortOrder === 'asc'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Asc
              </button>
              <button
                onClick={() => handleInputChange('sortOrder', 'desc')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  filters.sortOrder === 'desc'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Desc
              </button>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
