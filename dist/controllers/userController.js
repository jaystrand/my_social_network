import { ObjectId } from 'mongodb';
import Thought from '../models/Thoughts.js';
import User from '../models/Users.js';



// Aggregate function to get number of users overall
export const headCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
};
// Aggregate function for getting the overall grade using $avg
export const grade = async (userId) => User.aggregate([
    // only include the given student by using $match
    { $match: { _id: new ObjectId(userId) } },
    {
        $unwind: '$assignments',
    },
    {
        $group: {
            _id: new ObjectId(userId),
            overallGrade: { $avg: '$assignments.score' },
        },
    },
]);
/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUser = async (_req, res) => {
    try {
        const users = await User.find();
        const userObj = {
            users,
            headCount: await headCount(),
        };
        res.json(userObj);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET User based on id /user/:id
 * @param string id
 * @returns a single User object
*/
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const student = await User.findById(userId);
        if (student) {
            res.json({
                User,
                grade: await grade(userId)
            });
        }
        else {
            res.status(404).json({
                message: 'User not found'
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
 * POST User /users
 * @param object user
 * @returns a single User object
*/
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
/**
 * DELETE Student based on id /user/:id
 * @param string id
 * @returns string
*/
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        const course = await Thought.findOneAndUpdate({ user: req.params.userId }, { $pull: { user: req.params.userId } }, { new: true });
        if (!course) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }
        return res.json({ message: 'User successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
/**
 * POST Assignment based on /user/:userId/assignments
 * @param string id
 * @param object assignment
 * @returns object user
*/
export const addAssignment = async (req, res) => {
    console.log('You are adding an assignment');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { assignments: req.body } }, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(User);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
/**
 * DELETE Assignment based on /user/:userId/assignments
 * @param string assignmentId
 * @param string userId
 * @returns object user
*/
export const removeAssignment = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { assignments: { assignmentId: req.params.assignmentId } } }, { runValidators: true, new: true });
        if (!User) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
