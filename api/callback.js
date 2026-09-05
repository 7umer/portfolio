/**
 * Step 2 of the Decap CMS login: swap GitHub's temporary code for an access
 * token, then hand it to the admin window that opened this popup.
 *
 * The client secret is only ever read here, server-side, from an environment
 * variable — it is never sent to the browser.
 */
module.exports = async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const { code } = req.query;

  if (!clientId || !clientSecret) {
    res.status(500).send("GitHub OAuth environment variables are not set.");
    return;
  }

  if (!code) {
    res.status(400).send("Missing ?code from GitHub.");
    return;
  }

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const data = await response.json();

    const message = data.access_token
      ? { token: data.access_token, provider: "github" }
      : { error: data.error_description || "Authentication failed" };

    const status = data.access_token ? "success" : "error";

    // Decap listens for this postMessage on the window that opened the popup.
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`<!DOCTYPE html>
<html><body>
<p>Completing sign-in…</p>
<script>
  (function () {
    var payload = 'authorization:github:${status}:' + ${JSON.stringify(
      JSON.stringify(message)
    )};

    function send(e) {
      if (!window.opener) return;
      window.opener.postMessage(payload, e.origin);
    }

    window.addEventListener('message', send, false);
    if (window.opener) {
      window.opener.postMessage('authorizing:github', '*');
    }
  })();
</script>
</body></html>`);
  } catch (error) {
    res.status(500).send("Could not reach GitHub to complete sign-in.");
  }
}
