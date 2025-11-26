import dotenv from "dotenv";
import { createApp } from "./app";
import { disconnectDatabase } from "./lib/prisma";

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    const app = await createApp();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM signal received: closing HTTP server");
      await disconnectDatabase();
      process.exit(0);
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT signal received: closing HTTP server");
      await disconnectDatabase();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
