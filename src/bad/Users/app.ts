import express from "express";
import cors from "cors";
import { userRouter } from "./infrastructure/routes/user-router";

export const badApp = express();

badApp.use(express.json());
badApp.use(cors());
badApp.use("/users", userRouter);
