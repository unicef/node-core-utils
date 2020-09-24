const assert = require("assert");
const expect = require("chai").expect;
const should = require("chai").should();
const DB = require("../db");
const newModel = require("../db/models/Default.model.js");

describe("DB", () => {
  let db = null;
  const defaultConfig = DB.DEFAULTS;

  beforeEach(async () => {
    db = new DB();
    await db.init();
  });

  afterEach(async () => {
    await db.close();
  });

  it(`it has a default model`, () => {
    const { Default } = db.models;

    expect(typeof Default).to.be.equal("function");
    const record = Default();
    expect(record.test).to.be.equal(true);
  });

  it("adds new models", () => {
    db.addModel("NewModel", newModel);
    const model = db.models["NewModel"];

    expect(typeof model).to.be.equal("function");
    const record = model();
    expect(record.test).to.be.equal(true);
  });
});
