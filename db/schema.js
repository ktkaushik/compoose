/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

module.exports = function (mongoose, compound) {
    // mongoose stuff
    //  still figuring this out
    // console.log( mongoose );
    var postSchema = mongoose.Schema({
		title: String,
		desc: String
    });
    var Post = mongoose.model('Post', postSchema);
    Post.modelName = 'Post';
	compound.models.Post = Post;

	var userSchema = mongoose.Schema({
		name: String,
		email: String
    });

    // var Cat = mongoose.model('Cat', schema);

    // // expose model name for view helpers (resource-based helpers like formFor)
    // Cat.modelName = 'Cat';

    // // register model in compound.models registry
    // compound.models.Cat = Cat;
};

// var User = describe('User', function () {
//     property('name', String);
//     property('email', String);
//     set('restPath', pathTo.Users);
// });

