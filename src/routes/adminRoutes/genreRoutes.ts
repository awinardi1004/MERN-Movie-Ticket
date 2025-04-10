import express  from "express";
import { getGenres, postGenre, putGenre, deleteGenre, getDetailGenre } from "../../controllers/genreController";
import { validateRequest } from "../../middlewares/validateRequest";
import { genreSchema } from "../../utils/zodSchema";

const genreRoutes = express.Router();

genreRoutes.get('/genres', getGenres);
genreRoutes.get('/genres/:id', getDetailGenre);
genreRoutes.post('/genres', validateRequest(genreSchema), postGenre);
genreRoutes.put('/genres/:id', validateRequest(genreSchema), putGenre);
genreRoutes.delete('/genres/:id', deleteGenre);

export default genreRoutes;