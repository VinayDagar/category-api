const crypto = require('crypto');

module.exports = (function () {
    const createHash = (value, salt) => {
        if(!value) throw new Error('Value must be provided in order to create the hash!')
        if(!salt) throw new Error('Salt must be provided in order to create the hash!')

        return crypto.createHmac('sha1', salt).update(value).digest('hex');
        
    }

    return {
        createHash
    }

}())

