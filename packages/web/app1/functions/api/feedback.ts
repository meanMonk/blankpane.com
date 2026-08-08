// Cloudflare Pages Function: POST /api/feedback
// Receives the FeedbackModal payload, validates it, then forwards to a webhook
// (e.g. a Discord/Telegram/ntfy channel or a form backend) if FEEDBACK_WEBHOOK_URL
// is configured. Without a webhook it still returns success so the site works
// out of the box; set the env var in Cloudflare Pages → Settings → Variables.
//
// Env vars (optional):
//   FEEDBACK_WEBHOOK_URL   — URL to POST the JSON payload to (Discord/Telegram/ntfy/…)
//   FEEDBACK_WEBHOOK_TOKEN — optional secret, sent as Authorization: Bearer <token>
export async function onRequestPost(context: {
  request: Request;
  env: Record<string, string | undefined>;
}) {
  try {
    const body = await context.request.json();
    const rating = Number(body?.rating) || 0;
    const comment = String(body?.comment || "").trim().slice(0, 5000);
    const email = String(body?.email || "").trim().slice(0, 320);
    const page = String(body?.page || "").trim().slice(0, 500);

    if (comment.length < 1 && !(rating >= 1 && rating <= 5)) {
      return new Response(JSON.stringify({ ok: false, error: "empty_feedback" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const webhook = context.env?.FEEDBACK_WEBHOOK_URL;
    const token = context.env?.FEEDBACK_WEBHOOK_TOKEN;
    const payload = {
      ts: new Date().toISOString(),
      rating,
      comment,
      email,
      page,
      ua: context.request.headers.get("user-agent") || "",
      ip: context.request.headers.get("cf-connecting-ip") || "",
    };

    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("feedback webhook failed", err);
      }
    } else {
      console.log("feedback (no webhook configured):", JSON.stringify(payload));
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "bad_request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
