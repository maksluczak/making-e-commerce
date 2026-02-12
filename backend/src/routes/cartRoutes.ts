import {Router} from "express";
import {createCart} from "../controllers/Cart/createCart";
import {getCart} from "../controllers/Cart/getCart";
import {updateCart} from "../controllers/Cart/updateCart";
import {verifyJWT} from "../middleware/verifyJWT";

export const cartRoutes: Router = Router();
cartRoutes.use(verifyJWT);

/**
 * @openapi
 * /cart:
 *   post:
 *     summary: Create cart / update existing cart (add item to cart)
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - size
 *               - quantity
 *             properties:
 *               itemId:
 *                 type: number
 *               size:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedCart:
 *                   type: object
 *       201:
 *         description: Cart created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
cartRoutes.post("/", createCart);

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Get user cart
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Error fetching cart
 */
cartRoutes.get("/", getCart);

/**
 * @openapi
 * /cart:
 *   patch:
 *     summary: Update cart
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - size
 *               - quantity
 *             properties:
 *               itemId:
 *                 type: number
 *               size:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Cart updated
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
cartRoutes.patch("/", updateCart);