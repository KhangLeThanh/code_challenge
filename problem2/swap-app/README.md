# Currency Swap Form

A simple and interactive **currency swap application** that allows users to convert one token to another based on real-time price data.

The application fetches token prices from the Switcheo API and calculates exchange rates dynamically. Users can input an amount, select currencies with token icons, and see the conversion result instantly.

---

## Features

- Fetch token prices from external API
- Display token list with **icons**
- Convert one currency to another
- Display conversion result below the form
- Form validation using **Formik**
- Clean and responsive UI using **Material UI**
- Handles duplicated currencies in the API by selecting the **latest price**
- Modular component structure for maintainability

---

## Tech Stack

- **React**
- **TypeScript**
- **Formik** – form handling & validation
- **Material UI (MUI)** – UI components
- **Axios** – API requests
- **Vite** – development environment

---

## Installation

Clone the repository:

```bash
git clone <repo-url>
cd currency-swap
```

## Running

Install dependencies

```bash
npm install
```

Running app

```bash
npm run dev
```

The application will run at:

```bash
http://localhost:5173
```
