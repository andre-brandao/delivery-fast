import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: env.EMAIL_FROM,
		pass: env.EMAIL_PASSWORD
	}
});

interface SendMailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}
export async function sendEmail({ to, subject, text, html }: SendMailOptions) {
	try {
		const info = await transporter.sendMail({
			from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
			to,
			subject,
			text,
			html
			// amp: `<!doctype html>
			// <html ⚡4email>
			//   <head>
			//     <meta charset="utf-8">
			//     <style amp4email-boilerplate>body{visibility:hidden}</style>
			//     <script async src="https://cdn.ampproject.org/v0.js"></script>
			//     <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
			//   </head>
			//   <body>
			//     <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
			//     <p>GIF (requires "amp-anim" script in header):<br/>
			//       <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
			//   </body>
			// </html>`
		});
		console.log('Message sent: %s', info.messageId);
		return info;
	} catch (error) {
		console.error('Error sending email:', error);
	}
}
