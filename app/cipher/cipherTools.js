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
        //let msgBuffer = new Buffer(msg);
        let msgCripto = pub.encrypt(msg);
        return msgCripto;
    }

    //decifrador/decriptografador
    async function decipher(msgCripto, privateKey){

        console.log('mensagem cripto:   ' + msgCripto);

        let priv =  await ursa.createPrivateKey(privateKey, '', 'base64');

        console.log('Private Key:  ' + privateKey);

        let msgDescripto = await priv.publicDecrypt(msgCripto, 'base64', 'utf-8', ursa.RSA_NO_PADDING);

        console.log("===>>> + " + msgDescripto);

        return msgDescripto.toString();

    }

module.exports.generatorKeys = generatorKeys;
module.exports.getPublicKey = getPublicKey;
module.exports.getPrivateKey = getPrivateKey;
module.exports.cipher = cipher;
module.exports.decipher = decipher;
