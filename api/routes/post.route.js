import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { addPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.controller.js';
const router = express.Router();
router.get('/',getPosts);
router.post('/',verifyToken,addPost);
router.get('/:id',getPost);
router.put('/:id',verifyToken,updatePost);
router.delete('/:id',verifyToken,deletePost);

export default router;