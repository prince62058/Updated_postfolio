# Prince Kumar - Developer Portfolio

🚀 A modern, interactive portfolio website showcasing my projects and skills as a MERN Stack Developer and Computer Science Engineering student.

## 🔗 Live Demo

**[View Live Portfolio](https://your-portfolio-url.replit.app)**

## ✨ Features

- **Modern Design**: Futuristic UI with glassmorphic elements and neon accents
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **3D Integration**: Spline 3D elements in hero section
- **Contact Form**: MongoDB integration with email notifications
- **Resume Download**: Direct download from database storage
- **Responsive Design**: Optimized for all devices
- **Dark Theme**: Professional dark theme with gradient accents

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GSAP** - Professional animations
- **Locomotive Scroll** - Smooth scrolling effects
- **Vite** - Fast development and builds

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Nodemailer** - Email functionality
- **SendGrid** - Email service integration

### UI Components
- **ShadCN/UI** - Modern component library
- **Radix UI** - Accessible primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Advanced animations

## 🚀 Featured Projects

### 1. AI-Powered Communication Assistant
- **Description**: Intelligent email management system with OpenAI GPT-4 integration
- **Tech**: React, Node.js, OpenAI, PostgreSQL, Gmail API
- **Live Demo**: [View Project](https://unstop-challange.onrender.com/)

### 2. FrienchTech IT Solutions
- **Description**: Corporate website with Three.js animations and interactive features
- **Tech**: React, Three.js, MongoDB, GSAP, TailwindCSS
- **Live Demo**: [View Project](https://frienchtech.onrender.com/)

### 3. OWNAI Search Platform
- **Description**: AI-powered search platform similar to Perplexity with GPT-5
- **Tech**: React, TypeScript, OpenAI GPT-5, PostgreSQL, Replit Auth
- **Live Demo**: [View Project](https://ownai-t9uc.onrender.com/)

### 4. Online Reservation System
- **Description**: Booking system with Java backend and JDBC connectivity
- **Tech**: Java, MySQL, JDBC
- **Repository**: [GitHub](https://github.com/prince62058/Online-Reservation-Using-JDBC-IN-JAVA)

### 5. Music Web App
- **Description**: Interactive music player with comprehensive controls
- **Tech**: HTML, CSS, JavaScript
- **Live Demo**: [View Project](https://prince62058.github.io/MusicWeb-APP/)

## 📋 Quick Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prince62058/your-portfolio-repo.git
   cd your-portfolio-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   
   # Email Configuration
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   
   # SendGrid (optional)
   SENDGRID_API_KEY=your_sendgrid_api_key
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Visit the application**
   Open [http://localhost:5000](http://localhost:5000) in your browser

## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── data/           # Portfolio data
│   └── public/             # Static assets
├── server/                 # Backend Express server
│   ├── mongodb-storage.ts  # Database operations
│   ├── email.ts           # Email functionality
│   ├── routes.ts          # API routes
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
└── README.md              # This file
```

## 🎯 Key Features

### Animations & Interactions
- **GSAP ScrollTrigger**: Smooth scroll-based animations
- **Locomotive Scroll**: Enhanced scrolling experience
- **Hover Effects**: Interactive component animations
- **Loading States**: Skeleton loaders and progress indicators

### Contact System
- **Form Validation**: Zod schema validation
- **Database Storage**: MongoDB contact submissions
- **Email Notifications**: Automatic email alerts
- **Admin Panel**: View and manage submissions

### Resume Management
- **Database Storage**: MongoDB GridFS for file storage
- **Direct Download**: One-click resume download
- **Update System**: Easy resume replacement

## 🔌 API Endpoints

### Contact Management
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)

### Resume Operations
- `GET /api/resume/download` - Download resume
- `POST /api/resume/upload` - Upload new resume (admin)
- `GET /api/resume/info` - Get resume metadata

### Database Management
- `GET /api/database/status` - Database health check
- `GET /api/database/submissions` - Get all submissions

## 🛡️ Security Features

- **Input Validation**: Zod schema validation on all inputs
- **Environment Variables**: Secure credential management
- **CORS Configuration**: Proper cross-origin settings
- **Error Handling**: Comprehensive error boundaries
- **Rate Limiting**: API endpoint protection

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full-featured experience with animations
- **Tablet**: Adapted layouts with touch interactions
- **Mobile**: Optimized navigation and performance

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Replit Deployment
1. Import project to Replit
2. Set environment variables in Secrets
3. The application will automatically deploy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Prince Kumar**
- **Email**: princekumar5252@gmail.com
- **Phone**: +91 6205872519
- **GitHub**: [@prince62058](https://github.com/prince62058)
- **LinkedIn**: [prince62058](https://www.linkedin.com/in/prince62058/)

## 🎓 About Me

I'm a Computer Science Engineering student at Technocrats Institute of Technology, specializing in Artificial Intelligence and Machine Learning. With expertise in the MERN stack, I build comprehensive full-stack web applications that deliver seamless user experiences.

### Skills & Expertise
- **Frontend**: React, TypeScript, Tailwind CSS, GSAP
- **Backend**: Node.js, Express.js, MongoDB, PostgreSQL
- **AI/ML**: OpenAI integration, Python, Machine Learning
- **Tools**: Git, Vite, Drizzle ORM, TanStack Query

---

⭐ Star this repository if you found it helpful!

Made with ❤️ by Prince Kumar