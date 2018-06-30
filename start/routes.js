const Route = use('Route')

Route.group(()=>{
    Route
        .resource('users', 'UserController')
        .apiOnly()
        .validator(new Map([
            [['users.store'], ['StoreUser']]
        ]));
    
    Route
        .resource('todos', 'TodoController')
        .apiOnly()
        .validator(new Map([
            [['todos.store'], ['StoreTodo']],
            [['todos.destroy'], ['DestroyTodo']]
        ]))
        .middleware(['auth']);
    
    Route.post('/token', 'TokenController.create')
    Route.delete('/token', 'TokenController.revoke');
})
.formats(['json'])
.prefix('api/v1/');
