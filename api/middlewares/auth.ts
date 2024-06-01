import { getUserByUserId } from "../utils/authClient";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

interface UserRequest extends Request {
  user: any;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // TODO: Implement token validation logic here

    const { userId } = verifyToken(token);

    const user = await getUserByUserId(userId, token);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach the user object to the request object
    (req as UserRequest).user = user;

    // If the token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
