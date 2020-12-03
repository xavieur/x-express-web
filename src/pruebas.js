
const bcrypt = require('bcryptjs')

const getHash = async (password) => {
    return await bcrypt.hash(password, 8)
}

const compararPasswordConHash = async (password) => {
    return await bcrypt.compare(password, await getHash(password))
}

compararPasswordConHash('secreto').then((data) => { console.log('compararPasswordConHash:', data) })


const otraIdea = (pass) => {
    return bcrypt.hash(pass, 8).then((hash) => {
        return bcrypt.compare(pass, hash)
    }).then((todoBien) => {
        console.log('increíble: ', todoBien)
    }).catch((e) => {
        'mira por dónde: ', console.log(e)
    })
}

/* Estructura then/catch
Promis1.then((data) => { return Promis2 }).then((data) => { return Promis3 }).then((data) => { }).catch((error) => { }) */

otraIdea('añsdlkfj')



const comparar = async (password) => {
    const hash = await bcrypt.hash(password, 8)
    console.log('solution hash: ', hash)
    const isOk = await bcrypt.compare(password, hash)
    console.log('solution isOk: ', isOk)
    return isOk
}

comparar('7654')