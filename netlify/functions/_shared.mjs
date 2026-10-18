import { createHash } from 'node:crypto';
import { neon } from '@neondatabase/serverless';
export const MAX_FILE_BYTES = 16384;
export const MAX_FILES = 64;
export const MAX_TOTAL_BYTES = 262144;
const namePattern = /^[\p{L}\p{N} _.'()\-]+\.(build|grain)$/u;
export function json(status, data, extra={}) { return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}}); }
export function sqlConnection() { if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL not configured'); return neon(process.env.DATABASE_URL); }
export async function authorize(req, sql) {
  const header=req.headers.get('authorization')||'';
  const match=/^Bearer (oss_[a-zA-Z0-9_-]{32,128})$/.exec(header);
  if(!match) return null;
  const hash=createHash('sha256').update(match[1]).digest('hex');
  const rows=await sql`SELECT user_id FROM api_keys WHERE key_hash=${hash} AND revoked_at IS NULL LIMIT 1`;
  return rows[0]?.user_id || null;
}
export function validateFile(name, content) {
  if(typeof name!=='string'||name.length>86||!namePattern.test(name)||name.includes('..')) throw new Error('Invalid filename');
  if(typeof content!=='string'||Buffer.byteLength(content,'utf8')>MAX_FILE_BYTES) throw new Error('File exceeds 16 KB');
  if(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(content)) throw new Error('Invalid control character');
  const lines=content.replace(/\r\n?/g,'\n').split('\n');
  if(lines.length>300||lines.some(l=>l.length>1024)) throw new Error('Line limit exceeded');
  const quotes=(line)=>{let inQuote=false;for(const c of line){if(c==='"')inQuote=!inQuote;}return !inQuote;};
  if(lines.some(l=>!quotes(l))) throw new Error('Unclosed quote');
  // Server validates size and structure; local interpreter performs full semantic validation.
}
export async function readBody(req){ const size=Number(req.headers.get('content-length')||0);if(size>MAX_FILE_BYTES*2)throw new Error('Request too large');const raw=await req.text();if(Buffer.byteLength(raw,'utf8')>MAX_FILE_BYTES*2)throw new Error('Request too large');return JSON.parse(raw); }
export function failure(err){ if(err instanceof SyntaxError)return json(400,{error:'Invalid JSON'});if(/Invalid|exceed|large|Unclosed/.test(err.message))return json(400,{error:err.message});console.error(err);return json(500,{error:'Server error'}); }
