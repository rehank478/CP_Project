const express = require('express');
const Router = express.Router();

Router.use('/fetchContests',require('./Api/fetchContests'));
Router.use('/addContest',require('./Api/AddContest'));
Router.use('/getQuestion',require('./Api/GetQuestion'));
Router.use('/setQuestion',require('./Api/SetQuestion'));
Router.use('/judge', require('./Api/Judge'));

module.exports = Router;