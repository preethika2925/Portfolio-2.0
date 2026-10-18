import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check honeypot field for bot/spam prevention
    if (body.website_url_hp && body.website_url_hp.length > 0) {
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // Validate using Zod
    const validationResult = contactFormSchema.safeParse({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // Log received inquiry securely
    console.log(`[Contact Inquiry] From: ${name} <${email}> | Subject: ${subject}`);
    console.log(`[Message Body]: ${message}`);

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out, Preethika has received your transmission!',
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Internal processing error. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
