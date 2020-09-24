const Logger = require("../logger");
const Transports = require("./transports");
const Templates = require("./templates");

class Email {
  constructor(config) {
    this.config = { ...Email.DEFAULTS, ...config };
    this.logger = new Logger("Email");
    this.logger.info(`Starting...`);
    this.nodemailer = this.init();
    this.templates = Templates;
  }
  init() {
    this.transport = new Transports(this.config);
  }
  async sendEmail({ from, to, subject, html }) {
    this.logger.info(
      `Sending email from: ${from} to: ${to} subject: ${subject}`
    );
    this.logger.debug(html);

    let email;
    try {
      email = await this.transport.sendMail({ from, to, subject, html });
    } catch (e) {
      this.logger.error(e);
    }
  }
  static get DEFAULTS() {
    return {
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
  }
}

module.exports = Email;
