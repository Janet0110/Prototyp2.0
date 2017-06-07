if (Meteor.isServer) {
    Meteor.startup(function () {
        Accounts.ui = {};

        /*Optionen für Package Accounts*/
        Accounts.ui._options = {
            passwordSignupFields: 'USERNAME_AND_EMAIL',
            loginPath: '/login',
            requireEmailVerification: false
        };
    })
}

