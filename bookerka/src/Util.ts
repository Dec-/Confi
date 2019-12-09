import * as express from "express";
import * as jwt from "jsonwebtoken";

export class Util {
    public static signJwt(username: string, password: string) {
        if (this.username === username && this.password === password) {
            const token: string = jwt.sign({ username },
                this.secret,
                {
                    expiresIn: "12h",
                },
            );
            return token;
        }
        throw new Error("401");
    }

    public static checkToken(req: express.Request) {
        let token: string = req.headers.authorization;

        if (!token) {
            throw new Error("401");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
            const decoded = jwt.verify(token, this.secret);
            return decoded;
        }
    }
    private static username: string = "admin";
    private static password: string = "admin123";
    private static secret: string = "confiappmegacoolsecret";
}

export default Util;
