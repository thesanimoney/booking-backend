import express from "express";
import getPosts from "../controllers/posts/getPosts";
import addPost from "../controllers/posts/addPost";
import auth from "../middleware/auth";
import getPost from "../controllers/posts/getPost";
import addDescription from "../controllers/posts/addDescription";
import getSavedPosts from "../controllers/posts/getSavedPosts";
import toggleSavedPost from "../controllers/posts/toggleSavedPost";
import getMyPosts from "../controllers/posts/getMyPosts";
import deletePost from "../controllers/posts/deletePost";
import isPublisher from "../middleware/isPublisher";
import updatePost from "../controllers/posts/updatePost";

const router = express.Router();

router.get('/', getPosts)
router.get('/my', auth, getMyPosts)
router.get('/saved', auth, getSavedPosts)
router.get('/:id', getPost)

router.post('/saved', auth, toggleSavedPost)
router.post('/', auth, addPost)
router.post('/description', auth, addDescription)

router.delete('/:postId', [auth, isPublisher], deletePost)

router.put('/:postId', [auth, isPublisher], updatePost)


export default router;