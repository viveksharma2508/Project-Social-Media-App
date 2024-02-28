
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { db } = require('../../db/models');
const { Users } = require('../../db/models');

const { cast } = require('sequelize');

//user Registers
router.post('/register', async (req,res)=>{
    const {username , password} = req.body;

    try{
        // check existence of user
        const existingUser = await Users.findOne({ where: { username } });
        if(existingUser){
            return res.status(400).json({
                message :"Username Already Exists"
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //create a new user
        const newUser = await Users.create({
            username,
            password : hashedPassword
        })

        res.status(201).json(newUser)
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
})

// user login
router.post('/login' , async (req,res)=>{
    const{username , password} = req.body

    try{
        const user = await Users.findOne({where:{username},
        attributes :['id' , 'username' , 'password']})

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Username or password'
            });
        }

        if (!password || !user.password) {
            return res.status(401).json({
                message: 'Invalid Username or password'
            });
        }



        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({
                message:'Invalid Username or password'
            })
        }
        //generate jwt token
        const token = jwt.sign({
            id:user.id
        },
        process.env.JWT_SECRET,{expiresIn: '7d'})

        res.json({
            token
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message :"Server Error"
        })
    }

 
async function hashPasswords() {
  try {
    // Retrieve users from the database
    const users = await Users.findAll();

    // Hash passwords for each user
    for (const user of users) {
      if (user.password) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        // Update the user's password in the database with the hashed password
        await user.update({ password: hashedPassword });
        
        console.log(`Password hashed for user ${user.username}`);
      }
    }

    console.log('All passwords hashed successfully');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  }
}

// Call the function to hash passwords

})

module.exports = router;

/*
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { Users } = require('../../db/models');

// Define user registration route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username Already Exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await Users.create({
            username,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Define user login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await Users.findOne({
            where: { username },
            attributes: ['id', 'username', 'password']
        });

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid Username or password' });
        }

        // Check if the provided password matches the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Function to hash passwords for all users
async function hashPasswords() {
    try {
        // Retrieve all users from the database
        const users = await Users.findAll();

        // Hash passwords for each user
        for (const user of users) {
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await user.update({ password: hashedPassword });
                console.log(`Password hashed for user ${user.username}`);
            }
        }

        console.log('All passwords hashed successfully');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
}

// Call the function to hash passwords
hashPasswords();

module.exports = router;

/*
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { Users } = require('../../db/models');

// Define user registration route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username Already Exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await Users.create({
            username,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Define user login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await Users.findOne({
            where: { username },
            attributes: ['id', 'username', 'password'] // Ensure password field is included
        });

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid Username or password' });
        }

        // Check if the provided password matches the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Function to hash passwords for all users
async function hashPasswords() {
    try {
        // Retrieve all users from the database
        const users = await Users.findAll();

        // Hash passwords for each user
        for (const user of users) {
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await user.update({ password: hashedPassword });
                console.log(`Password hashed for user ${user.username}`);
            }
        }

        console.log('All passwords hashed successfully');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
}

// Call the function to hash passwords
hashPasswords();

module.exports = router;
*/
