# Full-Stack Blog App

A modern, feature-rich blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with comprehensive user management, content creation, and admin capabilities.

## 🌟 Features

### User Features

- **User Authentication & Authorization**

  - User registration and login
  - Email verification system
  - Password reset functionality
  - JWT-based authentication
  - Role-based access control (User/Admin)

- **Blog Management**

  - Create, read, update, and delete blog posts
  - Rich text editing with image uploads
  - Category-based post organization
  - Post search and filtering
  - Pagination for better performance

- **User Profiles**

  - Personal profile management
  - Profile picture uploads
  - User activity tracking
  - Profile customization

- **Comment System**
  - Add comments to blog posts
  - Edit and delete comments
  - Real-time comment updates

### Admin Features

- **Admin Dashboard**
  - Comprehensive analytics and statistics
  - User management (view, edit, delete users)
  - Post management (moderate, edit, delete posts)
  - Category management (create, edit, delete categories)
  - Comment moderation
  - System overview and metrics

### Technical Features

- **Security**

  - Password hashing with bcrypt
  - JWT token authentication
  - Rate limiting protection
  - XSS attack prevention
  - CORS configuration
  - Input validation and sanitization

- **Performance**
  - Image optimization with Cloudinary
  - Efficient database queries
  - Responsive design
  - Lazy loading components

## 🛠️ Technologies Used

### Frontend

- **React.js 18** - Modern UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **SweetAlert** - Beautiful alert dialogs
- **Recharts** - Data visualization charts
- **Moment.js** - Date manipulation
- **React Loader Spinner** - Loading animations

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage
- **Nodemailer** - Email sending
- **Joi** - Data validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API request limiting

## 📁 Project Structure

```
Full-Stack-Blog-App/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # State management
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
└── server/                # Backend Node.js application
    ├── config/            # Database configuration
    ├── controllers/       # Route controllers
    ├── middlewares/       # Custom middlewares
    ├── models/           # MongoDB schemas
    ├── routes/           # API routes
    └── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Full-Stack-Blog-App
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the server directory:

   ```env
   PORT=7777
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

5. **Start the development servers**

   **Backend:**

   ```bash
   cd server
   npm run dev
   ```

   **Frontend:**

   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:7777

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `POST /api/auth/verify-email` - Email verification

### Users

- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin only)

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments

- `GET /api/comments/:postId` - Get comments for a post
- `POST /api/comments` - Add new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Categories

- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (admin only)
- `PUT /api/category/:id` - Update category (admin only)
- `DELETE /api/category/:id` - Delete category (admin only)

### Password Management

- `POST /api/password/forgot-password` - Request password reset
- `POST /api/password/reset-password` - Reset password

## 🔧 Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Features in Detail

### User Interface

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface built with Tailwind CSS
- **Real-time Updates**: Instant feedback for user actions
- **Loading States**: Smooth loading animations and spinners

### Content Management

- **Rich Text Editor**: Create formatted blog posts with images
- **Image Upload**: Drag-and-drop image uploads with Cloudinary integration
- **Category System**: Organize posts by categories
- **Search & Filter**: Find posts quickly with search functionality

### Admin Panel

- **Dashboard Analytics**: Visual charts and statistics
- **User Management**: Complete user administration
- **Content Moderation**: Manage posts, comments, and categories
- **System Monitoring**: Track application performance

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Server-side validation with Joi
- **XSS Protection**: Prevent cross-site scripting attacks
- **CORS Configuration**: Secure cross-origin requests
- **Helmet Security**: HTTP security headers

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Heroku/Railway)

1. Set up environment variables
2. Deploy the server directory
3. Configure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ using the MERN stack.

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Happy Blogging! 🚀**
