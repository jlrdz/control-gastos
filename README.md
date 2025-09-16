# Expenses Tracker App

A personal finance tracker built with **React**, **Supabase**, and **n8n**.  
The application allows users to visualize, filter, and manage their expenses with a clean and modular architecture.

---

## 🚀 Tech Stack
- **React** – Frontend framework for building UI components.
- **Supabase** – Backend-as-a-service (database, auth, API).
- **n8n** – Workflow automation to process and sync financial data.

---

## 📂 Project Structure

```
CONTROL-GASTOS/
 ┣ public/                # Static files
 ┣ src/
 ┃ ┣ assets/              # Images, icons, and static assets
 ┃ ┣ components/          # Reusable UI components
 ┃ ┣ config/              # Global settings (appConfig, constants)
 ┃ ┣ database/            # Database layer or Supabase helpers
 ┃ ┣ hooks/               # Custom React hooks
 ┃ ┣ utils/               # Utility functions (formatting, helpers)
 ┃ ┣ App.css              # Global styles for the app
 ┃ ┣ App.jsx              # Main React component
 ┃ ┣ index.css            # Base CSS (reset, variables)
 ┃ ┣ main.jsx             # Application entry point
 ┣ .env.local             # Local environment variables
 ┣ .gitignore             # Git ignore rules
 ┣ eslint.config.js       # ESLint configuration
 ┣ GEMINI.md              # AI-related notes or documentation
 ┣ index.html             # HTML template
 ┣ package-lock.json      # Dependency lock file
 ┣ package.json           # Project metadata and scripts
 ┣ README.md              # Project documentation
 ┗ vite.config.js         # Vite configuration
```

---

## ⚙️ Configuration

### Environment variables
The app requires a `.env.local` file with the following variables:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-anon-key
```

### Global app settings
Defined in `src/config/appConfig.js`:

- **locale** → default locale for dates and numbers.  
- **theme** → default UI theme and available options.  
- **pagination** → default and available page sizes.

### Constants
Defined in `src/config/constants.js`:

- **currencies** → available currencies (CRC, USD).  
- **paymentMethods** → supported payment types (AMEX, VISA, Cash, Transfer).  

---

## 🧩 Utilities
Located in `src/utils/`:

- **formatDate** → formats Supabase `date` fields (YYYY-MM-DD) according to the locale.  
- **formatNumber** → formats numeric values with separators and decimals.  
- **formatCurrency** → formats numbers as currency using global config.  

---

## 📸 Features
- Data filtering (by text, category, currency, payment method, and date).  
- Paginated results.  
- Consistent formatting for dates, numbers, and currencies.  
- Modular configuration (`config/`) and reusable utilities (`utils/`).  
- Clean architecture prepared for CRUD operations.  

---

## 🛠️ Installation

Clone the repository and install dependencies:

```
# Clone repo
git clone https://github.com/jlrdz/control-gastos.git

# Move into the project folder
cd control-gastos

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173/`.

---

## 📸 Screenshots

> Replace the examples below with actual screenshots of your app.

| Expenses List | Filters Applied |
|---------------|-----------------|
| ![Expenses](docs/screenshots/expenses.png) | ![Filters](docs/screenshots/filters.png) |

---

## 📌 License
This project is licensed under the **MIT License**.
