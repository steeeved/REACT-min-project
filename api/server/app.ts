import express from "express";
import cors from "cors"; // Add this import
import customerRoutes from "./routes/customer.routes";
import { initializeDI } from "./bootstrap";

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(express.json());
  }

  private configureRoutes() {
    this.app.use("/api/customers", customerRoutes);
  }

  public async start(port: number) {
    await initializeDI();
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
}
