const Dev = require('../models/Dev');

// BOA PRATICA: Cada controller ter apenas esses cinco metodos: INDEX, SHOW, STORE, UPDATE, DELETE

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        const userExists = await Dev.findOne({ user: username });

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if (targetDev.likes.includes(user)) {
            console.log('Deu match!');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}