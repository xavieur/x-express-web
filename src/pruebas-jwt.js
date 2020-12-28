const jsonwebtoken = require('jsonwebtoken')

const payload = {_id: '123'}

const secretKey = 'estoessupersecreto'

const sk = process.env.JWT_KEY

const firmar = async (payload, secretKey)=>{
    const jwt = await jsonwebtoken.sign(payload, secretKey, {expiresIn: '2 days'})
    console.log('firmando: ', jwt)
}

const verificar = async(jwt, secret)=>{
    const decoded = await jsonwebtoken.verify(jwt, secretKey)
    console.log('verificando: ', decoded)
}

firmar(payload, secretKey)
verificar('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJpYXQiOjE2MDY5ODk5ODYsImV4cCI6MTYwNzE2Mjc4Nn0.oFUwFW1A4Ptex671H7Cf7FetDconuC5gT14Pg2ylUCE', secretKey)
