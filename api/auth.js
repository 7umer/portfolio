/**
 * Step 1 of the Decap CMS login: bounce the editor to GitHub's consent page.
 *
 * This is a stateless Vercel function — it holds no data and has no database.
 * It exists only because GitHub's OAuth flow requires a server-side secret to
 * exchange the code for a token (see ./callback.js).
 */
module.exports = function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).send(
      "OAUTH_GITHUB_CLIENT_ID is not set. Add it in Vercel → Settings → Environment Variables."
    );
    return;
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", `${proto}://${host}/api/callback`);
  url.searchParams.set("scope", "repo,user");
  // Opaque value echoed back by GitHub; guards against a stray callback.
  url.searchParams.set("state", Math.random().toString(36).slice(2));

  res.redirect(302, url.toString());
}
