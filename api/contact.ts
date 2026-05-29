import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, subject, message } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "developerhub.dev@gmail.com",
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>Novo contato</h2>

        <p>
          <strong>Nome:</strong>
          ${firstName} ${lastName}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Mensagem:</strong>
        </p>

        <p>${message}</p>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ success: false }, { status: 500 });
  }
}
