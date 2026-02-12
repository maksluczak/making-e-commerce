import {Router} from "express";
import {getAllUsers} from "../controllers/User/getAllUsers";

export const userRoutes: Router = Router();

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *   responses:
 *       200:
 *         description: Response users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error fetching Users
 */
userRoutes.get("/", getAllUsers);
