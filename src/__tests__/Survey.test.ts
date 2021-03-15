import { response } from "express";
import request from "supertest";
import { isExportDeclaration } from "typescript";
import { app } from "../app";

import createConnection from "../database";

describe("Survey", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
        await connection.query("DELETE FROM surveys");
    });

    it("Should be able to create a survey", async () => {
        const response = await request(app).post("/surveys")
        .send({
            title: "example",
            description: "example description"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        const response = await request(app).get("/surveys");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    })
})