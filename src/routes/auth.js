const router = require('express').Router();
const express = require('express');
// const sequelize = require('sequelize');
const  {User }= require('../db/index')
const bcrypt = require('bcryptjs');

router.use(express.json())

router.post('/register', async(req,res) =>{
    const user = User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});


module.exports = router;