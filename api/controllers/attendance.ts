import { Request, Response } from "express";
import {
  getAllAttendanceByEmployeeId,
  getAttendanceById,
  getAllAttendances,
  createAttendance,
} from "../services/attendance";

export const handleGetAllAttendanceByEmployeeId = async (
  req: Request,
  res: Response
) => {
  try {
    const employeeId = req.params.id;
    const attendances = await getAllAttendanceByEmployeeId(employeeId);
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const handleGetAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendanceId = req.params.id;
    console.log(attendanceId);
    const attandance = await getAttendanceById(attendanceId);
    res.status(200).json(attandance);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const handleGetallAttendances = async (req: Request, res: Response) => {
  try {
    const attendances = await getAllAttendances();
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const handleCreateAttendance = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const newAttendance = await createAttendance(body);
    res.status(200).json(newAttendance);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
