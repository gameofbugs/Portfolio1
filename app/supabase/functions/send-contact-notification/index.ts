// Supabase Edge Function: send-contact-notification
// Sends an email notification when a new contact message is submitted.
// Deploy: supabase functions deploy send-contact-notification --no-verify-jwt
// Requires secrets: RESEND_API_KEY, ADMIN_EMAIL

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  try {
    const { name, email, subject, message }: ContactPayload = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Send email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@example.com";

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not configured — skipping email");
      return new Response(JSON.stringify({ ok: true, note: "email skipped — no RESEND_API_KEY" }));
    }

    const emailContent = `
New Contact Message from Portfolio
──────────────────────────────────
Name:    ${name}
Email:   ${email}
Subject: ${subject || "(no subject)"}
Message: ${message}
    `.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Portfolio Message from ${name}${subject ? ` — ${subject}` : ""}`,
        text: emailContent,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Resend API error:", errBody);
      return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }

    // Log email to Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("email_logs").insert({
      recipient: adminEmail,
      status: "sent",
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
