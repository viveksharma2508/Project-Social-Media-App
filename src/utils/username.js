const { Sequelize } = require("sequelize")

const ADJECTIVE = [
    'boundless',
    'plausible',
    'sleepy',
    'electronic',
    'dangerous',
    'slim',
    'purple'
]

const OBJECTS = [
    'Puddle',
    'piano',
    'windows',
    'bowl',
    'socks',
    'brocolli',
    'chalk'
]

function genRandomUsername(){
    const adj = ADJECTIVE[Math.floor(Math.random()*7)]
    const obj = OBJECTS[Math.floor(Math.random()*7)]
    return `${adj} - ${obj}`
}



module.exports = {
    genRandomUsername
    
}
