import Thoughts from '../models/Thoughts.js';
//import Users from '../models/Users.ts';
/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
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
        const users = await Thoughts.findById(thoughtsId);
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
* @returns a single Thoughts object
*/
export const createThoughts = async (req, res) => {
    const { thoughtsText, username } = req.body;
    try {
        const newThoughts = await Thoughts.create({
            thoughtsText, username
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
 * PUT Thoughts based on id /thoughts/:id
 * @param string id
 * @returns a updated Thoughts object
*/
export const updateThoughts = async (req, res) => {
    const { thoughtsId } = req.params;
    const updateData = req.body;
    try {
        // Find the user by ID and update with the data from the request body
        const updatedThoughts = await Thoughts.findByIdAndUpdate(thoughtsId, { $set: updateData }, { new: true, runValidators: true });
        if (!updatedThoughts) {
            return res.status(404).json({ message: 'No thoughts found with that ID' });
        }
        return res.json(updatedThoughts);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
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
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const addReactions = async (req, res) => {
    try {
        const thoughts = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtsId }, { $addToSet: { reactions: req.body } }, // Add the entire reaction object
        { runValidators: true, new: true });
        if (!thoughts) {
            return res
                .status(404)
                .json({ message: 'No thoughts found with that ID :(' });
        }
        return res.json(thoughts);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
/**
 * DELETE Reactions based on /thoughts/:thoughtsId/reactions
 * @param string reactionsId
 * @param string thoughtsId
 * @returns object thoughts
*/
export const removeReactions = async (req, res) => {
    try {
        const thoughts = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtsId }, { $pull: { reactions: { _id: req.params.reactionsId } } }, // Remove by reaction's _id
        { runValidators: true, new: true });
        if (!thoughts) {
            return res
                .status(404)
                .json({ message: 'No thoughts found with that ID :(' });
        }
        return res.json(thoughts);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
