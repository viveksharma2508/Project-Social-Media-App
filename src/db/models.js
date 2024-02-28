const  Sequelize = require('sequelize')
// const { Col } = require('sequelize/types/utils')

const db = new Sequelize({
    dialect:'mysql',
    database:'cbsocialdb',
    username : 'cbsocialuser',
    password:'cbsocialpass'
})

//define relations
const COL_ID_DEF = {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey : true
}
const COL_USERNAME_DEF = {
    type: Sequelize.DataTypes.STRING(30),
    unique : true,
    allowNull : false
}
const COL_TITLE_DEF = {
    type: Sequelize.DataTypes.STRING(140),
    id : COL_ID_DEF,
    allowNull: false
}
const Users = db.define('user',{
    id: COL_ID_DEF,
    username : COL_USERNAME_DEF
})

const Posts = db.define('post',{
    id: COL_ID_DEF,
    title: COL_TITLE_DEF,
    body : {
        type : Sequelize.DataTypes.TEXT,
        allowNull  :false
    }
})

// const  Articles = db.define('article',{
//     id: COL_ID_DEF
// })

const Comments = db.define('comment',{
    id:COL_ID_DEF,
    title : COL_TITLE_DEF,
    body:{
        type: Sequelize.DataTypes.TEXT('tiny')
    }
})


Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)


Posts.hasMany(Comments)
Comments.belongsTo(Posts)



module.exports = {
    db,
    Users,
    Posts,
    Comments,
}