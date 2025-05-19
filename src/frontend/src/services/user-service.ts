// serviceas/userService.ts
import { jwtDecode } from "jwt-decode"; 
import { UserDto } from "../models/user/UserDTO"; 

export const getUserFromToken = (): UserDto | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token) as UserDto;
  return decoded;
};
