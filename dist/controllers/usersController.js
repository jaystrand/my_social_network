import { ObjectId } from 'mongodb';
import { Users, Thoughts } from '../models/index.js';
// Aggregate function to get number of users overall
export const headCount = async () => {
    const numberOfUsers = await Users.aggregate()
        .count('usersCount');
    return numberOfUsers;
};
// Aggregate function for getting the overall grade using $avg
export const grade = async (usersId) => Users.aggregate([
    // only include the given users by using $match
    { $match: { _id: new ObjectId(usersId) } },
    {
        $unwind: '$assignments',
    },
    {
        $group: {
            _id: new ObjectId(usersId),
            overallGrade: { $avg: '$assignments.score' },
        },
    },
]);
/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req, res) => {
    try {
        const users = await Users.find();
        const usersObj = {
            users,
            headCount: await headCount(),
        };
        res.json(usersObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Users based on id /users/:id
 * @param string id
 * @returns a single Users object
*/
export const getUsersById = async (req, res) => {
    const { UsersId } = req.params;
    console.log(UsersId);
    try {
        const users = await Users.findById(UsersId);
        console.log(users);
        if (users) {
            res.json({
                users,
                grade: await grade(UsersId)
            });
        }
        else {
            res.status(404).json({
                message: 'Users not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * POST Users /users
 * @param object users
 * @returns a single Users object
*/
export const createUsers = async (req, res) => {
    try {
        const users = await Users.create(req.body);
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
/**
 * DELETE Users based on id /users/:id
 * @param string id
 * @returns string
*/
export const deleteUsers = async (req, res) => {
    try {
        const users = await Users.findOneAndDelete({ _id: req.params.usersId });
        if (!users) {
            return res.status(404).json({ message: 'No such users exists' });
        }
        const thoughts = await Thoughts.findOneAndUpdate({ user: req.params.usersId }, { $pull: { users: req.params.usersId } }, { new: true });
        if (!thoughts) {
            return res.status(404).json({
                message: 'Users deleted, but no thoughts found',
            });
        }
        return res.json({ message: 'Users successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
/**
 * POST Friends based on /users/:usersId/friends
 * @param string id
 * @param object friends
 * @returns object users
*/
export const addFriends = async (req, res) => {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const users = await Users.findOneAndUpdate({ _id: req.params.usersId }, { $addToSet: { friends: req.params.friendsId } }, { runValidators: true, new: true });
        if (!users) {
            return res
                .status(404)
                .json({ message: 'No users found with that ID :(' });
        }
        return res.json(Users);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
/**
 * DELETE Friends based on /users/:usersId/friends
 * @param string friendsId
 * @param string usersId
 * @returns object users
*/
export const removeFriends = async (req, res) => {
    try {
        const users = await Users.findOneAndUpdate({ _id: req.params.usersId }, { $pull: { friends: { friendsId: req.params.friendsId } } }, { runValidators: true, new: true });
        if (!Users) {
            return res
                .status(404)
                .json({ message: 'No users found with that ID :(' });
        }
        return res.json(users);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
