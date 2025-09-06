import express from 'express';
import { createShortUrl, redirectFromShortUrl, getUserUrls, deleteShortUrl } from '../controller/short_url.controller.js';
import { attachUser } from '../utils/attachUser.js';

const router = express.Router();

router.post('/create', attachUser, createShortUrl);
router.get('/urls', attachUser, getUserUrls);
router.delete('/:id', attachUser, deleteShortUrl);
router.get('/:id', redirectFromShortUrl);

export default router;