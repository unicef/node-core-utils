const assert = require("assert");
const expect = require("chai").expect;
const should = require("chai").should();
const Email = require("../email");

describe("Email", () => {
  let email = null;
  const defaultConfig = Email.DEFAULTS;
  const variableName = "Alex";
  const emailTemplate = () => {
    return `<div>
    <p>Hi there! This is the email demo template.</p>  
  </div>`;
  };

  const emailVariableTemplate = (name) => {
    return `<div>
    <p>Hi there ${name}! This is the email demo template.</p>  
  </div>`;
  };

  beforeEach(() => {
    email = new Email();
  });

  it(`has a default template `, () => {
    const { templates } = email;
    expect(typeof templates.DefaultTemplate).to.be.equal("function");
  });

  it("accepts new email templates", () => {
    const template = emailTemplate;
    const templateName = "TestTemplate";

    email.addTemplate(templateName, template);
    const { templates } = email;

    expect(typeof templates[templateName]).to.be.equal("function");

    const emailContent = templates[templateName]();
    const expectedEmailContent = emailTemplate();

    expect(emailContent === expectedEmailContent).to.be.equal(true);
  });

  it("accepts new email templates with variables", () => {
    const template = emailVariableTemplate;
    const templateName = "TestVariableTemplate";

    email.addTemplate(templateName, template);
    const { templates } = email;

    expect(typeof templates[templateName]).to.be.equal("function");

    const emailContent = templates[templateName](variableName);
    const expectedEmailContent = emailVariableTemplate(variableName);

    expect(emailContent === expectedEmailContent).to.be.equal(true);
  });
});
