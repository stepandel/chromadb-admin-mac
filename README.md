# ChromaDB Admin

A modern desktop application and web interface for managing ChromaDB instances, built with Next.js, shadcn/ui, and Tauri.

![screely-1696786774071](https://github.com/flanker/chromadb-admin/assets/109811/6d4369d4-d10c-49f7-8342-89849f271dbe)

## ✨ Features

- 🖥️ **Native Desktop App** - macOS application with native window controls
- 🌐 **Web Interface** - Run in browser or deploy to any hosting platform
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 🔒 **Authentication Support** - Token-based and basic authentication
- 📊 **Collection Management** - Browse, search, and manage your vector collections
- 🔍 **Vector Search** - Query collections by vectors or document IDs
- 🌙 **Dark/Light Mode** - Automatic theme support
- ⚡ **Fast & Responsive** - Optimized performance with React Query

## 🚀 Quick Start

### Desktop Application (Recommended)

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Run in development mode**:

   ```bash
   pnpm tauri:dev
   ```

3. **Build for production**:

   ```bash
   pnpm tauri:build
   ```

   This creates a `.dmg` installer and `.app` bundle in `src-tauri/target/release/bundle/`

### Web Development

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development server**:

   ```bash
   pnpm dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Docker Deployment

Run the pre-built image:

```bash
docker run -p 3000:3000 fengzhichao/chromadb-admin
```

Or build locally:

```bash
docker build -t chromadb-admin .
docker run -p 3000:3000 chromadb-admin
```

_Note: Use `http://host.docker.internal:8000` to connect to ChromaDB running on your host machine._

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Desktop**: Tauri (Rust-based native wrapper)
- **State Management**: Jotai
- **Data Fetching**: TanStack Query (React Query)
- **Package Manager**: pnpm (required)

## 📱 Platform Support

- **macOS**: Native `.app` and `.dmg` distribution
- **Web Browsers**: All modern browsers
- **Docker**: Cross-platform container support

## 🔧 Development

### Prerequisites

- Node.js 18+
- pnpm 8+
- Rust (for desktop builds)

### Available Scripts

```bash
# Development
pnpm dev                 # Web development server
pnpm tauri:dev          # Desktop development with hot reload

# Building
pnpm build              # Build web application
pnpm tauri:build        # Build desktop application (production)
pnpm tauri:build:debug  # Build desktop application (debug)

# Utilities
pnpm lint               # Run ESLint
pnpm generate-mock-data # Generate sample data
```

## 📋 Authentication Support

ChromaDB Admin supports multiple authentication methods:

- **No Authentication** - For development and open instances
- **Token Authentication** - Bearer token support
- **Basic Authentication** - Username and password

<img width="743" alt="Authentication Setup" src="https://github.com/flanker/chromadb-admin/assets/109811/c15cab9a-db80-4e2f-b732-a3bd5ef557da">

## 🔗 Links

- **ChromaDB Documentation**: [https://docs.trychroma.com](https://docs.trychroma.com)
- **shadcn/ui**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Tauri**: [https://tauri.app](https://tauri.app)

## ⚠️ Important Notes

- **Package Manager**: This project enforces pnpm usage. Other package managers are blocked.
- **API Routes**: When building for desktop, API routes are excluded as the app connects directly to ChromaDB.
- **Development**: The desktop app provides the best user experience with native OS integration.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

**Note**: This is NOT an official ChromaDB project.
