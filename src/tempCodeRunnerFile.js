require('dotenv').config()
const express = require('express')

const jwt = require('jsonwebtoken')

const { db } = require('./db/models')
const {usersRoute } = require('./routes/users')
const { postsRoute } = require('./routes/posts')
const { error } = require('jquery')
// const  authRoute = require('./routes/auth')




const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', usersRoute)
app.use('/api/posts' , postsRoute)
// app.use('/api/users', authRoute)
app.use('/' ,express.static(__dirname + '/public'))

// app.use('/',express.static(__dirname + '/app'))


app.post('/login' ,(req,res)=>{
    // Authentication User

    const {username , password} = req.body;
    if(username == 'Vivek Sharma' && password == "1222"){
        const user = {username ,password}
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken : accessToken})
    }else{
        res.status(401).json({
            error:"Invalid Username and Password"
        })
    }
})

console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);


app.get('/', (req, res) => {
    res.sendFile(path.join('public', 'Components', 'write-post.html'));
});




  

db.sync()
.then(()=>{
    app.listen(8383,() => {
        console.log('Server started on http://localhost:8383')
    })
}).catch((err)=>{
    console.error(new Error('Could not start database'))
    console.error(err)
})



// const express = require('express');
// const path = require('path');
// const formidable = require('formidable');

// const { db } = require('./db/models');
// const { usersRoute } = require('./routes/users');
// const { postsRoute } = require('./routes/posts');

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/users', usersRoute);
// app.use('/api/posts', postsRoute);
// app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'Components', 'write-post.html'));
// });

// app.post('/api/upload', (req, res, next) => {
//     const form = new formidable.IncomingForm();
  
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             next(err);
//             return;
//         }
//         res.json({ fields, files });
//     });
// });

// db.sync()
// .then(() => {
//     app.listen(8383, () => {
//         console.log('Server started on http://localhost:8383');
//     });
// })
// .catch((err) => {
//     console.error(new Error('Could not start database'));
//     console.error(err);
// });











