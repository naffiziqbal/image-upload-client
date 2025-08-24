# Image Gallery Client

A modern, responsive React application for managing and displaying images with a beautiful gallery interface.

## Features

- **Image Gallery**: Browse images with pagination and filtering
- **Image Upload**: Drag & drop file upload with metadata support
- **Advanced Filtering**: Filter by category, tags, featured status, and search
- **Responsive Design**: Mobile-first design that works on all devices
- **Image Management**: View, edit, and delete images with full metadata support
- **Modern UI**: Built with Tailwind CSS for a beautiful, consistent interface

## Tech Stack

- **React 19** - Latest React with modern hooks and features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Fetch API** - Modern HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ 
- Backend API server running (see configuration below)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the backend URL (see Configuration section below)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to the URL shown in the terminal

## Configuration

### Backend URL

The application needs to know where your backend API is running. You can configure this in several ways:

#### Option 1: Environment Variable (Recommended)

Create a `.env` file in the project root:

```bash
VITE_APP_BACKEND_URL=http://localhost:3000
```

#### Option 2: Environment Variable (Production)

Set the environment variable when deploying:

```bash
VITE_APP_BACKEND_URL=https://your-api-domain.com
```

#### Option 3: Default Fallback

If no environment variable is set, the app will default to `http://localhost:3000`

### Backend API Requirements

This client expects a backend API that implements the Gallery API specification with these endpoints:

- `GET /api/v1/gallery` - List images with pagination and filtering
- `POST /api/v1/gallery` - Upload new image
- `GET /api/v1/gallery/:id` - Get single image details
- `PUT /api/v1/gallery/:id` - Update image metadata
- `DELETE /api/v1/gallery/:id` - Delete image
- `GET /api/v1/gallery/categories` - Get available categories
- `GET /api/v1/gallery/tags-list` - Get available tags
- `GET /api/v1/gallery/stats` - Get gallery statistics

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.jsx      # Navigation component
│   ├── Gallery.jsx     # Main gallery view
│   ├── ImageCard.jsx   # Individual image card
│   ├── FilterBar.jsx   # Search and filter controls
│   ├── Upload.jsx      # Image upload form
│   └── ImageDetail.jsx # Single image view/edit
├── config.js           # API configuration
├── App.jsx            # Main app component
└── index.css          # Global styles and Tailwind
```

## Features in Detail

### Gallery View
- Responsive grid layout (1-4 columns based on screen size)
- Infinite scroll pagination
- Advanced filtering and search
- Sort by date, title, or file size
- Featured image highlighting

### Upload System
- Drag & drop file upload
- File type validation (images only)
- File size validation (5MB limit)
- Metadata input (title, description, category, tags)
- Featured image option
- Real-time preview

### Image Management
- Full image details view
- Edit metadata inline
- Delete confirmation
- Responsive image display
- File information display

## Mobile Responsiveness

The application is fully responsive and includes:

- Mobile-first design approach
- Collapsible filter menu on mobile
- Touch-friendly interface elements
- Optimized layouts for all screen sizes
- Responsive image grid

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features
- CSS Grid and Flexbox
- Fetch API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
