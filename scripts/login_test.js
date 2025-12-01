const axios = require('axios');

(async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      email: 'admin@sanem.com',
      password: 'admin123'
    }, { headers: { 'Content-Type': 'application/json' } });
    console.log('STATUS', res.status);
    console.log('DATA', res.data);
  } catch (err) {
    if (err.response) {
      console.error('STATUS', err.response.status);
      console.error('DATA', err.response.data);
    } else {
      console.error('ERROR', err.message);
    }
    process.exit(1);
  }
})();
