const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1599909691880-60b79566ce49?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599643477873-10826978433d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512485800998-d22746f34e3d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605389476717-b0885a5398d0?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579308182741-2a13cc7c7d42?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587049352847-5110d7a64e1c?q=80&w=600&auto=format&fit=crop'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(e);
  });
});
