const http = require('http');

const data = JSON.stringify({
  name: 'Test Customer',
  email: 'test@test.com',
  phone: '1234567890'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/customers',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('BODY:', body);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
