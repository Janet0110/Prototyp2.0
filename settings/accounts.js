if (Meteor.isServer) {
    Meteor.startup(function () {
        Accounts.ui = {};

        Accounts.ui._options = {
            passwordSignupFields: 'USERNAME_AND_EMAIL',
            loginPath: '/login',
            requireEmailVerification: false
        };
    })
}

