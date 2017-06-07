Template.register.events({
    /*Form Submit für das Registrieren eines Benutzers mit anschließedem Login*/
    'submit .register-form': function(e, template) {
        event.preventDefault();
        var username = $(e.target).find('[name="username"]').val();
        var password = $(e.target).find('[name="password"]').val();
        var email = $(e.target).find('[name="email"]').val();

        var accountInfo = {
            email: email,
            password: password,
            username: username
        };
        /*Erstellt durch Package Accounts einen neuen Benutzer*/
        Accounts.createUser(accountInfo, function (err) {
            if (!err) {
                /*Loggt Benutzer mit Benutzernamen ein*/
                Meteor.loginWithPassword(username, password, function(err){
                    if(!err){
                        FlowRouter.go("/teams");
                        Materialize.toast("Login successfull", 4000, "success");
                    }else{
                        Materialize.toast("Something goes wrong!", 4000);
                    }
                });
            } else {
                Materialize.toast(err.message, 4000, 'error');
            }
        });
    }
});