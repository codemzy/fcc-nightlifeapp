require('dotenv').config();

var Yelp = require('yelp');

var opts = {
  consumer_key: process.env.YELP_KEY,
  consumer_secret: process.env.YELP_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKSEC,
};

var yelp = new Yelp(opts);

module.exports = function (app, db, passport) {
    
    // function to check if user is logged in
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}
    
    // direct user to correct app if logged in or anon
    app.route('/')
        .get(function (request, response) {
    		if (request.isAuthenticated()) {
    			response.sendFile(process.cwd() + '/public/app/loggedin.html');
    		} else {
    			response.sendFile(process.cwd() + '/public/app/index.html');
    		}
            
        });
        
    // anonomous api's
	app.route('/api/search/:location')
		.get(function (req, res) {
			var location = req.params.location;
			yelp.search({ term: 'bar, pub, club, restaurant', sort:2, location: location, limit:20 })
			.then(function (data) {
			  res.json(data);
			})
			.catch(function (err) {
			  res.status(400).json(err);
			});
		});
		// A ROUTE WITH OFFSET FOR PAGES eg '/api/search/:location/:offset'
	app.route('/api/search/:location/:offset')
		.get(function (req, res) {
			var location = req.params.location;
			var offset = parseInt(req.params.offset, 10);
			yelp.search({ term: 'bar, pub, club, restaurant', location: location, sort:2, offset:offset, limit:20 })
			.then(function (data) {
			  res.json(data);
			})
			.catch(function (err) {
			  res.status(400).json(err);
			});
		});
        
    // registered apis
    app.route('/api/user')
        .get(isLoggedIn, function(req, res) {
			res.json(req.user);
        });
        
        
    // authentication routes (FIRST LOG IN)
        
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	app.route('/auth/facebook')
	    .get(passport.authenticate('facebook'));
	    
	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	
	// authorize routes (CONNECT ADDITIONAL ACCOUNT)
	// put the logic in the above authentication routes, in future could have seperate strategy as per passport docs

	
	// LOG OUT
		
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});
		
};