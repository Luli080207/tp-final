import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/mongodb";
import router from "./routes";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status - :response-time ms"));

app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error arrancando la app:", err);
    process.exit(1);
  }
};

start();