import {Router} from "express";
import {placeOrder} from "../controllers/Order/placeOrder";
import {processOrder} from "../controllers/Order/processOrder";
import {verifyJWT} from "../middleware/verifyJWT";

export const orderRoutes: Router = Router();
orderRoutes.use(verifyJWT);

/**
 * @openapi
 * /order:
 *   post:
 *     summary: Place order
 *     tags:
 *       - Order
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *             properties:
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order placed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
orderRoutes.post("/", placeOrder);

/**
 * @openapi
 * /order:
 *   patch:
 *     summary: Process order
 *     tags:
 *       - Order
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       201:
 *         description: Order processed successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
orderRoutes.patch("/:id", processOrder);