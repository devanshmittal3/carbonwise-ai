# CarbonWise AI 🌱

**Track. Understand. Reduce Your Carbon Footprint.**

CarbonWise AI is a modern, responsive, and premium web application designed to help individuals calculate, understand, and reduce their personal greenhouse gas emissions. Through daily activity inputs, real-time feedback, personalized recommendations, and gamified eco-challenges, users are empowered to transition to a more sustainable, carbon-conscious lifestyle.

This project was built for **PromptWars Challenge 3** by **Hack2Skill**.

---

## 🌎 Problem Statement
Human activities generate large amounts of carbon dioxide and other greenhouse gases, driving global warming and climate change. Most individuals are unaware of their personal contribution to these emissions. 

**CarbonWise AI** solves this problem by providing a frictionless, zero-barrier platform to:
1. Estimate personal monthly carbon footprints based on travel, electricity, diet, shopping, and waste disposal.
2. Deliver immediate visual insights and comparative scoring (Eco Score).
3. Offer rule-based, highly customized mitigation steps without requiring heavy backend servers or external APIs.
4. Encourage real-world climate actions through a gamified habit challenges module.

---

## ✨ Key Features
- **Interactive Carbon Footprint Calculator**: A multi-step guided questionnaire with client-side form validation (preventing negative values) and smooth transitions.
- **Dynamic Eco Score Dashboard**: Computes a rating from `0` to `100` and assigns badges:
  - `80 - 100`: Green Champion (Emerald)
  - `60 - 79`: Eco Learner (Teal)
  - `40 - 59`: Needs Improvement (Amber)
  - `Below 40`: High Carbon Lifestyle (Rose)
- **Visual Breakdown Charting**: Category-wise emission progress indicators styled with clean Tailwind classes without relying on heavy chart libraries.
- **Rule-Based Recommendations**: Analyzes the user's highest emission category in real time to suggest custom green alternatives, supplemented by general eco tips.
- **Eco Challenges Module**: Pre-loaded tasks with green points and difficulty tags. Completed challenges and point tallies persist instantly across reloads.
- **Progress Tracking & Benchmarking**: Visual comparisons against global, average, and high carbon footprints to contextualize user metrics.
- **Privacy First**: Frontend-only state storage utilizing local browser state and `localStorage`. No databases, cookies, or external servers.
- **Premium Dark Mode Support**: Sleek transition effects and a design system that respects browser preferences or manual dark/light toggles.

---

## 🛠️ Tech Stack
- **Library**: React 19
- **Bundler / Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **Icons**: Lucide React
- **Hosting Compatibilities**: Netlify, Vercel, GitHub Pages

---

## 🚀 Installation & Local Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+ recommended) and `npm` installed.

### Steps
1. **Clone or Extract the Project**
   If cloning from repository:
   ```bash
   git clone https://github.com/your-username/carbonwise-ai.git
   cd carbonwise-ai
   ```

2. **Install Dependencies**
   Run the following command to download and install all standard and dev dependencies:
   ```bash
   npm install
   ```

3. **Run Locally in Development Mode**
   Start the local dev server using:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local URL (normally `http://localhost:5173`).

4. **Production Build**
   Create an optimized production bundle:
   ```bash
   npm run build
   ```
   This generates static assets in the `/dist` directory. You can preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Netlify Deployment
1. Log in to your [Netlify](https://www.netlify.com) dashboard.
2. Select **Add new site** > **Import an existing project** or connect your Git Repository.
3. Configure the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Click **Deploy Site**.

### Vercel Deployment
1. Install Vercel CLI or link your repository to the [Vercel Dashboard](https://vercel.com).
2. Set the framework preset to **Vite**.
3. Use defaults: Build command `npm run build` and output directory `dist`.
4. Click **Deploy**.

---

## 🤖 AI-Assisted Development Note
This project was developed with AI-assisted tools and manually reviewed, tested, and customized for PromptWars Challenge 3.
