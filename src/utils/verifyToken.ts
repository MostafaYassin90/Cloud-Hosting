import jwt from "jsonwebtoken";
import { TJwtPayload } from "@/utils/servertypes";

export function verifyUserPayload(token: string): TJwtPayload | null {
  try {
    const secretKey = process.env.SECRET_KEY as string;
    const userPayload = jwt.verify(token, secretKey) as TJwtPayload;
    if (!userPayload) return null;
    return userPayload;
  } catch (error) {
    return null;
  }

}