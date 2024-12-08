import { Request, Response } from 'express';
import Thoughts from '../models/Thoughts.js';
//import Users from '../models/Users.ts';

/**
 * GET All Courses /courses
 * @returns an array of Courses
*/
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
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
export const getThoughtsById = async (req: Request, res: Response) => {
    const { thoughtsId } = req.params;
    try {
      const users = await Thoughts.findById(thoughtsId);
      if(users) {
        res.json(users);
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
 * POST Thoughts /thoughts
 * @param object username
 * @returns a single Thoughts object
*/
export const createThoughts = async (req: Request, res: Response) => {
    const { thoughts } = req.body;
    try {
      const newThoughts = await Thoughts.create({
        thoughts
      });
      res.status(201).json(newThoughts);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Thoughts based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thoughts object
*/
export const updateThoughts = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(updateThoughts)
    } catch (error: any) {
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
export const deleteThoughts = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId});
      
      if(!thoughts) {
        res.status(404).json({
          message: 'No thoughts with that ID'
        });
      } else {
        res.json({ message: 'Thoughts deleted!' });

        res.json({ message: 'Thoughts and users deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
