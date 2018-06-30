'use strict'

const Schema = use('Schema')

class TodoSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments()
      table.string('user_id', 80).notNullable()
      table.string('description', 100).notNullable()
      table.boolean('completed').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = TodoSchema
