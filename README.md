# Interactive Resume Website

A responsive, interactive resume website built with React as part of a frontend internship assignment. Features authentication, filtering, search, and PDF export capabilities.

## 🚀 Live Demo

https://d562-jain.github.io/interactive-resume

## 📋 Features

### Core Requirements

- ✅ **Authentication System** - Login with hardcoded credentials
- ✅ **Interactive Resume** - Filterable, searchable resume content
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Accessibility** - WCAG AA compliant
- ✅ **PDF Export** - Print-to-PDF functionality

### Interactive Elements

- 🔍 **Search** - Real-time search across roles, companies, skills
- 🎯 **Skill Filtering** - Click skills to filter relevant experiences
- 📱 **View Switcher** - Toggle between Cards and Table views
- 📂 **Expandable Sections** - Collapsible content sections
- 🆕 **Projects Section** - Interactive project showcase with live demos

### Technical Features

- 🛡️ **Protected Routes** - Session-based authentication
- 📱 **Mobile-First** - Responsive across all devices
- ♿ **Accessible** - Keyboard navigation, screen reader support
- 🎨 **Modern UI** - Clean, professional design
- 🖨️ **PDF Ready** - Optimized print styles

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd interactive-resume
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Open in browser**
   ```bash
   http://localhost:3000
   ```

## Build for Production
   ```bash
   npm run build
   ``` 

## 🔐 Authentication

### Demo Credentials

- Email: intern@demo.com
- Password: pass123

### Features

- Client-side validation
- Session persistence (localStorage)
- Protected routes
- Logout functionality

## 🎮 How to Use

### Login

- Navigate to the login page
- Use demo credentials: intern@demo.com / pass123
- Click "Sign In" to access the resume

### Interactive Features

- Search: Use the search bar to find specific roles, companies, or skills
- Filter: Click skill chips to filter experiences and projects
- View Toggle: Switch between Cards (timeline) and Table views
- Expand/Collapse: Click section headers to show/hide content
- PDF Export: Click "Download PDF" for a printable version

## Resume Sections

- Personal Information: Contact details and summary
- Work Experience: Interactive timeline with skill tags
- Education: Academic background and achievements
- Skills: Categorized technical and soft skills
- Projects: Expandable project cards with live demos

## 🛠️ Tech Stack

### Frontend

- React 18 - UI framework
- React Router DOM - Client-side routing
- CSS3 - Styling with Flexbox/Grid
- Local Storage - Session management

### Development

- Create React App - Build tooling
- ES6+ - Modern JavaScript

CSS Variables - Theming and consistency

### Deployment

- Github pages - Hosting platform

## 📁 Project Structure
``` bash
src/
├── components/
│ ├── Login/
│ │ ├── Login.js
│ │ └── Login.css
│ ├── Resume/
│ │ ├── Resume.js
│ │ ├── Resume.css
│ │ └── ProjectsSection.js
│ └── ProtectedRoute/
│ ├── ProtectedRoute.js
│ └── AuthContext.js
├── data/
│ └── resume.json
├── styles/
│ ├── App.css
│ └── index.css
└── App.js
```

## 🎨 Design Decisions

### Architecture

- Component-Based: Reusable, maintainable components
- Context API: Global state management for authentication
- Mobile-First: Responsive design starting from mobile breakpoints
- Progressive Enhancement: Core functionality works without JavaScript

### Accessibility

- Semantic HTML: Proper heading structure and landmarks
- ARIA Labels: Enhanced screen reader support
- Keyboard Navigation: Full tab navigation support
- Color Contrast: WCAG AA compliant color scheme

### Performance

- Code Splitting: Route-based chunking with React Router
- Memoization: Optimized re-renders with useMemo
- Efficient Filtering: Computed values with dependency arrays

## 🔮 Future Enhancements

### If I Had More Time

- Backend Integration: Real authentication with JWT tokens
- Real Data: Dynamic resume data from API
- Advanced Filtering: Date ranges, multiple categories
- Theme System: Light/dark mode toggle
- Animation Library: Framer Motion for smoother transitions
- Testing Suite: Jest/React Testing Library coverage
- PWA Features: Offline functionality, push notifications
- Internationalization: Multi-language support

### Technical Improvements

- TypeScript: Enhanced type safety
- State Management: Redux Toolkit for complex state
- Component Library: Styled-components or Tailwind CSS
- Bundle Optimization: Lazy loading and code splitting
- Performance Monitoring: Analytics and error tracking

## 🐛 Known Issues & Trade-offs

### Current Limitations

- Hardcoded Credentials: No real authentication (per assignment requirements)
- Client-Side Only: No server-side rendering
- Static Data: Resume data loaded from JSON file
- PDF Limitations: Browser-dependent print styles

### Design Trade-offs

- Simplicity over Complexity: Chose React Context over Redux for state management
- CSS over CSS-in-JS: Used plain CSS for smaller bundle size
- Built-in Features: Used browser print instead of external PDF libraries
