const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the db', () => {
	let kevin;

	beforeEach((done) => {
		kevin = new User({ name: 'Kevin' });
		kevin.save()
			.then(() => done());
	});

	it('finds all users with the name kevin', (done) => {
		User.find({ name: 'Kevin' })
			.then((users) => {
				console.log(users);
				// IDs are wrapped in an object id, need to make them strings to compare
				assert(users[0]._id.toString() === kevin._id.toString());
				done();
			});
	});

	it('find a user with a particular id', (done) => {
		User.findOne({ _id: kevin._id })
			.then((user) => {
				assert(user.name === 'Kevin');
				done();
			});
	});
});