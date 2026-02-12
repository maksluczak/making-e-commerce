import {Router} from 'express';
import {authRoutes} from "./authRoutes";
import {userRoutes} from "./userRoutes";
import {itemRoutes} from "./itemRoutes";
import {cartRoutes} from "./cartRoutes";
import {orderRoutes} from "./orderRoutes";

export const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/item", itemRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);