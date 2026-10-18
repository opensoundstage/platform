import {json} from './_shared.mjs';
export default async () => json(200,{service:'OpenSoundstage Hosted API',status:'ok',version:'0.1.0',maxFileBytes:16384});
export const config={path:'/api/health'};
