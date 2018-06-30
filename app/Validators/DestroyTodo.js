'use strict'

const { formatters } = require('indicative')

class DestroyTodo {
  get rules () {
    return {
      'params.id': 'integer'
    }
  }

  get formatter(){
    return formatters.JsonApi
  }

  get sanitizationRules(){
    return {
      'params.id': 'to_int'
    }
  }

  // get validateAll(){
  //   return true;
  // }

  get messages(){
    return {
      'params.id.integer': 'Given id is not an integer!'
    }
  }
}

module.exports = DestroyTodo;