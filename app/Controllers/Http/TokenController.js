'use strict'

class TokenController {

    async create({request, auth}){
        const {password, username} = request.all();
        return await auth.attempt(username, password);
    }

    async revoke({auth}){
        const apiToken = auth.getAuthHeader()

        await auth
            .authenticator('jwt')
            .revokeTokens([apiToken])
    }
}

module.exports = TokenController
