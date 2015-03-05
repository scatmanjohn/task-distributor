var userSchema = new mongoose.Schema({
	name: {
		first: String,
		last: { type: String, trim: true }
	},
	username: String,
	password: String
});

module.exports = User;