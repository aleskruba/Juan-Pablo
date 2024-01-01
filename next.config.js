/** @type {import('next').NextConfig} */
const nextConfig = {

 images: {
  disableManifest: true,
  cacheBust: true,
   domains: [
         'lh3.googleusercontent.com'
   ]
 } 
}

module.exports = nextConfig
