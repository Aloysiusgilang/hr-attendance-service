import { desc, eq } from "drizzle-orm";
import db from "../db";
import { attendance } from "../schema";

export const getAllAttendanceByEmployeeId = async (employeeId: string) => {
  const result = await db.query.attendance.findMany({
    where: eq(attendance.employee_id, employeeId),
    with: {
      employee: true,
    },
  });
  return result;
};

export const getAttendanceById = async (attendanceId: string) => {
  const result = await db.query.attendance.findFirst({
    where: eq(attendance.id, attendanceId),
    with: {
      employee: true,
    },
  });

  return result;
};

export const getAllAttendances = async () => {
  // const attendances = await db
  //   .select()
  //   .from(attendance)
  //   .orderBy(desc(attendance.date));
  const attendances = await db.query.attendance.findMany({
    with: {
      employee: true,
    },
  });

  return attendances;
};

export const createAttendance = async (attendanceData: any, url: any) => {
  const [result] = await db
    .insert(attendance)
    .values({ ...attendanceData, photo_url: url })
    .returning();

  console.log(result);

  return result;
};
