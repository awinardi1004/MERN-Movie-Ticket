import express  from "express";
import multer from "multer";
import { createMovie, getMovies, updateMovie } from "../../controllers/movieController";
import { imageFilter, thumbnailStorage } from "../../utils/multer";

const upload = multer({storage: thumbnailStorage(), fileFilter: imageFilter})

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', upload.single('thumbnail'), createMovie);
movieRoutes.put('/movies/:id', upload.single('thumbnail'), updateMovie);


export default movieRoutes