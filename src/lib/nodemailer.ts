import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import nodemailer from 'nodemailer';

interface CreateTransporterReturn {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  SMTPInfo: {
    host: string;
    port: number;
    user: string;
    pass: string;
    postman: string;
    secure: boolean;
  };
}

export function createTransporter(): CreateTransporterReturn {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE;
  const postman = process.env.POSTMAN_FROM;

  // log each one not set
  if (!host) {
    console.log('host not set');
  }
  if (!port) {
    console.log('port not set');
  }
  if (!user) {
    console.log('user not set');
  }
  if (!pass) {
    console.log('pass not set');
  }
  if (!secure) {
    console.log('secure not set');
  }
  if (!postman) {
    console.log('postman not set');
  }

  if (!host || !port || !user || !pass || !secure || !postman) {
    throw new Error('SMTP environment variables are not set');
  }

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: secure === 'true',
    auth: {
      user,
      pass,
    },
  });

  return {
    transporter,
    SMTPInfo: {
      host,
      port: parseInt(port, 10),
      user,
      pass,
      secure: secure === 'true',
      postman,
    },
  };
}
