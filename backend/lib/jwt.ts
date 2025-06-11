// lib/jwt.ts
import jwt from 'jsonwebtoken';

// buat konstanta JWT
const JWT_KEY = "BBC";
const JWT_EXPIRED = "30m"

// buat interface
export interface JwtInfo {
    code: string;
}

// buat fungsi sign jwt
export const jwtSign = (info: JwtInfo) => {
    return jwt.sign(info, JWT_KEY!, { expiresIn: JWT_EXPIRED });
}

// buat fungsi verify jwt
export const jwtVerify = (token: string): JwtInfo | null => {
    try {
        return jwt.verify(token, JWT_KEY) as JwtInfo;
    } catch (err) {
        return null;
    }
}
