import { Request, Response } from 'express';
import Thought from '../models/Thoughts.js';
//import User from '../models/Users.ts';

/**
 * GET All Courses /courses
 * @returns an array of Courses
*/
export const getAllThought = async(_req: Request, res: Response) => {
    try {
        const thought = await Thought.find();
        res.json(thought);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Course based on id /course/:id
 * @param string id
 * @returns a single Course object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const user = await Thought.findById(thoughtId);
      if(user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: 'Volunteer not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST Thought /thoughts
 * @param object username
 * @returns a single Thought object
*/
export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
      const newThought = await Thought.create({
        thought
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT THought based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  /**
 * DELETE Thought based on id /thought/:id
 * @param string id
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      } else {
        res.json({ message: 'Thought deleted!' });

        res.json({ message: 'Thought and users deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
