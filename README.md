# Gist Tracker

<div align="center">

![Gist Tracker Logo](public/file.svg)

A modern, full-featured application for creating, managing, and sharing code snippets.

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🚀 Overview

Gist Tracker is a powerful web application designed for developers to create, manage, and share code snippets (gists). Inspired by GitHub Gists, this platform provides a clean, intuitive interface for storing and organizing code snippets with support for multiple programming languages, public/private visibility settings, and social features like favorites and comments.

## ✨ Features

- **User Authentication**: Secure signup, login, and profile management
- **Gist Management**:
  - Create, view, edit, and delete code snippets
  - Support for multiple programming languages with syntax highlighting
  - Public and private visibility options
  - Rich text descriptions
- **Social Features**:
  - Favorite gists for quick access
  - Comment on public gists
  - View gists by other users
- **Search & Filter**:
  - Search gists by title, content, or description
  - Filter by programming language and visibility
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with amber and teal accents

## 🛠️ Tech Stack

- **Frontend**:

  - [Next.js](https://nextjs.org/) - React framework for server-rendered applications
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
  - [React Hook Form](https://react-hook-form.com/) - Form validation
  - [Zod](https://zod.dev/) - TypeScript-first schema validation

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - API endpoints
  - [MongoDB](https://www.mongodb.com/) - NoSQL database
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
  - [JWT](https://jwt.io/) - JSON Web Tokens for authentication
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/<yourusername>/gist-tracker-app.git
cd gist-tracker-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
```

## 📖 Usage

### Creating a Gist

1. Sign up or log in to your account
2. Navigate to the dashboard
3. Click the "New Gist" button
4. Fill in the title, description, content, and select a language
5. Choose visibility (public or private)
6. Click "Create Gist"

### Managing Gists

- **View Gists**: Browse all public gists and your private gists on the dashboard
- **Edit Gists**: Click the "Edit" button on any of your gists to modify its content
- **Delete Gists**: Remove your gists using the delete button on the gist view page
- **Favorite Gists**: Click the star icon to add a gist to your favorites

### Filtering and Searching

- Use the search bar to find gists by title, content, or description
- Filter gists by programming language using the language dropdown
- Toggle between all, public, and private gists using the visibility filter

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate a user
- `GET /api/auth/logout` - Log out the current user
- `GET /api/auth/me` - Get the current authenticated user

### Gist Endpoints

- `GET /api/gists` - Get all public gists and the user's private gists
- `GET /api/gists/:id` - Get a specific gist by ID
- `POST /api/gists` - Create a new gist
- `PUT /api/gists/:id` - Update an existing gist
- `DELETE /api/gists/:id` - Delete a gist

### User Endpoints

- `GET /api/user/profile` - Get the current user's profile
- `PUT /api/user/profile` - Update the current user's profile

### Favorite Endpoints

- `GET /api/favorites` - Get all favorites for the current user
- `POST /api/favorites/:gistId` - Add a gist to favorites
- `DELETE /api/favorites/:gistId` - Remove a gist from favorites

## 📂 Project Structure

```
gist-tracker-app/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                  # Utility functions and models
│   ├── models/           # Mongoose models
│   ├── client-auth.ts    # Client-side authentication
│   ├── server-auth.ts    # Server-side authentication
│   └── db.ts             # Database connection
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript type definitions
└── ...                   # Configuration files
```

## 🚢 Deployment

### Deploying on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Other Deployment Options

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ by [ Patrick Kipkoech ](https://github.com/koskei-kipkoech)
