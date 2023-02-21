import ModelService from "../src/services/ModelService";

jest.mock("../src/services/database");

describe("ModelService", () => {
    let modelService: ModelService<any>;

    beforeEach(() => {
        // Create a new instance of ModelService before each test case
        modelService = new ModelService("tableName");
    });

    describe("getAll", () => {
        it("should return an array of records", async () => {
            // Mock the database knex method to return a dummy data
            const mockResult = [
                { id: 1, name: "record 1" },
                { id: 2, name: "record 2" },
            ];
            const mockKnex = { select: jest.fn().mockReturnValue(mockResult) };
            jest.spyOn(modelService.db, "knex", "get").mockReturnValue(mockKnex);

            const result = await modelService.getAll();

            // Check that the mock knex method was called with the correct parameters
            expect(mockKnex.select).toHaveBeenCalledWith("*");
            // Check that the method returns the expected result
            expect(result).toEqual(mockResult);
        });
    });

    describe("getBy", () => {
        it("should return a record when the key/value pair is found", async () => {
            // Mock the database knex method to return a dummy data
            const mockResult = { id: 1, name: "record 1" };
            const mockKnex = { where: jest.fn().mockReturnValue(mockResult) };
            jest.spyOn(modelService.db, "knex", "get").mockReturnValue(mockKnex);

            const result = await modelService.getBy("id", 1);

            // Check that the mock knex method was called with the correct parameters
            expect(mockKnex.where).toHaveBeenCalledWith({ id: 1 });
            // Check that the method returns the expected result
            expect(result).toEqual(mockResult);
        });

        it("should return null when the key/value pair is not found", async () => {
            // Mock the database knex method to return an empty result
            const mockResult = null;
            const mockKnex = { where: jest.fn().mockReturnValue(mockResult) };
            jest.spyOn(modelService.db, "knex", "get").mockReturnValue(mockKnex);

            const result = await modelService.getBy("id", 1);

            // Check that the mock knex method was called with the correct parameters
            expect(mockKnex.where).toHaveBeenCalledWith({ id: 1 });
            // Check that the method returns null
            expect(result).toBeNull();
        });
    });

    describe("create", () => {
        it("should create a record and return the result", async () => {
            // Mock the database knex method to return a dummy data
            const mockResult = [{ id: 1, name: "record 1" }];
            const mockKnex = {
                insert: jest.fn().mockReturnValue({ returning: jest.fn().mockReturnValue(mockResult) }),
            };
            jest.spyOn(modelService.db, "knex", "get").mockReturnValue(mockKnex);

            const result = await modelService.create({ name: "record 1" });

            // Check that the mock knex method was called with the correct parameters
            expect(mockKnex.insert).toHaveBeenCalledWith({ name: "record 1" });
            // Check that the method returns the expected result
            expect(result).toEqual(mockResult[0]);
        });
    });
});
