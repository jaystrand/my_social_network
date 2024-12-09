import { Schema, model } from 'mongoose';
const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
usersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const Users = model('Users', usersSchema);
export default Users;
