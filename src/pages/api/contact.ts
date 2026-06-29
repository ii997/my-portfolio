import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const toEmail = import.meta.env.CONTACT_EMAIL || 'hello@example.com';

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `New message from ${name}`,
      html: [
        '<h2>New Contact Form Submission</h2>',
        '<p><strong>Name:</strong> ' + esc(name) + '</p>',
        '<p><strong>Email:</strong> <a href="mailto:' + esc(email) + '">' + esc(email) + '</a></p>',
        '<p><strong>Message:</strong></p>',
        '<blockquote style="border-left:3px solid #ccc;padding-left:16px;margin:16px 0;color:#555;">',
        esc(message).replace(/\n/g, '<br>'),
        '</blockquote><hr>',
        '<p style="color:#999;font-size:0.85rem;">Sent from your portfolio contact form.</p>',
      ].join(''),
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function esc(s) {
  return String(s).replace(/</g, '&lt;');
}
