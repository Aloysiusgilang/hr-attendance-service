import { Router } from "express";
import {
  handleCreateAttendance,
  handleGetAllAttendanceByEmployeeId,
  handleGetAttendanceById,
  handleGetallAttendances,
} from "./controllers/attendance";
import { authenticate } from "./middlewares/auth";
import { file } from "./middlewares/upload";

function createRouter(callback: (router: Router) => void) {
  const router = Router();
  callback(router);
  return router;
}

export default createRouter((router: Router) => {
  router.get("/attendance", handleGetallAttendances);
  router.get("/attendance/:id", authenticate, handleGetAttendanceById);
  router.get("/employee/:id", authenticate, handleGetAllAttendanceByEmployeeId);
  router.post("/attendance", file, authenticate, handleCreateAttendance);
});
