load('application');

before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New User';
    this.user = new User;
    render();
});

action(function create() {
    var user = new User(req.body.User);
    console.log( "****************************************************************************************************" );
    console.log( user );
    user.save(function (err, User) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: User && User.errors || err});
                } else {
                    send({code: 200, data: User.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'User can not be created');
                    render('new', {
                        User: User,
                        title: 'New User'
                    });
                } else {
                    flash('info', 'User created');
                    redirect(path_to.users);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Users index';
    User.find({}, function (err, users) {
        switch (params.format) {
            case "json":
                send({code: 200, data: users});
                break;
            default:
                render({
                    users: users
                });
        }
    })
});

action(function show() {
    this.title = 'User show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.User});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'User edit';
    switch(params.format) {
        case "json":
            send(this.User);
            break;
        default:
            render();
    }
});

action(function update() {
    var User = this.User;
    this.title = 'Edit User details';
    this.User.updateAttributes(body.User, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: User && User.errors || err});
                } else {
                    send({code: 200, data: User});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'User updated');
                    redirect(path_to.User(User));
                } else {
                    flash('error', 'User can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.User.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy User');
                } else {
                    flash('info', 'User successfully removed');
                }
                send("'" + path_to.users + "'");
            });
        });
    });
});

function loadUser() {
    User.find(params.id, function (err, user) {
        if (err || !user) {
            if (!err && !user && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.users);
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}
