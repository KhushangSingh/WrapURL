import express from 'express';
import { createShortUrl } from '../controller/short_url.controller.js';
import { getUserUrls } from '../controller/short_url.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply auth middleware to all user routes
router.use(authMiddleware);

router.post("/", createShortUrl);
router.post("/urls", getUserUrls);

export default router;