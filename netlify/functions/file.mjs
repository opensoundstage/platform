import {json,sqlConnection,authorize,failure} from './_shared.mjs';
export default async (req,context)=>{
 try {
  const sql=sqlConnection();const user=await authorize(req,sql);if(!user)return json(401,{error:'Valid user API key required'});
  const name=new URL(req.url).searchParams.get('name');if(!name||name.length>86)return json(400,{error:'Invalid filename'});
  if(req.method==='GET'){
   const rows=await sql`SELECT filename,content,updated_at FROM project_files WHERE user_id=${user} AND filename=${name} LIMIT 1`;
   return rows.length?json(200,{file:rows[0]}):json(404,{error:'Not found'});
  }
  if(req.method==='DELETE'){
   const rows=await sql`DELETE FROM project_files WHERE user_id=${user} AND filename=${name} RETURNING filename`;
   return json(rows.length?200:404,rows.length?{deleted:name}:{error:'Not found'});
  }
  return json(405,{error:'Method not allowed'},{Allow:'GET, DELETE'});
 }catch(err){return failure(err)}
};
export const config={path:'/api/file'};
