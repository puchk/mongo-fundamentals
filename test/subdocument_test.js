const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('can create a subdocument', (done) => {
		const kevin = new User({ 
			name: 'Kevin', 
			posts: [{ title: 'PostTitle'}]
		});

		kevin.save()
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user.posts[0].title === 'PostTitle');
				done();
			});
	});
});