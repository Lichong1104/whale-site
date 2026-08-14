/**
 * Local test for the Netlify leads function.
 *
 * Usage:
 *   node scripts/test-leads-function.mjs
 *
 * Make sure .env is populated with CRM_APP_ID, CRM_APP_SECRET, CRM_API_BASE_URL.
 */
import { config } from 'dotenv';
config();

import { handler } from '../netlify/functions/leads.js';

const payload = {
  unionCode: `WHL-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  customerName: 'Whale帷幄测试',
  customerCountryCode: '4744',
  contactName: '张三测试',
  contactPhone: '18812345678',
  contactEmail: 'test@example.com',
  sourceType: '官网立即咨询留资',
  remark: '测试备注'
};

const result = await handler({
  httpMethod: 'POST',
  body: JSON.stringify(payload)
});

console.log('statusCode:', result.statusCode);
console.log('body:', result.body);
