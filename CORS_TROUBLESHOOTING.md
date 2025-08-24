# CORS Troubleshooting Guide

## Error: `net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 (OK)`

This error indicates a CORS (Cross-Origin Resource Sharing) issue. Your backend server needs to be configured to allow requests from your frontend domain.

## Quick Fix

Your backend server needs to include CORS headers. Here's what you need to add to your backend:

### Express.js Example

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### Python Flask Example

```python
from flask_cors import CORS

CORS(app, origins=['http://localhost:5173'], supports_credentials=True)
```

## What I've Fixed in the Frontend

1. **Added CORS configuration** in `src/config.js`
2. **Updated all fetch calls** to include proper CORS options
3. **Added credentials support** for authenticated requests

## Next Steps

1. **Install CORS middleware** in your backend
2. **Configure allowed origins** to include your frontend URL
3. **Restart your backend server**
4. **Test the application**

The frontend is now properly configured to handle CORS requests. The issue is on the backend side.
