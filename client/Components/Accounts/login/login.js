Template.login.events({
    'submit .login-form': function (e, template) {
        e.preventDefault();
        var username = $(e.target).find('[name="username"]').val();
        var password = $(e.target).find('[name="password"]').val();

        Meteor.loginWithPassword(username, password, function (err) {
            if (!err) {
                FlowRouter.go("/teams");
            }else{
                Materialize.toast(err.message, 4000);
            }
        });
    }
});