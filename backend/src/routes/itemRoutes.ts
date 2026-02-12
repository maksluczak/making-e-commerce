import {Router} from "express";
import {createItem} from "../controllers/Item/createItem";
import {getAllItems} from "../controllers/Item/getAllItems";
import {getItem} from "../controllers/Item/getItem";
import {deleteItem} from "../controllers/Item/deleteItem";
import {filterItemsByCategory} from "../controllers/Item/filterByCategory";
import {filterItemsByName} from "../controllers/Item/filterItemsByName";
import {filterItems} from "../controllers/Item/filterItems";

import {upload} from "../middleware/upload";

export const itemRoutes: Router = Router();

// FILTERING
/**
 * @openapi
 * /item/filter/category:
 *   get:
 *     summary: Filter items by category
 *     tags:
 *       - Item
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
itemRoutes.get("/filter/category", filterItemsByCategory);

/**
 * @openapi
 * /item/filter/name:
 *   get:
 *     summary: Filter items by name
 *     tags:
 *       - Item
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
itemRoutes.get("/filter/name", filterItemsByName);

/**
 * @openapi
 * /item/filter:
 *   get:
 *     summary: Filter items
 *     tags:
 *       - Item
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Filtered items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: array
 *       500:
 *         description: Error filtering items
 */
itemRoutes.get("filter", filterItems);

// ITEM ROUTES
/**
 * @openapi
 * /item:
 *   post:
 *     summary: Create item
 *     tags:
 *       - Item
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - gender
 *               - category
 *               - color
 *               - price
 *               - variants
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               gender:
 *                 type: string
 *               category:
 *                 type: string
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - size
 *                     - stock
 *                   properties:
 *                     size:
 *                       type: string
 *                     stock:
 *                       type: number
 *     responses:
 *       201:
 *         description: Item created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 body:
 *                   type: array
 *       400:
 *         description: Error creating item
 */
itemRoutes.post("/", upload.single("image"), createItem);

/**
 * @openapi
 * /item:
 *   get:
 *     summary: Get all items
 *     tags:
 *       - Item
 *   responses:
 *       200:
 *         description: Response items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error fetching Items
 */
itemRoutes.get("/", getAllItems);

/**
 * @openapi
 * /item/{id}:
 *   get:
 *     summary: Get item by id
 *     tags:
 *       - Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Item found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error fetching Item
 */
itemRoutes.get("/:id", getItem);
/**
 * @openapi
 * /item/{id}:
 *   delete:
 *     summary: Delete item
 *     tags:
 *       - Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error occurred while deleting Item
 */
itemRoutes.delete("/:id", deleteItem);
