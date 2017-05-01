Meteor.methods({
    'hasRolePermission': function(roleName, permission) {
        if (Meteor.userId()) {
            return Permissions.findOne({$and: [{_id: permission}, {roles: roleName}]});
        }
    }
});