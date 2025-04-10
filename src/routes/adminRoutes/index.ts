import express  from "express";
import genreRoutes from "./genreRoutes";
import theaterRoute from "./theaterRoutes";
import movieRoutes from "./movieRoutes";

const adminRoutes = express.Router()

adminRoutes.use(genreRoutes)
adminRoutes.use(theaterRoute)
adminRoutes.use(movieRoutes)

export default adminRoutes;