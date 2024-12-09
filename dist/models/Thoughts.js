import mongoose, { Schema, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    _id: false
});
const thoughtsSchema = new mongoose.Schema({
<<<<<<< HEAD
    thoughtsText: {
=======
    thoughtText: {
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (timestamp) => timestamp,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true
});
<<<<<<< HEAD
// const Thoughts = model('thought', thoughtSchema);
=======
// const Thoughts = model('thoughts', thoughtSchema);
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
export default mongoose.model('Thoughts', thoughtsSchema);
