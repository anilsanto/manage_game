const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');

module.exports = {
    validatePassword: function(password) {
        try {
            var schema = new passwordValidator();
            schema
                .is().min(8) // Minimum length 8
                .is().max(100) // Maximum length 100
                .has().uppercase() // Must have uppercase letters
                .has().lowercase() // Must have lowercase letters
                .has().digits() // Must have digits
                .has().symbols() //Must have symbols
                .has().not().spaces() // Should not have spaces
                .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
            return schema.validate(password)
        } catch (e) {
            return false
        }
    },
    validateEmail: function(email) {
        try {
            return emailValidator.validate(email)
        } catch (e) {
            return false
        }
    }

}