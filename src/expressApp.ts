import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import CataLogRouter from "./routes/catalog.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/api/v1", CataLogRouter);

app.use((err: any, req: Request, res: Response) => {
  res
    .status(err.code || 500)
    .json({ message: err.message, stack: err.stack, status: false });
});

const PORT = process.env.PORT || 4000;

export const ExpressServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
  });
};
