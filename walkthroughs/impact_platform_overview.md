# ClearFund Impact Platform Walkthrough

Welcome to the new ClearFund Impact Platform! This feature allows users to discover, support, and track community-led impact projects using GoodDollar (G$) tokens on the Celo blockchain.

## 🚀 Key Features

### 1. Project Discovery
*   **Location**: `/projects`
*   **Details**: Browse a curated list of verified impact projects. Use the interactive filters to search by name or category (ReFi, Climate, Public Goods, etc.).
*   **Sorting**: Sort projects by "Most Recent", "Most Funded", or "Alphabetical".

### 2. Supporting Projects (Donations)
*   **Widget**: Every project page features a high-fidelity **Donation Widget**.
*   **Functionality**:
    *   View your real-time G$ balance.
    *   Select from preset donation amounts (100, 500, 1000 G$) or enter a custom amount.
    *   One-click donations via Privy wallet connection.
    *   Real-time progress tracking toward funding goals.

### 3. Project Submission
*   **Location**: `/projects/submit`
*   **Process**: Impact leaders can submit their projects for verification.
*   **Features**:
    *   IPFS-backed image uploads for project logos.
    *   Social link integration (Twitter, Discord, GitHub).
    *   Automatic wallet address association for submitters.

### 4. Impact Transparency
*   **Live Feed**: The homepage displays a real-time feed of G$ donations happening across the platform.
*   **Stats**: View aggregate impact metrics including total G$ donated, number of active projects, and unique donor count.

### 5. Admin Moderation
*   **Location**: `/admin/projects` (Authorized wallets only)
*   **Capabilities**:
    *   Approve or reject pending submissions.
    *   Feature projects to highlight them on the homepage.
    *   Archive completed projects.

## 🛠️ Technical Stack
*   **Frontend**: Next.js 15, Tailwind CSS, Embla Carousel, Lucide Icons.
*   **Blockchain**: Viem, Privy (Auth/Wallet), Celo Mainnet.
*   **Database**: MongoDB + Mongoose.
*   **Storage**: IPFS (via Pinata).

## 💡 How to Get Involved
1.  **Connect Your Wallet**: Use the "Connect" button in the navigation header.
2.  **Explore**: Dive into the projects list and find causes that resonate with you.
3.  **Donate**: Send G$ tokens directly to project wallets with zero platform fees.
4.  **Share**: Help projects reach their goals by sharing their detail pages.

---
*ClearFund: Democratizing impact through transparent, community-driven funding.*
