const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try {
        const authorizationHeaders = req.get('Authorization');
        if(!authorizationHeaders)
            throw new Error('unauthorized access');
        const token = authorizationHeaders.split(' ')[1];
        //verify the token with jwt 
        const decoded = jwt.verify(token, 'secretekeyundecodable');
        if(!decoded)
            throw new Error('unauthorized');
            next();
    } catch (err) {
        res.json(err.message);
    }
}

module.exports = isAuth;