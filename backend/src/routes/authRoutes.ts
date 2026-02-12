import {Router} from "express";
import {handleRegister} from "../controllers/Auth/handleRegister";
import {handleLogin} from "../controllers/Auth/handleLogin";
import {handleLogout} from "../controllers/Auth/handleLogout";
import {refreshToken} from "../controllers/Auth/refreshToken";

export const authRoutes: Router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: User register
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Error in signing up
 */
authRoutes.post("/register", handleRegister);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Error in signing in
 */
authRoutes.post("/login", handleLogin);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
authRoutes.post("/logout", handleLogout);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresh token
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
authRoutes.post("/refresh", refreshToken);