// TEMPORARY: Remove this file when permanent backend is ready
// This is a temporary email notification system for waitlist registrations

import { NextRequest, NextResponse } from 'next/server';

interface WaitlistData {
  name: string;
  email: string;
  role: string;
  reason: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: WaitlistData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.role || !data.reason) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TEMPORARY: Send email notification
    await sendWaitlistNotification(data);

    return NextResponse.json(
      { message: 'Successfully added to waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// TEMPORARY: Email notification function using Resend
async function sendWaitlistNotification(data: WaitlistData) {
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'ndh8392@gmail.com';
  const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@showon.ai';
  
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">New Waitlist Registration - ShowOnAI</h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>User Information:</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Reason for joining:</strong> ${data.reason}</p>
      </div>
      
      <p style="color: #6b7280; font-size: 14px;">
        Submitted at: ${new Date().toLocaleString()}
      </p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px;">
        This is a temporary notification system. Remove when permanent backend is ready.
      </p>
    </div>
  `;

  try {
    // TEMPORARY: Send email using Resend if API key is available
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      console.log('🔄 Attempting to send email with Resend...');
      console.log(`📧 From: ${FROM_EMAIL}`);
      console.log(`📧 To: ${NOTIFICATION_EMAIL}`);
      
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `New Waitlist Registration - ${data.name}`,
        html: emailHtml,
      });
      
      console.log('✅ Resend API response:', result);
      console.log(`✅ Waitlist notification sent to ${NOTIFICATION_EMAIL}`);
    } else {
      // Fallback to console logging if no API key
      console.log('=== WAITLIST NOTIFICATION (No API Key) ===');
      console.log(`To: ${NOTIFICATION_EMAIL}`);
      console.log(`Subject: New Waitlist Registration - ${data.name}`);
      console.log('Data:', data);
      console.log('==========================================');
    }
  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    // Don't throw error - we don't want to fail the API call if email fails
  }
}
