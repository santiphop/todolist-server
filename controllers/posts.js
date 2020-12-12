import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("no post found");
    const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { ...post, id },
        { new: true }
    );

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("no post found");
    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "deleted" });
};

export const completePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("no post found");

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { completed: !post.completed },
        { new: true }
    );

    res.json(updatedPost);
};
