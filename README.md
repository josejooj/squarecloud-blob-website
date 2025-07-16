# ⚙️ Square Cloud Blob Management Website

A modern and intuitive web interface for managing your files on [Square Cloud Blob Storage](https://squarecloud.app/pt-br/blob). This project simplifies the experience of uploading, viewing, and organizing files hosted on Square Cloud.

## 🌐 Live Demo

**Try it now: [https://blob.squareweb.app](https://blob.squareweb.app)**

Experience the full functionality of Square Cloud Blob Manager without any installation required. Simply visit the link above and start managing your files with your Square Cloud API Key.

<img width="1280" height="1024" alt="Square Cloud Blob Manager Website Demo" src="https://github.com/user-attachments/assets/d3ee49f6-6658-4ca4-91ef-57b4ae7bcf92" />

## 🚀 Features

- **File Upload**: Drag-and-drop interface for uploading multiple files
- **File Management**: Easily view, organize, and delete your files
- **Usage Statistics**: Monitor used space and estimated costs
- **Multi-format Support**: Images, videos, PDFs, and other file types
- **Responsive Interface**: Design optimized for desktop and mobile
- **Light/Dark Theme**: Theme switching for better user experience
- **Secure Authentication**: Integration with Square Cloud API Key

## 🛠️ Technologies

- **Next.js 15** - React framework for web applications
- **TypeScript** - Programming language with static typing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible and customizable UI components
- **React Icons** - Icon library for React
- **Square Cloud API** - Integration with blob storage service

## 📦 Installation

### Prerequisites

- Node.js (LTS version recommended)
- npm, yarn, pnpm, or bun

### Self-hosting

1. **Clone the repository**
   ```bash
   git clone https://github.com/josejooj/squarecloud-blob-website.git blob
   cd blob
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the project**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Download Pre-built Release

You can also download the pre-compiled build from the [latest release](https://github.com/josejooj/squarecloud-blob-website/releases/latest).

## 📚 How to Use

1. **Login**: Enter your Square Cloud API Key
2. **Upload**: Drag and drop files or click to select
3. **Manage**: View, organize, and delete your files
4. **Monitor**: Track space usage and costs

### Supported File Types

According to the [Square Cloud Blob documentation](https://docs.squarecloud.app/services/blob), the following file types are supported:

| Category | File Extensions |
|----------|-----------------|
| **Video** | `.mp4`, `.mpeg`, `.webm`, `.flv`, `.m4v` |
| **Image** | `.jpeg`, `.png`, `.apng`, `.tiff`, `.gif`, `.webp`, `.bmp`, `.svg`, `.ico`, `.cur`, `.heic`, `.heif` |
| **Audio** | `.mp3`, `.mp4`, `.wav`, `.ogg`, `.opus`, `.mpeg`, `.aac` |
| **Text** | `.txt`, `.html`, `.css`, `.csv`, `.x-sql` |
| **Application** | `.xml`, `.sql`, `.x-sql`, `.sqlite3`, `.pdf`, `.json`, `.javascript`, `.p12` |

### Limitations

- Maximum file size: 100MB
- Minimum file size: 1KB

## 🤝 Contributing

Contributions are always welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Generates production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs the linter
- `npm run release` - Generates a new release

## 🐛 Known Issues

- Usage information may be slightly outdated due to caching
- Some file types may not be supported depending on configuration

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## ⚠️ Disclaimer

This is not an official Square Cloud website. It's an independent project created to facilitate the use of the blob storage service.

## 🔗 Useful Links

- [Square Cloud Blob Documentation](https://docs.squarecloud.app/services/blob)
- [Official Square Cloud Website](https://squarecloud.app)
- [Square Cloud API](https://api.squarecloud.app)

## 👨‍💻 Author

Developed by [josejooj](https://github.com/josejooj)

---

**Like the project? Leave a ⭐ on the repository!**
