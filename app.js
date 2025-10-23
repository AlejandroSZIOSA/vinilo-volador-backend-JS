//1
import express from "express";

//4
import vinylsRoutes from "./routes/vinyls.js";

//1
const app = express();

//5
app.use("/", vinylsRoutes);

//1
app.listen(8080);
