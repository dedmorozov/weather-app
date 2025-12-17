# Weather app

React + Node.js

## Structure

- `client` — Vite + React + TypeScript FE (FSD: `app/`, `pages/`, `shared/`), SCSS.
- `server` — Express API + TypeScript, cash responses of OpenWeatherMap.

## How to use

- Enter a city name to see temperature, description, humidity, wind.

## How to start local

1. Install dependencies:

```bash
npm install
```

2. Add OpenWeatherMap API key:

```bash
cp server/.env.example server/.env
```

Add `OPENWEATHER_API_KEY` in `server/.env`.

## Run

```bash
npm run dev
```

- Srver: `http://localhost:4000`
- Client: `http://localhost:5173`

## Build

```bash
cd client && npm run build
cd server && npm run build
cd server && npm run start
```
