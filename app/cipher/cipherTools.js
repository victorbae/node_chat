const ursa = require('ursa');
const keys = require('./keyGenerator');

    //gerador chave
    function generatorKeys(){
        return keys.keys();
    }

    //pegador de chave publica da chave
    function getPublicKey(generateKey){
        return keys.publicPem(generateKey);
    }

    //pegador de chave privada da chave
    function getPrivateKey(generateKey){
        return keys.privatePem(generateKey);
    }

    //cifrador/criptografador
    function cipher(msg, publicKey){
        let pub = ursa.createPublicKey(publicKey, 'base64');
        let msgBuffer = new Buffer(msg);
        let msgCripto = pub.encrypt(msg);
        return msgCripto.toString();
    }

    //decifrador/decriptografador
    function decipher(msgCripto, privateKey){
        var priv = ursa.createPrivateKey(privateKey, '', 'base64');
        var msgDescripto = priv.decrypt(msgCripto, 'base64', 'utf8', ursa.RSA_PKCS1_PADDING);
        console.log("===>>> + " + msgDescripto);
        return msgDescripto.toString();
    }

module.exports.generatorKeys = generatorKeys;
module.exports.getPublicKey = getPublicKey;
module.exports.getPrivateKey = getPrivateKey;
module.exports.cipher = cipher;
module.exports.decipher = decipher;
