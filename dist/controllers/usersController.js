import { ObjectId } from 'mongodb';
import Thoughts from '../models/Thoughts.js';
import Users from '../models/Users.js';



// Aggregate function to get number of users overall
export const headCount = async () => {
    const numberOfUsers = await Users.aggregate()
        .count('usersCount');
    return numberOfUsers;
};
// Aggregate function for getting the overall grade using $avg
export const grade = async (usersId) => Users.aggregate([
    // only include the given student by using $match
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
    const { usersId } = req.params;
    try {
        const users = await Users.findById(usersId);
        if (users) {
            res.json({
                Users,
                grade: await grade(usersId)
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
        const thoughts = await Thoughts.findOneAndUpdate({ users: req.params.usersId }, { $pull: { users: req.params.usersId } }, { new: true });
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
 * POST Assignment based on /users/:usersId/assignments
 * @param string id
 * @param object assignment
 * @returns object users
*/
export const addAssignment = async (req, res) => {
    console.log('You are adding an assignment');
    console.log(req.body);
    try {
        const users = await Users.findOneAndUpdate({ _id: req.params.usersId }, { $addToSet: { assignments: req.body } }, { runValidators: true, new: true });
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
 * DELETE Assignment based on /users/:usersId/assignments
 * @param string assignmentId
 * @param string usersId
 * @returns object users
*/
export const removeAssignment = async (req, res) => {
    try {
        const users = await Users.findOneAndUpdate({ _id: req.params.usersId }, { $pull: { assignments: { assignmentId: req.params.assignmentId } } }, { runValidators: true, new: true });
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
