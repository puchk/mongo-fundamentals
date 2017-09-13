const mongoose = require('mongoose');

// Use ES6 promises
mongoose.Promise = global.Promise;

// Before only executes one time in the test suite opposed to beforeEach
// Only needs to connect to mongo once
before((done) => {
	mongoose.connect('mongodb://localhost/users_test');
	mongoose.connection
		.once('open', () => { done(); })
		.on('error', (error) => {
			console.warn('Error:', error);
		});
});



// Drop collection each time ran
beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		// Signals to mocha to run the next test
		done();
	});
});