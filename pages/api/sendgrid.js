/*
This is a simple contact form for SupaNexTail
Using Sendgrid. 
*/
const sgMail = require("@sendgrid/mail");

export default async function handler(req, res) {
  if (req.method === "POST") {
    sgMail.setApiKey(process.env.SENDGRID_SECRET);
    const msg = {
      to: process.env.SENDGRID_MAILTO, // Change to your recipient
      from: process.env.SENDGRID_MAILFROM, // Change to your verified sender
      subject: `[${process.env.NEXT_PUBLIC_TITLE}] New message from ${req.body.name}`,
      text: req.body.message,
      reply_to: req.body.email,
    };
    sgMail
      .send(msg)
      .then(() => {
        res
          .status(200)
          .send({ message: "Your email has been sent", success: true });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was an issue with your email... please retry",
          err: err,
        });
      });
  }
}
