import express from 'express';
import {
  showPost,
  createNewPost,
  updatePost,
  deletePost,
} from '../controllers/posts.js';

const router = express.Router();

router.post('/', createNewPost);
router.route('/:title').get(showPost).put(updatePost).delete(deletePost);
export default router;
