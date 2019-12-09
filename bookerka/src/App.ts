import * as bodyParser from "body-parser";
import * as express from "express";
import { check, validationResult } from "express-validator";
import Dao from "./Dao";
import User from "./Modal/User";
import Util from "./Util";

const app = express();
const router = express.Router();
const port: number = 3000;

app.use(bodyParser.json());
app.use("/api", router);

function checkJwt(req: express.Request, res: express.Response, next) {
    try {
        Util.checkToken(req);
        next();
    } catch (error) {
        if (error.message === "401") {
            return res.status(401).send("Login failed wrong user credentials");
        } else {
            res.status(500).send("Whoops, something went wrong...Unexpected Error");
        }

        console.log(error);
    }
}

router.get("/conferences", async (req: express.Request, res: express.Response) => {
    try {
        const conferences = await Dao.getConferenes();
        res.json(conferences);
    } catch (error) {
        console.error(error);
        res.status(500).send("Whoops, something went wrong...Unexpected Error");
    }
});

router.post("/conferences/:id/book", [
    check("id").isNumeric(),
    check("firstname").isAlpha(),
    check("lastname").isAlpha(),
    check("email").isEmail(),
    check("phoneNumber").isString(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        await Dao.insertIntoBookings(new User(req.body.firstname, req.body.lastname,
            req.body.email, req.body.phoneNumber), Number(req.params.id));
        res.status(201).json();
    } catch (error) {
        console.error(error);
        res.status(500).send("Whoops, something went wrong...Unexpected Error");
    }
});

router.get("/bookings", checkJwt, async (req: express.Request, res: express.Response) => {
    try {
        const bookings = await Dao.getBookings();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).send("Whoops, something went wrong...Unexpected Error");
    }
});

router.delete("/bookings/:id", [
    check("id").isNumeric(),
    checkJwt,
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        Dao.deleteBooking(Number(req.params.id));
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).send("Whoops, something went wrong...Unexpected Error");
    }
});

router.post("/login", [
    check("username").isString(),
    check("password").isString(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const jwt = await Util.signJwt(req.body.username, req.body.password);
        res.status(201).json({jwt});
    } catch (error) {
        if (error.message === "401") {
            res.status(401).send("Login failed wrong user credentials");
        } else {
            res.status(500).send("Whoops, something went wrong...Unexpected Error");
        }

        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Bookerka app listening on port ${port}`);
});

module.exports = app;
