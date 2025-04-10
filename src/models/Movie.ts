import mongoose from "mongoose";
import { getAssetUrl } from "../utils/helper";
import Genre from "./Genre";
import Theater from "./Theater";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre"
        },
        theaters: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theater"
        },
        description: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        price: Number,
        available: {
            type: Boolean,
            default: false
        },
        bonus: String
    }, 
    {
        toJSON: { virtuals: true }
    }
);

movieSchema.virtual('thumbnailURL').get(function () {
    return `${getAssetUrl()}${this.thumbnail}`;
});

// Hook setelah menyimpan
movieSchema.post('save', async (doc) => {
    if (doc) {
        await Genre.findByIdAndUpdate(doc.genre, {
            $push: { movies: doc._id }
        });

        await Theater.findByIdAndUpdate(doc.theaters, {
            $push: { movies: doc._id }
        });
    }
});

// Hook setelah penghapusan (lebih baik pakai findOneAndDelete atau pre middleware)
movieSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Genre.findByIdAndUpdate(doc.genre, {
            $pull: { movies: doc._id }
        });

        await Theater.findByIdAndUpdate(doc.theater, {
            $pull: { movies: doc._id }
        });
    }
});

export default mongoose.model('Movie', movieSchema, 'movies');
