const { createClient } = require('@supabase/supabase-js');
const fs = require("fs");
const apiError = require('./apiError');

const supabase = createClient(
  `https://${process.env.SUPABASE_ID}.supabase.co`,
  process.env.SUPABASE_KEY
)


async function supabaseUrl(file, name) {
  try{
    const fileBuffer = fs.readFileSync(file.path);
  const fileExt = file.originalname.split('.').pop();
  const fileName = `${name}-Resume-${Date.now()}`;

  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(fileName, fileBuffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  fs.unlinkSync(file.path);

  if (error) {
    throw new apiError(500, 'internal server error', error);
  }
  const { publicUrl } = supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .getPublicUrl(fileName).data;
  return publicUrl;
  }catch(e){
   throw new apiError(500, 'internal server error', e); 
  }
}

module.exports = supabaseUrl;