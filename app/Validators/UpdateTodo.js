'use strict'

const { formatters } = require('indicative')

class UpdateTodo {
  get rules () {
    return {
      'data.attributes.description': 'min:5|max:255|string',
      'data.attributes.completed': 'boolean'
    }
  }

  get formatter(){
    return formatters.JsonApi
  }

  get sanitizationRules(){
    return {
      'data.attributes.description': 'escape',
      'data.attributes.completed': 'boolean'
    }
  }

  // get validateAll(){
  //   return true;
  // }

  get messages(){
    return {
      'data.attributes.description.max': 'Description is too long, maximum 255 characters!',
      'data.attributes.description.min': 'Description is too short, maximum 5 characters!',
      'data.attributes.completed.boolean': 'An error occurred while trying to update the todo!'
    }
  }
}

module.exports = UpdateTodo;