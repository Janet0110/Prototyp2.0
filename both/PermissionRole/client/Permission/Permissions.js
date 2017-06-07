/*Helpers für die Verwendung im Template*/
Template.permissions.helpers({
    /*holt sich alle globalen Rollen*/
    rolesGL: function(){
        return getRolesGL();
    },
    /*holt sich alle globalen Berechtigungen*/
    permissionsGL: function(){
        return getPermissionsGL();
    },
    /*holt sich alle Channel-Rollen*/
    roles: function(){
        return getRolesCh();
    },
    /*holt sich alle Channel-Berechtigungen*/
    permissions: function(){
        return getPermissionsCh();
    },
    /*Überprüft ob die Berechtigung der Rolle zugewiesen wurde*/
    permissionActive:function(permission) {
        if(Permissions.findOne({$and: [{_id: permission}, {"roles": this._id }]})){
            return "checked"
        }
    }
});

/*Handling der Events, die an ein Element gebunden werden*/
Template.permissions.events({
    /*aktualisiert die Berechtigung bzgl. Rolle durch Klick auf das HTML-Element*/
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
    /*Handling für das Routen (Zurück zur Chatinstanz)*/
    'click .backLink': function(e,t){
        FlowRouter.go('channel', { team: Session.get("team"), channel: 'general' });
    }
});