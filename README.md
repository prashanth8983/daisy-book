# Daisy Book - Electron TypeScript Application

A modern Electron application built with TypeScript, featuring a beautiful UI and secure architecture.

## Features

- 🚀 **TypeScript** - Full TypeScript support with strict type checking
- 🛡️ **Security** - Context isolation and secure IPC communication
- 🎨 **Modern UI** - Beautiful gradient design with glassmorphism effects
- 📁 **File Operations** - Open and save file dialogs
- 🔧 **Development Tools** - Hot reload, linting, and build optimization
- 📦 **Packaging** - Electron Builder for cross-platform distribution

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

## Development

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile automatically
- `npm run dev` - Start in development mode with hot reload
- `npm run lint` - Run ESLint to check code quality
- `npm run dist` - Build and package the application for distribution

### Development Mode

For the best development experience, use:

```bash
npm run dev
```

This will:
- Watch for TypeScript changes and recompile automatically
- Start Electron with the compiled code
- Open DevTools for debugging

### Project Structure

```
daisy-book/
├── src/                    # TypeScript source files
│   ├── main.ts            # Main Electron process
│   └── preload.ts         # Preload script for secure IPC
├── renderer/              # Renderer process files
│   └── index.html         # Main HTML file
├── dist/                  # Compiled JavaScript (generated)
├── package.json           # Project configuration
├── tsconfig.json          # TypeScript configuration
└── .eslintrc             # ESLint configuration
```

## Architecture

### Security Features

- **Context Isolation**: Renderer process cannot access Node.js APIs directly
- **Preload Script**: Secure API exposure through contextBridge
- **IPC Communication**: All main-renderer communication goes through IPC
- **No nodeIntegration**: Prevents security vulnerabilities

### Main Process (`src/main.ts`)

Handles:
- Application lifecycle
- Window management
- Menu creation
- IPC event handling
- File system operations

### Preload Script (`src/preload.ts`)

Provides:
- Secure API bridge between main and renderer processes
- Type-safe communication methods
- File operation handlers

### Renderer Process (`renderer/index.html`)

Features:
- Modern, responsive UI
- Interactive buttons for testing functionality
- Real-time message display
- File operation interface

## Building for Production

### Create Distribution Packages

```bash
npm run dist
```

This will create platform-specific packages in the `release/` directory.

### Supported Platforms

- **macOS**: `.dmg` and `.app` files
- **Windows**: `.exe` installer
- **Linux**: `.AppImage` and `.deb` packages

## Customization

### Adding New Features

1. **Main Process**: Add IPC handlers in `src/main.ts`
2. **Preload Script**: Expose new APIs in `src/preload.ts`
3. **Renderer**: Update UI and add JavaScript functions in `renderer/index.html`

### Styling

The application uses modern CSS with:
- CSS Grid and Flexbox for layout
- CSS custom properties for theming
- Glassmorphism effects
- Smooth animations and transitions

### Configuration

- **Electron Builder**: Configure in `package.json` under the `build` section
- **TypeScript**: Modify `tsconfig.json` for compiler options
- **ESLint**: Update `.eslintrc` for code quality rules

## Troubleshooting

### Common Issues

1. **TypeScript compilation errors**: Run `npm run build` to see detailed errors
2. **Electron not starting**: Check if all dependencies are installed with `npm install`
3. **IPC communication issues**: Verify preload script is properly configured

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=electron-* npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.