var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema
var userSchema = Schema({
	name: {
		first: String,
		last: { type: String, trim: true }
	},
	username: String,
	password: String
});


// Methods
userSchema.methods.login = function(psw){
	return this.password == password;
};

userSchema.methods.toString = function(){
	return this.fullName();
};

userSchema.methods.fullName = function(){
	return this.name.first + " " + this.name.last;
};

var User = mongoose.model('User', userSchema);


// Validation
User.schema.path("username").validate(function(value){
    if(typeof(value).toLowerCase() != "string" || value.length < 5)
        return false;
    
}, "Invalid username value [Should be a string (max=5)]");


module.exports = { User:User };