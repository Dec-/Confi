import * as bodyParser from "body-parser";
import * as express from "express";
import * as nodemailer from "nodemailer";

import { check, validationResult } from "express-validator";

const app = express();
app.use(bodyParser.json());

const port: number = 3001;

const config = {
    mailserver: {
        auth: {
            pass: "****",
            user: "my.confi.app@gmail.com",
        },
        host: "smtp.googlemail.com",
        port: 465,
        secure: true,
    }
};

const transporter = nodemailer.createTransport(config.mailserver);

app.post("/api/mail/send", [
    check("email").isEmail(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const confCode = await sendMail(req.body.email);
        res.json(confCode);
    } catch (error) {
        console.error(error);
        res.status(500).send("Whoops, something went wrong...Unexpected Error");
    }
});

app.listen(port, () => {
    console.log(`Mailerka app listening on port ${port}`);
});

const sendMail = async (email) => {
    const confCode: number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const mailTmpl = {
        from: "info@confi.io",
        subject: "Confirmation mail 4 conf",
        text: `Your Confirmation code is: ${confCode}`,
        to: email,
    };
    const info = await transporter.sendMail(mailTmpl);
    console.log(`Preview: ${JSON.stringify(info)}`);

    return confCode;
};

module.exports = app;
