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
<<<<<<< HEAD
const Users = model('Users', usersSchema);
=======
const Users = model('User', usersSchema);
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
export default Users;
