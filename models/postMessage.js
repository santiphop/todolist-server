import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    comment: String,
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    dueDate: {
        type: Date,
        default: new Date(),
    },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
