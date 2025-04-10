import express  from "express";
import genreRoutes from "./genreRoutes";
import theaterRoute from "./theaterRoutes";

const adminRoutes = express.Router()

adminRoutes.use(genreRoutes)
adminRoutes.use(theaterRoute)

export default adminRoutes;