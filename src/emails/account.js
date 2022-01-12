const sendGridAPIKey = "--key--";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(sendGridAPIKey);

sgMail.send({
  to: "",
  from: "",
  subject: "",
  text: "",
  html: "", // optional for making mail more fancy.
});
