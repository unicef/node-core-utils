const mongoose = require("mongoose");
const Logger = require("../logger");
const models = require("./models");

class MongoDB {
  constructor(config) {
    this.config = config || {
      url: process.env.DB_URL || "mongodb://localhost",
      database: process.env.DB_NAME || "juniper",
      mongooseCfg: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    };
    this.models = models;
    this.logger = new Logger("MongoDB");
    this.connectionString = `${this.config.url}/${this.config.database}`;

    this.logger.info(`Starting...`);
  }

  async init() {
    this.logger.info("Initializing:");
    this.logger.debug(this.config);
    try {
      this.mongoose = await mongoose.connect(
        this.connectionString,
        this.config.mongooseCfg
      );
    } catch (e) {
      return this.logger.error(e);
    }

    this.logger.info(`Connected: ${this.connectionString}`);
    this.logger.info("Initialized");
  }

  addModel(name, Model) {
    this.models[name] = Model;
  }

  async close() {
    try {
      await this.mongoose.connection.close();
    } catch (e) {
      return this.logger.error(e);
    }
  }

  static get DEFAULTS() {
    return {
      url: process.env.DB_URL || "mongodb://localhost",
      database: process.env.DB_NAME || "default",
      mongooseCfg: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: true,
      },
    };
  }
}

module.exports = MongoDB;
