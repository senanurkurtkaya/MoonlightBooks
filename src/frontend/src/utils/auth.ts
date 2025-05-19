import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  email?: string;
  role?: string;
  fullName:string;
  [key: string]: any; // esnek yapı
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: TokenPayload = jwtDecode(token);

    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const fullName = decoded["fullName"] || decoded["name"];

    return {
      email,
      role,
      fullName,
      exp:decoded.exp
    };
  } catch (error) {
    console.error("JWT çözümleme hatası:", error);
    return null;
  }
}
