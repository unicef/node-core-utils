const assert = require("assert");
const expect = require("chai").expect;
const should = require("chai").should();
const Logger = require("../logger");

describe("Logger", () => {
  let logger = null;
  let correctName = "correctName";
  let wrongName = "wrongName";
  const defaultConfig = Logger.DEFAULTS;

  beforeEach(() => {
    logger = new Logger(correctName);
  });

  it(`is named ${correctName}`, () => {
    expect(logger.name === correctName).to.be.equal(true);
  });

  it("accepts the name param over the config name", () => {
    logger = new Logger(correctName, { name: wrongName });
    expect(logger.name === correctName).to.be.equal(true);
  });

  it("Uses the config name when no name param is given", () => {
    logger = new Logger(null, { name: correctName });
    expect(logger.name === correctName).to.be.equal(true);
  });
});
