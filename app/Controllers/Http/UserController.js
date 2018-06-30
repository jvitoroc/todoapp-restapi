'use strict'

const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
    async store ({request, response}){
        const userData = request.only(['username', 'email', 'password']);
        const user = new User();

        userData['password'] = await Hash.make(userData['password'])

        user.fill(userData);
        await user.save();
        response.status(201).send({data: user});
    }
}

module.exports = UserController
