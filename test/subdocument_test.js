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

	it('can add subdocuments to an existing record', (done) => {
		const kevin = new User({
			name: 'Kevin', 
			posts: []
		});

		kevin.save()
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				user.posts.push({ title: 'New Post' });
				return user.save();
			})
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user.posts[0].title === 'New Post');
				done();
			});
	});

	it('can remove an existing subdocument', (done) => {
		const kevin = new User({
				name: 'Kevin', 
				posts: [{ title: 'New title' }]
		});
		kevin.save()
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				const post = user.posts[0];
				post.remove();
				return user.save();
			})
			.then(() => User.findOne({ name: 'Kevin' }))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			});			
	});
});