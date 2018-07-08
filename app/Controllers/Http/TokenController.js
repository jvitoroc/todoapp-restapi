'use strict'

const Config = use('Config');
let expiresIn = Config.get('app.tokenExpiresIn');
expiresIn = expiresIn*1000;

class TokenController {

    async create({request, response, auth}){
        const {password, username} = request.all();
        const {token} = await auth.attempt(username, password);
        const created = Date.now();
        const createdDate = new Date(created);
        const expiresDate = new Date(created+expiresIn);
        
        response.status(201);

        return {
            data: {
                type: 'tokens',
                attributes: {
                    token,
                    'expires-in': expiresIn,
                    created: createdDate.toISOString(),
                    expires: expiresDate.toISOString(),
                    category: 'Bearer'
                }
            }
        }
    }

    async revoke({auth}){
        const apiToken = auth.getAuthHeader()

        await auth
            .authenticator('jwt')
            .revokeTokens([apiToken])
    }
}

module.exports = TokenController
