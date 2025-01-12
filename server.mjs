const { createHmac } = await import('node:crypto');
import express from 'express';

const app = express();
app.use(express.json());

const secretKey = process.env.SECRET_KEY;

function verifyHmac(message, receivedHmac, secretKey, algorithm = 'sha256') {
    const hmac = crypto.createHmac(algorithm, secretKey);
    hmac.update(message);
    const calculatedHmac = hmac.digest('hex');
    return calculatedHmac === receivedHmac; 
}

app.post('/api/data', (req, res) => {
    const receivedHmac = req.headers['X-KEY']?.replace('HMAC ', '');
    const payload = JSON.stringify(req.body);

    const verifyHmac = verifyHmac(payload, receivedHmac, secretKey);

    if(verifyHmac){
        res.json({ success: true, message: 'HMAC verified successfully.' });
    }else {
        res.status(401).json({ success: false, message: 'Invalid HMAC signature.' });
    }

})




app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});