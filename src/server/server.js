// const bodyParser = require("body-parser")
// const express = require("express")
// const nodemailer = require("nodemailer")
// // require("dotenv").config()
// const server = express()
// const PORT = process.env.PORT || 5000

// const cors = require("cors")

// const path = require("path")
// const publicPath = path.join(__dirname, "../..", "public")

// server.use(express.static(publicPath))
// server.use(express.json())

// server.use(function (req, res, next) {
//   // res.set("Access-Control-Allow-Origin", "*")
//   // res.set("Access-Control-Allow-Credentials", "true")
//   res.header("Access-Control-Allow-Origin", "*")
//   // res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   )
//   res.header("Access-Control-Allow-Methods", "*")

//   next()
// })

// server.options("*", (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*")
//   res.set("Access-Control-Allow-Headers", "Content-Type")
//   res.send("ok")
// })

// server.get("/", (req, res) => {
//   res.send("Hello, Mr. AK!")
// })

// // server.use(bodyParser.urlencoded({ extended: false }));
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

// let transporter = nodemailer.createTransport(
//   {
//     pool: true,
//     service: "Gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       refreshToken: process.env.EMAIL_REFRESH_TOKEN,
//       clientId: process.env.EMAIL_CLIENT_ID,
//       clientSecret: process.env.EMAIL_CLIENT_SECRET,
//     },
//   },
//   {
//     from: `Mailer <${process.env.EMAIL}>`,
//   }
// )

// transporter.verify((error, success) => {
//   if (error) return console.log(error)
//   console.log("Server is ready to take our messages: ", success)
//   transporter.on("token", token => {
//     console.log("A new access token was generated")
//     console.log("User: %s", token.user)
//     console.log("Access Token: %s", token.accessToken)
//     console.log("Expires: %s", new Date(token.expires))
//   })
// })

// server.post("/subscribe", urlencodedParser, function (req, res) {
//   const msgAbtSubscr = `<p> You have a ney subscriber! 🙂 <br/><br/>
// Email: ${req.body.email}
// </p>`

//   // const msgToClient = `<p style='font-weight:bold;'> Thank U! Table reservation was successful! 🙂 <br/>
//   // People: ${req.body.peopleCount}<br/>
//   // Date: ${req.body.date}<br/>
//   // Time: ${req.body.time}<br/>
//   // Name: ${req.body.name}<br/>
//   // Phone: ${req.body.phone}<br/>
//   // Email: ${req.body.email}</p>`;

//   if (!req.body) return res.sendStatus(400)
//   console.log(req.body)

//   // // email to Client of Restourant
//   // transporter.sendMail(
//   //   {
//   //     // from: process.env.GMAIL_ADDRESS,
//   //     to: req.body.email,
//   //     subject: "Table reservation",
//   //     html: msgToClient,
//   //   },
//   //   function (err, info) {
//   //     if (err) return res.status(500).send(err);
//   //     // res.json({ success: true });
//   //   }
//   // );
//   // email to Admin of Restourant
//   transporter.sendMail(
//     {
//       // from: process.env.GMAIL_ADDRESS,
//       to: "anker2702@gmail.com", // emailOfRestourantsAdmin
//       subject: "New subscriber",
//       html: msgAbtSubscr,
//     },
//     function (err, info) {
//       if (err) return res.status(500).send(err)
//       // res.json({ success: true });
//       res
//         .status(200)
//         .set("Access-Control-Allow-Origin", "*")
//         .set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
//         .set("Access-Control-Allow-Headers", "Content-Type")
//         .send(
//           JSON.stringify({
//             message: "This is public info",
//           })
//         )

//       // .set('Access-Control-Allow-Origin', '*')
//       // .send("OK!");
//       // .redirect("https://suliko.vercel.app");

//       // .redirect("http://localhost:3000");
//     }
//   )
// })

// server.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`)
// })
