const extractPublicId = (url) => {
  const parts = url.split('/');
  const publicIdWithExt = parts[parts.length - 1];
  const publicId = publicIdWithExt.split('.')[0];
  return publicId;
};


export default extractPublicId;