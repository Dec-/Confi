import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as mocha from "mocha";

import * as app from "../src/App";
import Dao from "../src/Dao";

chai.use(chaiHttp);
const expect = chai.expect;

let jwt: string;

before(async () => {
    await Dao.truncateTables();
    const res = await chai.request(app).post("/api/login").send({username: "admin", password: "admin123"});
    jwt = res.body.jwt;
});

describe("GET api/conferences", () => {
    it("should be status code 200", async () => {
        const res = await chai.request(app).get("/api/conferences").send();
        expect(res).to.have.status(200);
    });

    it("should be length 3", async () => {
        const res = await chai.request(app).get("/api/conferences").send();
        expect(res.body).to.have.lengthOf(3);
    });
});

describe("POST api/conferences/1/book", () => {
    it("should be status code 201", async () => {
        const res = await chai.request(app).post("/api/conferences/1/book").
            send({ firstname: "Jon", lastname: "Doe", email: "jon.doe@gmail.com", phoneNumber: "+23 234 2434" });
        expect(res).to.have.status(201);
    });

    it("should be status code 422", async () => {
        const res = await chai.request(app).post("/api/conferences/1/book").
            send({ firstname: "Jon", lastname: "Doe", email: "jon.doegmail.com", phoneNumber: "+23 234 2434" });
        expect(res).to.have.status(422);
    });
});

describe("GET api/bookings", () => {
    it("should be status code 401", async () => {
        const res = await chai.request(app).get("/api/bookings").send();
        expect(res).to.have.status(401);
    });

    it("should be status code 200", async () => {
        const res = await chai.request(app).get("/api/bookings")
        .set("Authorization", "Bearer " + jwt)
        .send();
        expect(res).to.have.status(200);
    });
});

describe("DELETE api/bookings/1", () => {
    it("should be status code 401", async () => {
        const res = await chai.request(app).delete("/api/bookings/1").send();
        expect(res).to.have.status(401);
    });

    it("should be status code 204", async () => {
        const res = await chai.request(app).delete("/api/bookings/1")
        .set("Authorization", "Bearer " + jwt)
        .send();
        expect(res).to.have.status(204);
    });
});
