Meteor.methods({
    'addPermissionToRole': function(permission, role){
        if(User.isLoggedIn() || hasPermission('admin')){
            Permissions.addRole(permission, role);
        }
    }
});