import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as mocha from "mocha";

import * as app from "../src/App";

chai.use(chaiHttp);
const expect = chai.expect;

describe("POST api/mail/send", () => {
    it("should be status code 200", async () => {
        const res = await chai.request(app).post("/api/mail/send").send({ email: "filipkaic@gmail.com" });
        expect(res).to.have.status(200);
    });
});
