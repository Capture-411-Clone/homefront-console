import { createTransporter } from 'src/lib/nodemailer';

export async function POST(request: Request) {
  const req = await request.json();
  const { email, subject, fullName, message } = req;

  if (!email || !subject || !fullName || !message) {
    return Response.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const {
      transporter,
      SMTPInfo: { postman },
    } = createTransporter();

    const contactUsTo = process.env.CHRISTY_SUPPORT_ADDRESS;

    if (!contactUsTo) {
      console.error('Front Masters email address is not set');
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const info = await transporter.sendMail({
      from: postman,
      to: contactUsTo,
      subject,
      html: `
      <h2>New Contact Us Message</h2> 

      <p>Subject: <strong>${subject}</strong></p>

      <p>Full Name: <strong>${fullName}</strong></p>
      <p>Email: <strong>${email}</strong></p>

      <hr/>

      <p>User Message: <br/><br/> ${message}</p>
      `,
    });

    console.log('Message sent: %s', info.messageId);
    return Response.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ error: 'Error sending email' }, { status: 500 });
  }
}
