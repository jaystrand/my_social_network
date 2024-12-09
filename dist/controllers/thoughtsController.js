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
<<<<<<< HEAD
 * GET Thoughts based on id /thoughts/:id
 * @param string id
 * @returns a single Thoughts object
=======
 * GET Course based on id /course/:id
 * @param string id
 * @returns a single Course object
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
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
<<<<<<< HEAD
* POST Thoughts /thoughts
=======
* POST Thought /thoughts
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
* @param object username
* @returns a single Thought object
*/
export const createThoughts = async (req, res) => {
<<<<<<< HEAD
    const { thoughts } = req.body;
    try {
        const newThoughts = await Thoughts.create({
            thoughts
=======
    const { course } = req.body;
    try {
        const newThoughts = await Thoughts.create({
            course
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
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
<<<<<<< HEAD
 * PUT THoughts based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thoughts object
=======
 * PUT Thoughts based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
*/
export const updateThoughts = async (req, res) => {
    try {
        const thoughts = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtsId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thoughts with this id!' });
        }
<<<<<<< HEAD
        res.json(createThoughts);
=======
        res.json(thoughts);
>>>>>>> 3a052c4386f1f78b8f246e75c16f5b2c9e05a647
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
