const crypto = require('crypto');

// Service Account Firebase oxanneapp (Base64)
const SA_B64 = "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAib3hhbm5lYXBwIiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiMTk0ZDc4ZGIwMmU1Y2VjMGQ3ZDAwZDllYTQzZDhkMmU2ZTk0NDU5MSIsCiAgInByaXZhdGVfa2V5IjogIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuTUlJRXZnSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS2d3Z2dTa0FnRUFBb0lCQVFDNGQvZjd6Tk83N0NBQlxuQVJ0ei96VGh4MFRFUitDd1dOaUhnQ3VxNjRtcUdaSHBiSnVrZVJFRGYyMnlvdkJvY0hxSzd5SmU4ekJzdi9JalxubVdybFdSZVkzWU9LK2ZSVnd3TUhsRzJZVzhiQS94YXBlWVBzTHhXMlJFV1NBWHJBdjdacDV5WjhBLzZKUmIzV1xudHdZT1RiVm5zc3FtbUJBTUV1VWg2NTFKWDk1TmhUT3lwUG9DYVlSbFB5UG1UOTRKWTJDTUVLaEpwNVpFQWwxeVxuSys1S29YaFVqM1ZYdXI5MHZ5R1FydDhzT3FqL2gyWkxDVk9pcTAycDNDb0JkNVdOY24vR0F5K0hEbHBOR3JUV1xuUFFmWGxSVm5Gc2F5cUVIR2pCL0FRZW4yN0Y3L1E4UU5lMGtGSFhtZnc3QWNXY3RiaEZ2cmExbm85ZFJMWHJzVFxuK2JhbG5EZDlBZ01CQUFFQ2dnRUFIa2licm52TzJ0QUY1UVJRaEhlR0wvYXR4R2RrYks3NVJTMTJmY1hUUU5pWFxueXJGb3o5U01SWDI2L1pPZ1VoVDlHU2Z2QlpWNUFyRjBTQUhjdWJBcG5vL25FMzY3YlFUcHoybS9vRDZZMzRCQlxuTVN0Z3kvcGkzeHhRSzRzUW91b1dRVWFRVzlXd0NNc3BRa0dqdmQ5bUE1TW5qN2Z4RW5wYm9Yanp4bUwxdE5YOFxuYUVLRi9yUlBZeGt0eHNoSXRsN2RCN2JNbExZMjFUdis2MTBRbTFqaUtTdXYxd0RzUDBsL2w3d01pTTRmSlNvS1xuSFBBSUFrbDVuS3QyMm1wVnZsd2xjc24vNmxNYlhlRmVZSmszd0Mram1WdFJmR0lueWxFdGVPOWFYaC8yNExyWFxuKzZldHdnd1FMcENqRUNQUlFKRjhxZmZJVlpQVTJmS3RMVUZjSWtWWHBRS0JnUUQxY0tHSlJhYUtiYVdCcDdxYlxudms0M1o3ZmIwbE5VQnRMRTlSU2oxZitQdmoyM1NtSGxmOWFlZW5WbDAxMUViYnlFTUhtOHB3U0xNeVlXdUgyTVxuQUUwYkpaVTVGRDE4OWdWNDhITXNHN2JPR21XMVpFUnllbVV1SDBBYk42UG9ZZGJ5K2RpUnBKZ0hwWEtwYUFBTVxuS3VLVWxWZjBRRWI5a3l1ZHE5QUFhRENVMHdLQmdRREFaOGEyUWhLRWlLN0VEb1NGSFhyR2hwaXowOEFDU3pSbFxuL1RqamcwY2xZVERiMllGcURHQU9YeDA1WGxKanFKVXlnUndZUmEvWjhlbzRLeTZlUzR4dEFQT0dqNjF4VU1pb1xublFNZlRKODBwU2pzQVJkeldKamY3R29kQ3IvMDkvRzJsUU1HVlFoeklQWmJJWXRUQTF1dENITHlYa1pybXFLS1xuRTJ0cjlyZVFid0tCZ0hsMnFPcVhSb2tCSkVRYTdyVytvMVMyQm41S0F5VDFUMzliVGtDYVdpUVg0TkVCaFpzZVxuL2VabDhnMVhZYlBJbnQvSVlhYWovUktxV0hJc0VTMmt4SVBud0lhRDVyNGR2cTJRU1Y4TnhCVVJhVDR3aGRNbFxua1VjVy9oRzZJbXFSYU4vTUY0cFVLMHkxYXg0OU1yRFMxRmoxNDVZajdUMzJoRUkrVWV5eG8wRXpBb0dCQUl0elxucSthMWhNNWljcWpQRE9XZU5EcG5tNDNhejdQWjVpUjFvQ0htS0U3RFhySTV0ejZ4c1gwNUd1bFZuOGx6aW8rTVxuWEZ5TFJhVmxYU2xRd3YwZ0xLdGtvUnpLVGg5dk9jQmI3TU5tdVkxaWw0SldXRFRWNWhlR05uTE9NOHJOV25mSFxuRU9ZcUEzSE9Wa0ErMDhoYkNyc2pBSTBDSDNBbUorQ0RxcndabVhvcEFvR0JBTS9OY0tNdkpCQmtldVJtTjZMNlxuYUc1QVJKUHVwNkpxS0kzODFjLzNGWVh5ZkFMenR6aXBscXpjVjB2eHN5YTdJS1AwRWYwempkTmlSWkpPcmcyQVxuK0JVam9MUHFyMmNRTFR3ZEgxQjYyN3pZWCtGNjFpV25DSnRhaG9tb1prcjJzWmtGS2x4U0NjdGZyaDhqbEQzQlxuUXkwdnNYZ1hLUzBrMFlYQTBCTFloWGVQXG4tLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4iLAogICJjbGllbnRfZW1haWwiOiAiZmlyZWJhc2UtYWRtaW5zZGstZmJzdmNAb3hhbm5lYXBwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjEwNjUwOTc3OTE5NjgzNDkzMDg1NCIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwKICAiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS9jZXJ0cyIsCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvZmlyZWJhc2UtYWRtaW5zZGstZmJzdmMlNDBveGFubmVhcHAuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLAogICJ1bml2ZXJzZV9kb21haW4iOiAiZ29vZ2xlYXBpcy5jb20iCn0K";
const SERVICE_ACCOUNT = JSON.parse(Buffer.from(SA_B64, 'base64').toString('utf8'));

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && now < tokenExpiresAt - 60) {
    return cachedToken;
  }

  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: SERVICE_ACCOUNT.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsignedToken = `${b64url(header)}.${b64url(claim)}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(SERVICE_ACCOUNT.private_key, 'base64url');
  const jwt = `${unsignedToken}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error('OAuth error: ' + JSON.stringify(data));
  }

  cachedToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in || 3600);
  return cachedToken;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, tokens, title, body, data } = req.body || {};
    const targetTokens = tokens && Array.isArray(tokens) ? tokens : (token ? [token] : []);

    if (targetTokens.length === 0) {
      return res.status(400).json({ error: 'No FCM token provided' });
    }

    const accessToken = await getAccessToken();
    const projectId = SERVICE_ACCOUNT.project_id;
    const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

    const results = [];

    for (const t of targetTokens) {
      if (!t || typeof t !== 'string' || t.length < 10) continue;

      const messagePayload = {
        message: {
          token: t,
          notification: {
            title: title || 'Oxanne',
            body: body || ''
          },
          android: {
            priority: 'HIGH',
            notification: {
              channel_id: 'oxanne_alerts_channel',
              sound: 'default'
            }
          },
          data: data ? Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) : {}
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messagePayload)
      });

      const respData = await response.json();
      results.push({ token: t.substring(0, 15) + '...', success: response.ok, response: respData });
    }

    return res.status(200).json({
      success: true,
      sent_count: results.filter(r => r.success).length,
      details: results
    });
  } catch (error) {
    console.error('Error sending push:', error);
    return res.status(500).json({ error: error.message });
  }
};
