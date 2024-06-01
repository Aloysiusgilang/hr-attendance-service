import { Request, Response } from "express";
import {
  getAllAttendanceByEmployeeId,
  getAttendanceById,
  getAllAttendances,
  createAttendance,
} from "../services/attendance";
import gcs from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

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
    const file = req.file;

    if (!file) {
      throw new Error("File is required");
    }

    // change to Date object if its not a Date object yet
    if (!(body.date instanceof Date)) {
      body.date = new Date(body.date);
      body.timestamp = new Date(body.timestamp);
    }

    // upload file to GCS
    const bucket = gcs;
    const fileData = file;
    const fileName = uuidv4();
    const publicUrl = `https://storage.googleapis.com/hr-webapp/${fileName}`;

    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.log(err);
    });

    blobStream.on("finish", () => {
      console.log("finish upload");
    });

    blobStream.end(fileData.buffer);

    const newAttendance = await createAttendance(body, publicUrl);
    res.status(200).json(newAttendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
