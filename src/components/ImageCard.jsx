import { Link } from 'react-router-dom'

const ImageCard = ({ image }) => {
  const imageUrl = `http://localhost:3000/${image.imagePath}`

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/image/${image.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {image.featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {image.title}
          </h3>
          
          {image.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {image.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1 mb-3">
            {image.tags && image.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {image.tags && image.tags.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{image.tags.length - 3} more
              </span>
            )}
          </div>
          
          {image.category && (
            <div className="text-sm text-gray-500">
              Category: <span className="font-medium text-gray-700">{image.category}</span>
            </div>
          )}
          
          <div className="text-xs text-gray-400 mt-2">
            {new Date(image.createdAt).toLocaleDateString()}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ImageCard
