const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	let kevin;

	beforeEach((done) => {
		kevin = new User({ name: 'Kevin'});
		kevin.save()
			.then(() => done());
	});

	it('model instance remove', (done) => {
		kevin.remove()
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method remove', (done) => {
		User.remove({ name: 'Kevin' })
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method findOneAndRemove', (done) => {
		User.findOneAndRemove({ name: 'Kevin' })
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(kevin._id)
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

});