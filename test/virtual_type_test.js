const assert = require('assert');
const User = require('../src/user');

describe('Virtual types' ,() => {
	it('postCount returns the number of posts', (done) => {
		const kevin = new User({
			name: 'Kevin',
			posts: [{ title: 'PostTitle' }]
		});

		kevin.save()
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(kevin.postCount === 1);
				done();
			});
	});
});