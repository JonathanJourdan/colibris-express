/* Imports des dépendances */
let jwt = require('jsonwebtoken')

const JWT_SECRET = 'fbfufvfufs21g1gb5g1bgb1b1ggf5b1gb51b5211h15hkjk5j5h4k5dfLKKJjffrre514vghfhJKhjHKbjvRTctrsreYvuBJF2g1h56h1511g';

/* Export function */
module.exports = {

    create_token: function (userData) {
        return jwt.sign(
            {
                "_id": userData._id,
                "civility": userData.civility,
                "lastName": userData.lastName,
                "firstName": userData.firstName,
                "email": userData.email,
                "profil": userData.profil,
                "Colleges_extId": userData.Colleges_extId
            },
            JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: "1h"
            })
    },

    parse_token: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    verif_token: function (token) {
        let user_id = -1;
        var data = [];
        
        /* récupération du token dans le header http */
        let parsed_token = module.exports.parse_token(token);

        if (parsed_token != null) {
            try {
                /* vérification du token grâce à la clé secrète */
                let jwt_token = jwt.verify(parsed_token, JWT_SECRET, {
                    algorithms: ['HS256']
                });
                if (jwt_token != null) {
                    user_id = jwt_token.user_id;
                    user_email = jwt_token.user_email;
                    data.push(user_id)
                    data.push(user_email)
                }
            } catch (err) { }
        }

        return data;
    },
}