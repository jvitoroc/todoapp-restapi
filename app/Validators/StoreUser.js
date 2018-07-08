'use strict'

const { formatters } = require('indicative')

class StoreUser {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      username: 'required|max:50|min:8|unique:users,username',
      password: 'required|max:20|min:8'
    }
  }
  
  get formatter(){
    return formatters.JsonApi
  }

  // get validateAll(){
  //   return true;
  // }

  get messages(){
    return {
      'username.required': 'Please choose a username for your account!',
      'password.required': 'Please choose a password for your account!',
      'email.required': 'Enter a email address!',
      'email.email': 'Enter a valid email address!',
      'username.max': 'Your username is too long, maximum 50 characters!',
      'username.min': 'Your username is too short, minimum 8 characters!',
      'password.max': 'Your password is too long, maximum 20 characters!',
      'password.min': 'Your password is too short, minimum 8 characters!',
      'username.unique': 'Username already exists!',
      'email.unique': 'Given email address is already in use!'
    }
  }
}

module.exports = StoreUser