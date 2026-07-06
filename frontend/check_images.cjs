const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop', // Hero & Description
  'https://images.unsplash.com/photo-1608797177579-2475949eecdb?q=80&w=600&auto=format&fit=crop', // About, Collection 1
  'https://images.unsplash.com/photo-1615486511484-92e172054238?q=80&w=600&auto=format&fit=crop', // Collection 2
  'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=600&auto=format&fit=crop'  // Collection 3
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(e);
  });
});
