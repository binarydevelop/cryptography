const { generateKeyPairSync, createSign, createVerify } = await import('node:crypto');


function generateKeyPairs() {
    return generateKeyPairSync('rsa', {
        modulusLength: 2048, // Key size in bits
        publicKeyEncoding: {
            type: 'spki', 
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8', 
        },
    });
}

function signMessage(privateKey, message) {
    const signer = createSign('sha256'); // Using SHA-256 as the hash function
    signer.update(message); // Hash the message
    signer.end(); // Finalize the hash
    return signer.sign(privateKey, 'base64'); // Create the signature in base64 format
}

// Verify a signature
function verifySignature(publicKey, message, signature) {
    const verifier = createVerify('sha256'); // Using SHA-256 as the hash function
    verifier.update(message); // Hash the message
    verifier.end(); // Finalize the hash
    return verifier.verify(publicKey, signature, 'base64'); // Verify the signature
}

function main(){
    const message = 'This is secret message';
    
  // Step 1: Generate a key pair
  const { publicKey, privateKey } = generateKeyPairs();
  console.log('Public Key:', publicKey);
  console.log('Private Key:', privateKey);

  // Step 2: Create a digital signature
  const signature = signMessage(privateKey, message);
  console.log('Digital Signature:', signature);

  // Step 3: Verify the digital signature
  const isVerified = verifySignature(publicKey, message, signature);
  console.log('Is the signature valid?', isVerified);
}

main();