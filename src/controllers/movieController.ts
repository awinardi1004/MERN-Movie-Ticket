import type { Request, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Theater from "../models/Theater";
import { movieSchema } from "../utils/zodSchema";
import path from "path";
import fs from "fs";

export const getMovies = async (req: Request, res: Response) => {
     try {
            const movies = await Movie.find().populate({
                path: "genre",
                select: "name" 
            }).populate({
                path: "theates",
                select: "name"
            })
    
            return res.json({
                data: movies,
                message: "Success get data",
                status: "Success"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Failed to get data",
                data: null,
                status: "Failed"
            });
        }
};

export const createMovie = async  (req: Request, res: Response) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                message: "Thumbnail is required",
                data: null,
                status: "failed"
            })
        }

        const parse = movieSchema.safeParse({
            title: req.body.title,
            genre: req.body.genre,
            theaters: req.body.theaters.split(','),
            available: req.body.available === '1' ? true:false,
            description: req.body.description,
            price: Number.parseInt(req.body.price),
            bonus: req.body?.bonus
        })

        if (!parse.success) {
            const errorMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json({
                message: "Invalid request",
                details: errorMessages,
                status: "failed"
            })
        }

        const movie = new Movie({
            title: parse.data.title,
            genre: parse.data.genre,
            available: parse.data.available,
            theaters: parse.data.theaters,
            thumbnail: req.file?.filename,
            description: parse.data.description,
            bonus: parse.data.bonus
        })

        await movie.save()

        return res.json({
            status: "success",
            data: movie,
            message: "Success create data"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed"
        });
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const parse = movieSchema.safeParse({
            title: req.body.title,
            genre: req.body.genre,
            theaters: req.body.theaters.split(','),
            available: req.body.available === '1' ? true:false,
            description: req.body.description,
            price: Number.parseInt(req.body.price),
            bonus: req.body?.bonus
        })

        if (!parse.success) {
            const errorMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json({
                message: "Invalid request",
                details: errorMessages,
                status: "failed"
            });
        }

        const oldMovie = await Movie.findById(id);

        if (!oldMovie) {
            return res.json({
                message: "Data movie not found",
                status: "failed",
                data: null
            })
        }

        if(req.file) {
            const dirname = path.resolve();
            const filepath = path.join(
                dirname,
                "public/uploads/thumbnails",
                oldMovie.thumbnail ?? ""
            )

            if (fs.existsSync(filepath)){
                fs.unlinkSync(filepath)
            }
        }

        await Genre.findByIdAndUpdate(oldMovie.genre, {
            $pull: {
                movies: oldMovie._id,
            },
        });

        for (const theater of oldMovie.theaters) {
            await Theater.findByIdAndUpdate(theater._id, {
                $pull: {
                    movies: oldMovie._id,
                },
            });
        }

        await Movie.findByIdAndUpdate(oldMovie._id, {
            title: parse.data.title,
            genre: parse.data.genre,
            available: parse.data.available,
            theaters: parse.data.theaters,
            thumbnail: req?.file ? req.file?.filename : oldMovie.thumbnail,
            description: parse.data.description,
            bonus: parse.data.bonus
        })

        await Genre.findByIdAndUpdate(parse.data.genre, {
            $push: {
                movies: id,
            },
        });

        for (const theater of parse.data.theaters) {
            await Theater.findByIdAndUpdate(theater, {
                $push: {
                    movies: id,
                },
            });
        }

        const updatedMovie = await Movie.findById(id) 

        return res.json({
            status: "success",
            data: updatedMovie,
            message: "Success update data"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get data",
            data: null,
            status: "Failed"
        });
    }
}