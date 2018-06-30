'use strict'

const Model = use('Model')

class User extends Model {
    todos () {
        return this.hasMany('App/Models/Todo')
    }
}

module.exports = User
