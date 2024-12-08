import mongoose, { Schema, Types, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    createdAt: Date,
    username: string,
}

interface IThoughts extends Document {
    thoughtsText: string,
    createdAt: Date,
    username: string,
    reactions: IReaction[]
}

const reactionSchema = new Schema<IReaction>(
    {
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
    },
    {
        timestamps: true,
        _id: false
    }
);

const thoughtsSchema = new mongoose.Schema<IThoughts>({
    thoughtsText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (timestamp: Date): Date => timestamp,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

// const Thoughts = model('thoughts', thoughtsSchema);

export default mongoose.model('Thoughts', thoughtsSchema);
