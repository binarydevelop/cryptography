const { createHmac } = await import('node:crypto');
import { default as axios } from 'axios';


function generateHmac(message, secretKey, algorithm = 'sha256') {
    const digest = createHmac(algorithm, secretKey).update(message).digest('hex');
    return digest;
}

const apiUrl = process.env.URL;
const secretKey = process.env.SECRET_KEY;
const payload = JSON.stringify({ username: 'John Does', data: { key1: 'value1' } });

const generatedHmac = generateHmac(payload, secretKey);

axios
    .post(apiUrl, payload,
        {
            headers: {
                'X-KEY': `HMAC ${generatedHmac}`
            }
        }
    )
    .then((response) => console.log(response))
    .catch((error) => console.log(error)) 
