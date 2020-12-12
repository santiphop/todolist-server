import express from "express";
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    completePost,
} from "../controllers/posts.js";

const router = express.Router();

//localhost:5000/posts

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/completePost", completePost);

export default router;
