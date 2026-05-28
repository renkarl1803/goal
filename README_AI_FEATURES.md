# Pexy AI - Multi-Feature AI Assistant Platform

A comprehensive AI-powered platform that works on **web and mobile** with the following features:

## ✨ Features

### 1. 💬 Chat & Q&A
- Ask any question to the AI
- Multiple AI personas (Assistant, Expert, Creative, Teacher, Professional)
- Conversation history and context awareness
- Real-time responses

### 2. 🎨 Image Generation
- Generate images from text descriptions using DALL-E 3
- Customizable sizes, styles, and quality
- Prompt enhancement for better results
- Generate image variations

### 3. 🎬 Video Generation
- Create videos from text descriptions
- Multiple keyframes for video preview
- Adjustable duration, FPS, and resolution
- Video composition and editing

### 4. 🔧 Code Assistant
- **Debug Code**: Find and fix bugs with explanations
- **Generate Code**: Create code from descriptions
- **Explain Code**: Understand what code does
- Supports 15+ programming languages

### 5. 🎤 Voice AI
- **Text-to-Speech**: Convert any text to natural speech
- 6 different AI voices (Alloy, Echo, Fable, Onyx, Nova, Shimmer)
- Adjustable speed (0.5x to 2.0x)
- Read chat messages with voice

---

## 🏗️ Architecture

```
Pexy AI Platform
├── Frontend (Next.js 14)
│   ├── Web App (React)
│   ├── Mobile App (React Native - future)
│   └── UI Components (Tailwind CSS)
├── Backend (Express.js)
│   ├── Chat Service
│   ├── Image Generation
│   ├── Video Generation
│   ├── Code Assistant
│   └── Voice Service
├── AI Services
│   ├── OpenAI GPT-4
│   ├── DALL-E 3
│   ├── Whisper (Speech-to-Text)
│   └── TTS (Text-to-Speech)
└── Infrastructure
    ├── PostgreSQL (Database)
    ├── Redis (Caching)
    ├── Docker (Containerization)
    └── GitHub Actions (CI/CD)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/renkarl1803/goal.git
   cd goal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Backend
   cd apps/api
   cp .env.example .env
   # Add your OPENAI_API_KEY
   
   # Frontend
   cd ../web
   cp .env.example .env.local
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd apps/api
   npm run dev
   
   # Terminal 2 - Frontend
   cd apps/web
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - API Docs: http://localhost:3001/api/v1

---

## 📖 Usage Examples

### Chat with AI
```bash
curl -X POST http://localhost:3001/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is machine learning?",
    "persona": "teacher"
  }'
```

### Generate an Image
```bash
curl -X POST http://localhost:3001/api/v1/generate/image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A futuristic city at sunset",
    "size": "1024x1024",
    "style": "artistic"
  }'
```

### Debug Code
```bash
curl -X POST http://localhost:3001/api/v1/code/debug \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const x = null.toString();",
    "language": "javascript",
    "error": "Cannot read properties of null"
  }'
```

### Text-to-Speech
```bash
curl -X POST http://localhost:3001/api/v1/voice/text-to-speech \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is Pexy AI",
    "voice": "nova"
  }'
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI**: React 18 + Tailwind CSS
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Markdown**: React Markdown
- **Notifications**: React Hot Toast
- **State**: Zustand

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **AI APIs**: OpenAI GPT-4, DALL-E 3, TTS
- **Database**: PostgreSQL
- **Cache**: Redis
- **Logging**: Winston

### Infrastructure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Deployment**: AWS/GCP/Vercel ready

---

## 📱 Mobile Support

The web app is fully responsive and works on mobile devices. For native mobile apps:

```bash
cd apps/mobile
npm install
npm run dev
```

Supports:
- iOS (via React Native)
- Android (via React Native)
- PWA (Progressive Web App)

---

## 🔐 Security Features

- ✅ CORS enabled for all requests
- ✅ Environment variables for sensitive data
- ✅ Rate limiting (can be configured)
- ✅ Input validation
- ✅ Error handling
- ✅ Logging and monitoring

---

## 📊 Monitoring

### Logs
```bash
tail -f apps/api/error.log
tail -f apps/api/combined.log
```

### Health Check
```bash
curl http://localhost:3001/health
```

---

## 🚢 Deployment

### Docker
```bash
docker build -t pexy-ai .
docker run -p 3001:3001 pexy-ai
```

### Production Checklist
- [ ] Set up database (PostgreSQL)
- [ ] Configure Redis
- [ ] Add authentication
- [ ] Set up payment processing
- [ ] Configure CI/CD
- [ ] Deploy to AWS/GCP/Vercel
- [ ] Set up monitoring (Sentry)
- [ ] Enable HTTPS
- [ ] Configure custom domain

---

## 📈 Roadmap

### Q2 2026: MVP
- [x] Core AI features
- [x] Web interface
- [ ] Basic monetization

### Q3 2026: Expansion
- [ ] Advanced AI features
- [ ] Team collaboration
- [ ] Mobile app

### Q4 2026: Enterprise
- [ ] Advanced security
- [ ] API marketplace
- [ ] White-label options

---

## 🤝 Contributing

Contributions are welcome! Please follow our guidelines:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

- **Documentation**: See `API_DOCUMENTATION.md`
- **Launch Guide**: See `LAUNCH_GUIDE.md`
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

## 🎯 Vision

Pexy AI aims to be the **leading AI assistant platform** that:
- ✨ Serves **millions of users** globally
- 💰 Generates **$100k+ ARR** by end of 2026
- 🚀 Scales to **billions of users** by 2027
- 🌍 Supports **multiple languages** and platforms
- 🔒 Maintains **industry-leading security**

---

**Pexy AI v0.1.0** - Your AI Co-Pilot for Everything  
Built with ❤️ by the Pexy AI team
