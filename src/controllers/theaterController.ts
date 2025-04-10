import { Request, Response } from "express";
import Theater from "../models/Theater";
import { theaterSchema } from "../utils/zodSchema";

export const getTheaters = async (req: Request, res: Response) => {
    try {
        const theaters = await Theater.find({}, 'name city');

        return res.json({
            data: theaters,
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

export const postTheater = async (req: Request, res: Response) => {
    try {
        const body = theaterSchema.parse(req.body)

        const theater = new Theater({
            name: body.name,
            city: body.city
        })

        const newData = await theater.save()

        return res.json({
            message: "Success created data",
            data: newData,
            status: "success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create data",
            data: null,
            status: "Failed"
        });
    }
}

export const putTheater = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const body = theaterSchema.parse(req.body)

        await Theater.findByIdAndUpdate(id, {
            name: body.name,
            city: body.city
        })

        const updatedData = await Theater.findById(id)

        return res.json({
            message: "Success updated data",
            data: updatedData,
            status: "success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update data",
            data: null,
            status: "Failed"
        });
    }
}

export const deleteTheater = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const deleteData = await Theater.findById(id)

        await Theater.findByIdAndDelete(id);

        return res.json({
            message: "Success deleted data",
            data: deleteData,
            status: "success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete data",
            data: null,
            status: "Failed"
        });
    }
}

export const getDetailTheater = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const detailData = await Theater.findById(id)

        return res.json({
            data: detailData,
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

