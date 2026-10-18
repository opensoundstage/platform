import {json,sqlConnection,authorize,validateFile,readBody,failure,MAX_FILES,MAX_TOTAL_BYTES} from './_shared.mjs';
export default async (req) => {
 try {
  const sql=sqlConnection();const user=await authorize(req,sql);
  if(!user)return json(401,{error:'Valid user API key required'});
  if(req.method==='GET'){
   const rows=await sql`SELECT filename,octet_length(content) AS bytes,updated_at FROM project_files WHERE user_id=${user} ORDER BY filename`;
   return json(200,{files:rows});
  }
  if(req.method==='PUT'){
   const body=await readBody(req);validateFile(body.filename,body.content);
   const rows=await sql`SELECT filename,octet_length(content) AS bytes FROM project_files WHERE user_id=${user}`;
   const existing=rows.find(r=>r.filename===body.filename);
   if(!existing&&rows.length>=MAX_FILES)return json(413,{error:'64-file limit exceeded'});
   const used=rows.reduce((s,r)=>s+Number(r.bytes),0)-Number(existing?.bytes||0)+Buffer.byteLength(body.content,'utf8');
   if(used>MAX_TOTAL_BYTES)return json(413,{error:'256 KB workspace limit exceeded'});
   await sql`INSERT INTO project_files(user_id,filename,content) VALUES (${user},${body.filename},${body.content}) ON CONFLICT (user_id,filename) DO UPDATE SET content=EXCLUDED.content,updated_at=now()`;
   return json(200,{saved:body.filename});
  }
  return json(405,{error:'Method not allowed'},{Allow:'GET, PUT'});
 } catch(err){return failure(err)}
};
export const config={path:'/api/projects'};
