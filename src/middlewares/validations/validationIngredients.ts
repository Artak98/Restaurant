import joi from "joi"
import { Request, Response, NextFunction } from "express";

const schemaAdd = joi.object({
    name: joi.string().required().min(5),
    group: joi.string().required().min(3),
    unit: joi.string().required(),
    price: joi.number().required(),
    critical: joi.number().required()
});

const schemaUpdate = joi.object({
    name: joi.string().optional().allow(''),
    group: joi.string().optional().allow(''),
    unit: joi.string().optional().allow(''),
    price: joi.number().optional(),
    critical: joi.number().optional()
})


export const validationIngredients = async function (req: Request, res: Response, next: NextFunction) {
    try {
        await schemaAdd.validateAsync(req.body)
        next()
    } catch (error) {
        return res.status(400).send({ error: `Invalid name, group,unit, price or critical ${error}` })
    }
}


export const validationUpdateIngredient = async function (req: Request, res: Response, next: NextFunction) {
    try {
        await schemaUpdate.validateAsync(req.body)
        if (req.body.name) {
            if (req.body.name.length <= 4) {
                return res.status(400).send({ error: "at least 4 word name" })
            }
        }
        if (req.body.group) {
            if (req.body.group.length <= 2) {
                return res.status(400).send({ error: "at least 3 word group" })
            }
        }
        next()
    } catch (error) {
        return res.status(400).send({ error: `Invalid name, group,unit,  price or critical ${error}` })
    }
}





