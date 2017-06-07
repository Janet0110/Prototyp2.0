Meteor.methods({
    /*Fügt der Rolle eine Berechtigung zu */
    'addPermissionToRole': function(permission, role){
        if(User.isLoggedIn() || hasPermission('admin')){
            Permissions.addRole(permission, role);
        }
    }
});