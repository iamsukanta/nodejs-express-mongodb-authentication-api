// Import contact model
UsersService = require('../../services/usersapi.service');

module.exports = {
    list: (req, res) => {
        return UsersService.list(req, res);
    },

    create: (req, res) => {
        return UsersService.create(req, res);
    },

    createSeedingUser: (req, res) => {
        return UsersService.createSeedingUser(req, res);
    },

    update: (req, res) => {
        return UsersService.update(req, res);
    },

    login: (req, res) => {
        return UsersService.login(req, res);
    },

    refresh: (req, res) => {
        return UsersService.refresh(req, res);
    },

    me: (req, res) => {
        return UsersService.me(req, res);
    },

    destroy: (req, res) => {
        return UsersService.destroy(req, res);
    }
}
