Template.permissions.helpers({

    rolesGL: function(){
        return getRolesGL();
    },
    permissionsGL: function(){
        return getPermissionsGL();
    },

    roles: function(){
        return getRolesCh();
    },
    permissions: function(){
        return getPermissionsCh();
    },

    permissionActive:function(permission) {
        if(Permissions.findOne({$and: [{_id: permission}, {"roles": this._id }]})){
            return "checked"
        }
    }
});

Template.permissions.events({
    'click .rows':function(e,t){
        var permission = e.currentTarget.id;
        var role = (e.target.id);

        if(role !== "" && permission != ""){
            var change;
            if(e.target.getAttribute('checked')){
                change="pull"
            }else{
                change="push"
            }
            Meteor.call('updatePermission', permission, role, change);
        }
    },
    'click .backLink': function(e,t){
        FlowRouter.go('channel', { team: Session.get("team"), channel: 'general' });
    }
});