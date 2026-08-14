import crypto from 'crypto';

const REQUIRED_FIELDS = ['unionCode', 'customerCountryCode', 'contactName', 'contactPhone', 'sourceType'];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9\s+\-()]{7,20}$/.test(phone);
}

function signRequest(bodyString, appId, appSecret, timestamp) {
  // CRM signing: MD5(bodyString & AppId & AppSecret & timestamp).toUpperCase() then Base64
  const signString = `${bodyString}&${appId}&${appSecret}&${timestamp}`;
  const md5Hex = crypto.createHash('md5').update(signString, 'utf8').digest('hex').toUpperCase();
  return Buffer.from(md5Hex).toString('base64');
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(payload)
  };
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(204, {});
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, message: 'Method not allowed' });
  }

  const appId = process.env.CRM_APP_ID;
  const appSecret = process.env.CRM_APP_SECRET;
  const baseUrl = process.env.CRM_API_BASE_URL;

  if (!appId || !appSecret || !baseUrl) {
    console.error('[leads] Missing CRM environment variables');
    return jsonResponse(500, { ok: false, message: 'Server configuration error' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return jsonResponse(400, { ok: false, message: 'Invalid JSON body' });
  }

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || typeof body[field] !== 'string' || body[field].trim() === '') {
      return jsonResponse(400, { ok: false, message: `Missing required field: ${field}` });
    }
  }

  if (body.contactEmail && !isValidEmail(body.contactEmail)) {
    return jsonResponse(400, { ok: false, message: 'Invalid email address' });
  }

  if (!isValidPhone(body.contactPhone)) {
    return jsonResponse(400, { ok: false, message: 'Invalid phone number' });
  }

  // Build CRM payload (only include supported fields)
  const crmPayload = {
    unionCode: body.unionCode.trim(),
    customerName: (body.customerName || '').trim(),
    customerCountryCode: body.customerCountryCode.trim(),
    contactName: body.contactName.trim(),
    contactPhone: body.contactPhone.trim(),
    contactEmail: (body.contactEmail || '').trim(),
    sourceType: body.sourceType.trim()
  };

  if (body.remark && body.remark.trim()) {
    crmPayload.remark = body.remark.trim();
  }

  const bodyString = JSON.stringify(crmPayload);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = signRequest(bodyString, appId, appSecret, timestamp);

  try {
    const crmResponse = await fetch(`${baseUrl}/open/leads/acquired/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AppId': appId,
        'timestamp': timestamp,
        'Signature': signature
      },
      body: bodyString
    });

    const responseText = await crmResponse.text();
    let crmData;
    try {
      crmData = JSON.parse(responseText);
    } catch {
      crmData = { code: crmResponse.status, msg: responseText };
    }

    if (crmData.code !== 200) {
      console.error('[leads] CRM error', crmData);
      return jsonResponse(502, {
        ok: false,
        message: crmData.msg || 'Unable to submit lead. Please try again later.'
      });
    }

    return jsonResponse(200, { ok: true, data: crmData.data });
  } catch (err) {
    console.error('[leads] Network error', err);
    return jsonResponse(502, { ok: false, message: 'Network error. Please try again later.' });
  }
};
