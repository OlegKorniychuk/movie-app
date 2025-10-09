# 🎬 Movie App

A simple and lightweight **REST API** for storing and managing movie data.

---

## 🧩 Architecture Overview

The project follows a **layered architecture** for maintainability and scalability:

`Service → Controller → Router`

### Key Features

- **Layered structure**
- **Robust error handling**
- **Incoming data validation**

---

## 🚀 Run in Development Mode

1. **Clone the repository**

   ```bash
   git clone https://github.com/OlegKorniychuk/movie-app.git
   ```

2. **Enter the project directory**

   ```bash
   cd movie-app
   ```

3. **Create the environment file**

   ```bash
   cp .env.example .env
   ```

   Or create your own `.env` manually based on `.env.example`.

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Run in development mode**

   ```bash
   npm run dev
   ```

The app will start on the port defined in your `.env` file (default: **8050**).

---

## 🐳 Run with Docker

You can run the app as a Docker container without installing dependencies locally:

```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 -e ACCESS_TOKEN_SECRET=secret kornoleh/movies
```

- The app will be accessible at **http://localhost:8000**
- You can change exposed ports or environment variables as needed

---

## 🧰 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Sequelize-typescript** (with SQLite)
- **Zod** for validation
- **JWT** for authentication
