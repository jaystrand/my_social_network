import Thoughts from '../models/Thoughts.js';
import Users from '../models/Users.js';

console.log('Thoughts:', Thoughts);
console.log('Users:', Users);


export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Thoughts based on id /thoughts/:id
 * @param string id
 * @returns a single Thoughts object
*/
export const getThoughtsById = async (req, res) => {
    const { thoughtsId } = req.params;
    try {
        const user = await Thoughts.findById(thoughtsId);
        if (users) {
            res.json(users);
        }
        else {
            res.status(404).json({
                message: 'Volunteer not found'
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
* POST Thoughts /thoughts
* @param object username
* @returns a single Thought object
*/
export const createThoughts = async (req, res) => {
    const { thoughts } = req.body;
    try {
        const newThoughts = await Thoughts.create({
            thoughts
        });
        res.status(201).json(newThoughts);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
 * PUT THoughts based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thoughts object
*/
export const updateThoughts = async (req, res) => {
    try {
        const thoughts = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtsId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thoughts with this id!' });
        }
        res.json(createThoughts);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
* DELETE Thoughts based on id /thoughts/:id
* @param string id
* @returns string
*/
export const deleteThoughts = async (req, res) => {
    try {
        const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });
        if (!thoughts) {
            res.status(404).json({
                message: 'No thoughts with that ID'
            });
        }
        else {
            res.json({ message: 'Thoughts deleted!' });

            res.json({ message: 'Thoughts and users deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
