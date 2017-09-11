const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
		const kevin = new User({ name: 'Kevin' });

		kevin.save()
			.then(() => {
				// Has it been saved successfully?
				assert(!kevin.isNew);
				done();
			})
	});
});