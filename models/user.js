const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email no es válido')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('El password no debe contener password')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Edad debe ser un valor positivo')
            }
        }
    },
    tokens:[
        {token:{
            type:String,
            required:true
        }}
    ]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jsonwebtoken.sign({_id: user._id.toString()}, 'estoessupersecreto', {expiresIn: '7 days'})

    user.tokens = user.tokens.concat({token:token})
    await user.save()
    
    return token
}

userSchema.statics.findUserByCredentials = async (email, password)=>{
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Email o password no válidos')
    }
    const isOk = await bcrypt.compare(password, user.password)
    if(!isOk){
        throw new Error('Email o password no válidos')
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User