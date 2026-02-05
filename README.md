# ⛩️ AnimeSearch
> [**🔴 LIVE DEMO**](https://searchanim.netlify.app/)
> A robust, neubrutalist anime discovery tool built with React and the Jikan API.

![AnimeSearch Preview](public/favicon.ico)

## 📖 About
AnimeSearch is a modern web application that allows users to search the vast Jikan (MyAnimeList) database to find their next favorite show. It features a bold **Neubrutalist design**, a custom "Torii Gate" logo, and a seamless user experience with optimized performance.

## ✨ Key Features
* **⚡ Real-Time Search:** Implemented **Debouncing (500ms)** to optimize API calls and prevent rate limiting.
* **📄 Pagination:** Browse through thousands of anime results with intuitive page navigation.
* **❤️ Persistent Watchlist:** Save your favorite anime to **LocalStorage** so your list remains even after refreshing the page.
* **🖼️ Smart Modals:** detailed pop-up view with synopsis, stats (Score, Year, Episodes), and links to MAL/Manga.
* **💀 Skeleton Loading:** Smooth loading states with pulse animations for a better user experience.
* **📱 Fully Responsive:** Optimized grid layout that looks great on mobile, tablet, and desktop.
* **🎨 Custom Design:** Unique Orange/Black theme with a custom SVG Torii Gate logo.

## 🛠️ Tech Stack
* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Data Source:** [Jikan API v4](https://jikan.moe/) (Unofficial MyAnimeList API)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Persistence:** Browser LocalStorage

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/anime-search.git](https://github.com/YOUR_USERNAME/anime-search.git)
    cd animeSearch
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

```text
src/
├── App.jsx        # Main application logic (Search, State, UI)
├── main.jsx       # Entry point
├── index.css      # Global styles & Tailwind directives
└── assets/        # Static assets
