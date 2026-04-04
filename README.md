# FinanceDashboard - Finance Dashboard UI

A sleek, responsive, and modern personal finance dashboard built with React and Vite. FinanceDashboard allows you to effortlessly monitor your financial health, visualize your income versus expenses, and manage your day-to-day transactions.

## 🚀 Features

- **Dashboard Overview:** Get a high-level summary of your total balance, income, and expenses through interactive cards, insight panels, and trend charts.
- **Transaction Management:** View, search, filter (by type), and sort all your transactions sequentially in a clean tabular format.
- **Dynamic Data Visualization:** Utilizes Recharts to show detailed multi-category expense breakdowns and bi-axial income/expense trend graphs.
- **Role-Based Access Control:** 
  - **Admin Mode:** Full application access. Capable of securely deleting specific transactions.
  - **Viewer Mode:** Read-only access to dashboard metrics and transaction logs.
- **Dark/Light Theme Engine:** Built-in seamless toggling between carefully curated Dark and Light aesthetics.
- **Interactive Modals:** Includes an informative Help Center application guide and a live-tracking User Profile tracker.

## 🛠️ Overview of Approach

This application was engineered with a focus on modern UI/UX design, maintainability, and clean UI logic:
- **Core Technology:** Built using **React** (Hooks, Components, Context) and initialized via **Vite** for lightning-fast hot module replacement and optimized builds.
- **Data Flow & State Management:** Core data structures (like mocked backend transactions), active views, theme preferences, and authentication roles are managed as top-level application state in `App.jsx`. This acts as a single source of truth across the components.
- **Styling Architecture:** Styled entirely using highly optimized Vanilla CSS. A centralized `index.css` acts as the design system containing CSS variables for colors (HSL), spacing, and typography. This dynamically cascades styles into a robust Dark and Light mode wrapper.
- **Component Design:** Incorporates a strict modular component structure (`Sidebar`, `Header`, `Dashboard`, and `Transactions`), ensuring separation of responsibilities and ease of code maintenance.

## 📦 Setup Instructions

Follow these steps to run the application locally on your machine:

1. **Clone the Repository** (or download and extract the source folder).
2. **Navigate into the project directory:**
   ```bash
   cd finance-dashboard-ui
   ```
3. **Install Dependencies:**
   Ensure you have [Node.js](https://nodejs.org) installed on your machine, then execute:
   ```bash
   npm install
   ```
4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
5. **View the Application:**
   Open your browser and navigate to the address shown in your terminal (typically `http://localhost:5173`).

## 📚 Core Dependencies

- **React / ReactDOM**: UI library.
- **Vite**: Frontend build tool.
- **Recharts**: Used for data visualization.
- **Lucide-React**: Provides SVG iconography throughout the app interface.
- **Date-Fns**: Reliable date formatting and parsing utility used for the transaction.
