import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User, Thought } from '../models';

// Aggregate function to get number of students overall

export const headCount = async () => {
    const numberOfStudents = await User.aggregate()
        .count('studentCount');
    return numberOfStudents;
}

// Aggregate function for getting the overall grade using $avg
export const grade = async (studentsId: string) =>
    User.aggregate([
        // only include the given student by using $match
        { $match: { _id: new ObjectId(studentsId) } },
        {
            $unwind: '$assignments',
        },
        {
            $group: {
                _id: new ObjectId(studentsId),
                overallGrade: { $avg: '$assignments.score' },
            },
        },
    ]);

/**
 * GET All Students /students
 * @returns an array of Students
*/
export const getAllUser = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const studentObj = {
            users,
            headCount: await headCount(),
        }

        res.json(studentObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Student based on id /students/:id
 * @param string id
 * @returns a single Student object
*/
export const getStudentById = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    try {
        const student = await User.findById(studentId);
        if (student) {
            res.json({
                student,
                grade: await grade(studentId)
            });
        } else {
            res.status(404).json({
                message: 'Student not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST Student /students
 * @param object student
 * @returns a single Student object
*/

export const createStudent = async (req: Request, res: Response) => {
    try {
        const student = await User.create(req.body);
        res.json(student);
    } catch (err) {
        res.status(500).json(err);
    }
}
/**
 * DELETE Student based on id /students/:id
 * @param string id
 * @returns string 
*/

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const student = await User.findOneAndDelete({ _id: req.params.studentId });

        if (!student) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        const course = await Thought.findOneAndUpdate(
            { students: req.params.userId },
            { $pull: { students: req.params.userId } },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({
                message: 'User deleted, but no courses found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * POST Assignment based on /students/:studentId/assignments
 * @param string id
 * @param object assignment
 * @returns object student 
*/

export const addAssignment = async (req: Request, res: Response) => {
    console.log('You are adding an assignment');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.studentId },
            { $addToSet: { assignments: req.body } },
            { runValidators: true, new: true }
        );

        if (!User) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(User);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE Assignment based on /students/:studentId/assignments
 * @param string assignmentId
 * @param string studentId
 * @returns object student 
*/

export const removeAssignment = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.studentId },
            { $pull: { assignments: { assignmentId: req.params.assignmentId } } },
            { runValidators: true, new: true }
        );

        if (!User) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
