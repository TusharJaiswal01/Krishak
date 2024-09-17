
const express = require('express');

const Forum = require('../models/forumSchema');

const SendData = async (req, res) => {
    try {
        const forum = new Forum(req.body);
        await forum.save();
        res.status(201).send(forum);
    } catch (error) {
        res.status(400
        ).send(error);
    }
}

const getData = async (req, res) => {
    try {
        const forum = await Forum.find();
        res.status(200).send(forum);
    } catch (error) {
        res.status(400
        ).send(error);
    }
}


module.exports = { SendData, getData };


