import express from 'express'
import { deleteTheater, getDetailTheater, getTheaters, postTheater, putTheater } from '../../controllers/theaterController';
import { validateRequest } from '../../middlewares/validateRequest';
import { theaterSchema } from '../../utils/zodSchema';

const theaterRoute = express.Router();

theaterRoute.get('/theaters', getTheaters);
theaterRoute.get('/theaters/:id', getDetailTheater);
theaterRoute.post('/theaters', validateRequest(theaterSchema), postTheater);
theaterRoute.put('/theaters/:id', validateRequest(theaterSchema), putTheater);
theaterRoute.delete('/theaters/:id', deleteTheater);

export default theaterRoute