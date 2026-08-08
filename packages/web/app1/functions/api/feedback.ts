// Cloudflare Pages Function: POST /api/feedback
// Receives the FeedbackModal payload, validates it, then forwards to the generic
// VaayaLabs leads API (schema is fixed — do not change the params).
//
// Env vars (Cloudflare Pages → Settings → Variables):
//   LEADS_API_URL  — leads endpoint (default: https://admin.vaayulabs.com/api/leads)
//   LEADS_API_KEY  — secret token, sent as the `x-api-key` header
//
// Local dev: create `.dev.vars` next to this file with the same two keys, then
// run `npx wrangler pages dev dist` (see .dev.vars.example).
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

    const apiUrl = context.env?.LEADS_API_URL || "https://admin.vaayulabs.com/api/leads";
    const apiKey = context.env?.LEADS_API_KEY || "";

    if (!apiKey) {
      console.error("feedback: LEADS_API_KEY not configured — not forwarding");
      return new Response(JSON.stringify({ ok: false, error: "not_configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Map the modal payload onto the fixed leads schema. `meta` carries the
    // extras so we don't need to touch the top-level params.
    const message = comment
      ? `Rating: ${rating}/5\nPage: ${page}\n\n${comment}`
      : `Rating: ${rating}/5\nPage: ${page}`;

    const payload = {
      name: email,
      phone: "9100000000",
      email,
      service: "BlankPane feedback",
      city: "",
      message,
      source: "blankpane.com" + page,
      meta: {
        rating,
        comment,
        page,
        ua: context.request.headers.get("user-agent") || "",
        ip: context.request.headers.get("cf-connecting-ip") || "",
        ts: new Date().toISOString(),
      },
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("leads API error", res.status, await res.text().catch(() => ""));
      return new Response(JSON.stringify({ ok: false, error: "lead_api_error" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("feedback bad request", err);
    return new Response(JSON.stringify({ ok: false, error: "bad_request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
