# ClearFund

ClearFund addresses the fragmented and inefficient experience builders and creators face when discovering funding opportunities across the Ethereum ecosystem. It aggregates active grants, web3 micro tasks from multiple platforms into one unified dashboard, streamlining access and improving visibility.

## 🌟 Features

- **Unified Grant Dashboard**: Discover active grants and funding opportunities from multiple Web3 platforms
- **GoodCollective**: A community-driven Gooddollar initiative that channels donations into meaningful impact.
- **Multi-chain Support**: Explore opportunities across various blockchain ecosystems (Celo, Ethereum, Polygon, Optimism, etc.)
- **Past Grant Data**: Access historical grant data for research and analysis
- **Wallet Integration**: Connect with multiple wallet providers (MetaMask, WalletConnect, Coinbase Wallet)
- **User Authentication**: Secure authentication with Privy (email and wallet login)


## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **React**: 19.1.1
- **Styling**: Tailwind CSS 4
- **UI Components**:
  - Radix UI components
  - shadcn/ui
  - Lucide React icons
- **Web3 Integration**:
  - Wagmi 2.16.9
  - Privy 2.0.0
- **State Management**: Redux Toolkit 2.8.2
- **Authentication**: Privy
- **Other**:
  - Embla Carousel
  - Ethers.js 6.15.0

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 22.x (see `package.json` engines)
- **npm** or **yarn** package manager
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Clearfund
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

```env
# WalletConnect Configuration
# Get your project ID from https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Privy Configuration
# Get your app ID from https://privy.io
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here

# Firebase Configuration
# Get these values from your Firebase project settings
# https://console.firebase.google.com/
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
Clearfund/
├── src/
│   ├── app/                    # Next.js app directory (pages)
│   │   ├── about/              # About page
│   │   ├── archive/            # Archive page
│   │   ├── connect-with-us/    # Contact page
│   │   ├── donate/             # Donate page
│   │   ├── faq/                # FAQ page
│   │   ├── grants/             # Grants listing page
│   │   ├── past-grant-table/   # Past grants table
│   │   ├── spreadsheet-analytics/ # Analytics page
│   │   ├── support/            # Support page
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Footer.jsx
│   │   ├── GrantDashboard.jsx
│   │   ├── GrantRoundCard.jsx
│   │   ├── hero.jsx
│   │   ├── navHeader.jsx
│   │   ├── Provider.jsx        # Wagmi/RainbowKit provider
│   │   └── ...
│   └── lib/                    # Utility libraries
│       ├── firebase.js         # Firebase configuration
│       ├── wagmiConfig.js      # Wagmi/RainbowKit configuration
│       ├── utils.js            # Utility functions
│       └── withAuth.js         # Auth utilities
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
└── README.md                   # This file
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 🔧 Configuration

### WalletConnect Setup

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Add it to `.env.local` as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

### Privy Setup

1. Visit [Privy Dashboard](https://privy.io)
2. Create a new application
3. Copy your App ID
4. Add it to `.env.local` as `NEXT_PUBLIC_PRIVY_APP_ID`

### Firebase Setup

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" and add a web app
5. Copy the configuration values and add them to `.env.local`

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository** and create your branch from `main`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the existing code style:

   - Use consistent formatting
   - Write clear, descriptive commit messages
   - Add comments for complex logic

3. **Test your changes**:

   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**:

   ```bash
   git commit -m "Add: description of your changes"
   ```

5. **Push to your fork** and create a Pull Request

### Code Style Guidelines

- Follow the existing code structure and patterns
- Use functional components with hooks
- Keep components focused and modular
- Use meaningful variable and function names
- Add comments for complex business logic

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable

## 📝 Environment Variables

All environment variables use the `NEXT_PUBLIC_` prefix, which means they are exposed to the client-side in Next.js. Make sure not to include sensitive server-side secrets in these variables.

Required environment variables:

**Web3 & Wallet Integration:**

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_PRIVY_APP_ID` - Privy application ID

**Smart Contract Integration:**

- `NEXT_PUBLIC_CLEARFUND_REGISTRY_ADDRESS` - Deployed ClearFundRegistry contract address on Celo

**IPFS Configuration (choose one provider):**

- `NEXT_PUBLIC_IPFS_PROVIDER` - IPFS provider name (`pinata` or `nft-storage`, default: `pinata`) - Safe to expose

**Option 1: Pinata (Recommended)**

- `PINATA_JWT` - Pinata JWT token for API access (**SERVER-SIDE ONLY**, no `NEXT_PUBLIC_` prefix)
- `NEXT_PUBLIC_PINATA_GATEWAY` - Pinata gateway URL (optional, default: `https://gateway.pinata.cloud`) - Safe to expose

**Option 2: NFT.Storage**

- `NFT_STORAGE_KEY` - NFT.Storage API token (**SERVER-SIDE ONLY**, no `NEXT_PUBLIC_` prefix)

**Firebase Configuration:**

- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key - Safe to expose
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain - Safe to expose
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID - Safe to expose
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID - Safe to expose
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID - Safe to expose
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket - Safe to expose

**⚠️ Security Note:** IPFS operations run server-side via API routes. Sensitive tokens (JWT/API keys) must be server-side environment variables (without `NEXT_PUBLIC_` prefix) to prevent them from being exposed to the browser. Never use `NEXT_PUBLIC_` prefix for secrets.

**📝 Setup Instructions:**

1. Copy `.env.example` to `.env.local`
2. Fill in all required values
3. For server-side secrets (PINATA*JWT, NFT_STORAGE_KEY), ensure they do NOT have `NEXT_PUBLIC*` prefix
4. Never commit `.env.local` to version control

## 🚢 Deployment

The application is configured for deployment on Netlify. The `@netlify/plugin-nextjs` is included in devDependencies.

### Build for Production

```bash
npm run build
npm run start
```

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with Next.js and React
- Web3 integration powered by Wagmi, and Privy
- UI components from Radix UI and shadcn/ui

---

For questions or support, please open an issue or contact the maintainers.
