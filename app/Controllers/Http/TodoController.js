'use strict'

const Todo = use('App/Models/Todo');

const { sanitize } = use('Validator')

class TodoController {
    
    async store({request, response, auth}){
        const user = await auth.getUser()
        const {description} = request.post().data.attributes;
        let todo = await user
            .todos()
            .create({description});

        todo = todo.toJSON();

        response.status(201);
        return {
            data: {
                id: todo.id,
                type: 'todos',
                attributes: {
                    description: todo.description,
                    completed: todo.completed
                }
            }
        };
    }

    async index({request, response, auth}){
        const user = await auth.getUser()
        let todos = await user
            .todos()
            .fetch();

        let serializedTodos = todos.toJSON().map((todo)=>{
            return {
                type: 'todos',
                id: todo.id,
                attributes: {
                    description: todo.description,
                    completed: todo.completed
                }
            }
        });

        return {data: serializedTodos};
    }

    async show({request, response, auth}){
        let todo = await Todo
            .find(request.params.id);
        
        return {
            data: {
                id: todo.id,
                type: 'todos',
                attributes: {
                    description: todo.description,
                    completed: todo.completed
                }
            }
        };
    }
    
    async update({request, response}){
        let todo = await Todo
            .findOrFail(request.params.id);
        
        let {description, completed} = request.post().data.attributes;

        if(description !== undefined)
            todo.merge({description})
        
        if(completed !== undefined){
            if(completed == "" || completed == "false" || completed == 0)
                completed = false;
            else
                completed = true;
            todo.merge({completed});
        }

        await todo.save();

        return {
            data: {
                id: todo.id,
                type: 'todos',
                attributes: {
                    description: todo.description,
                    completed: todo.completed
                }
            }
        };
    }

    async destroy({request, response, auth}){
        let res = await Todo
            .query()
            .where({user_id: (await auth.getUser()).id, id: request.params.id})
            .delete();

        response.status(res === 0 ? 404:204);

        response.send();
    }
}

module.exports = TodoController
