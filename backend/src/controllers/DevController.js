const axios = require('axios');
const Dev = require('../models/Dev');

// BOA PRATICA: Cada controller ter apenas esses cinco metodos: INDEX, SHOW, STORE, UPDATE, DELETE

module.exports = {
    async indexedDB(req, res) {
        const { user } = req.headers;

        const loggedUser = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                {_id: { $nin: loggedUser.likes } },
                {_id: { $nin: loggedUser.dislikes } },
            ],
        });

        res.json(users);
    },
    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get('https://api.github.com/users/' + username);

        const dev = await Dev.create({
            name: response.data.name,
            user: username,
            bio: response.data.bio,
            avatar: response.data.avatar_url
        });

        return res.json(dev);
    }
}