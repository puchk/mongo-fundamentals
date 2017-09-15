const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let kevin;

	beforeEach((done) => {
		kevin = new User({ name: 'Kevin', postCount: 0 });
		kevin.save()
			.then(() => done());
	})

	function assertName(operation, done) {
		operation
			// Finding empty object searches for all
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Michael');
				done();
			});
	}

	it('Instance type using set and save', (done) => {
		// console.log(kevin);
		// Changes name to Michael
		kevin.set('name', 'Michael');
		// console.log(kevin);
		assertName(kevin.save(), done);
	});

	it('A model instance can update', (done) => {
		assertName(kevin.update({ name: 'Michael' }), done);
	});

	it('A model class can update', (done) => {
		assertName(
			User.update({ name: 'Kevin' }, { name: 'Michael' }),
			done
		);
	});

	it('A model class can update one record', (done) => {
		assertName(	
			User.findOneAndUpdate({ name: 'Kevin'}, { name: 'Michael' }),
			done
		);
	});

	it('A model class can find a record with an Id and update', (done) => {
		assertName(
			User.findByIdAndUpdate(kevin._id, { name: 'Michael'}),
			done
		);
	});

	it('A user can have their postcount incremented by 1', (done) => {
		// Use mongo update operators
		User.update({ name: 'Kevin' }, { $inc: { postCount: 1 } })
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user.postCount === 1);
				done();
			});
	});

});