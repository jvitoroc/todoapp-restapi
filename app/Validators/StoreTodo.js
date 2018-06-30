'use strict'

const { formatters } = require('indicative')

class StoreTodo {
  get rules () {
    return {
      'data.attributes.description': 'required|min:5|max:255'
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
      'data.attributes.description.required': 'Please provide a description to the todo!',
      'data.attributes.description.max': 'Description is too long, maximum 255 characters!',
      'data.attributes.description.min': 'Description is too short, maximum 5 characters!',
    }
  }
}

module.exports = StoreTodo;