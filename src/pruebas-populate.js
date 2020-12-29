/* 
node -r dotenv/config src/pruebas-populate.js    
*/

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const User = require('../models/user')
const Test = require('../models/test')


const check_owner_from_test_1 = async () => {
    try {
        const testA = await Test.findById('5fbe14d087a71700177785d7')
        console.log('without populate:', testA.owner)
    } catch (error) {
        console.log(error)
    }
}

check_owner_from_test_1()


const check_owner_from_test_2 = async () => {
    try {
        const testA = await Test.findById('5fbe14d087a71700177785d7')
        await testA.populate('owner').execPopulate()
        console.log('with ref populated:', testA.owner)
    } catch (error) {
        console.log(error)
    }
}

check_owner_from_test_2()


const check_tests_from_owner = async () => {
    try {
        const userA = await User.findById('5fea498cd40c19941ddb9174')
        await userA.populate('tests').execPopulate()
        console.log('tests of userA:', userA.tests)
    } catch (error) {
        
    }
}

check_tests_from_owner()