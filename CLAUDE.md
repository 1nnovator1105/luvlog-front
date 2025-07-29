# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
# Start development server (runs on http://localhost:3000)
yarn start
# or
npm start

# Build for production (creates optimized build in /build folder)
yarn build
# or
npm run build

# Run tests in watch mode
yarn test
# or
npm test

# Run a single test file
yarn test src/App.test.js
# or
npm test src/App.test.js
```

## Architecture Overview

This is a React-based blog/content management system built with Create React App. The application uses a proxy configuration to route API calls to `http://luvlog.xyz/`.

### Key Architectural Patterns

1. **Component Structure**: The app follows a feature-based component organization:
   - `/src/components/` - Contains all React components organized by feature
   - Each feature has its own folder with component files and associated CSS

2. **Routing**: Uses React Router v5 with the following main routes:
   - `/list` - Blog post listing with pagination
   - `/write` - Create/edit posts (requires authentication)
   - `/post/:idx` - Individual post view
   - Default redirect to `/list?page=0`

3. **Authentication**: Session-based authentication using sessionStorage
   - Stores `username` and `role` in sessionStorage
   - Role-based access control (e.g., '관리자' role for admin features)
   - Guest mode available for read-only access

4. **API Integration**: All API calls are made through axios to endpoints prefixed with `/api/`
   - Backend API is proxied through the development server
   - Common endpoints: `/api/getList`, `/api/getListStatus`, etc.

5. **Editor Integration**: Uses Toast UI Editor with plugins for:
   - Code syntax highlighting
   - Charts
   - UML diagrams
   - Color syntax
   - Table merged cells

### Component Dependencies

- **Header Component**: Shared across all authenticated views
- **Common Utilities**: Located in `/src/common/commonUtil.js` for shared functions
- **Static Assets**: Stored in `/src/static/` including images and video files

### Testing

The project uses React Testing Library with Jest. Test files are colocated with components using the `.test.js` extension.