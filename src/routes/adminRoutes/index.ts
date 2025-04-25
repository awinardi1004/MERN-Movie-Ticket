import express  from "express";
import genreRoutes from "./genreRoutes";
import theaterRoute from "./theaterRoutes";
import movieRoutes from "./movieRoutes";
import customerRoutes from "./customerRoutes";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";

const adminRoutes = express.Router()

adminRoutes.use(verifyToken);
adminRoutes.use(verifyRole("admin"));
adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoute);
adminRoutes.use(movieRoutes);
adminRoutes.use(customerRoutes);

export default adminRoutes;