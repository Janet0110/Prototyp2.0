/*globaler Helper für die Abfrage, ob Benutzer Admin im aktuellen Team ist*/
Template.registerHelper('isAdmin', function() {
    if(Meteor.users.findOne({_id: Meteor.userId(), 'teams': {$elemMatch: {id: currentTeamId(), role: {$eq: Rol.ADMIN}}}})){
            return true;
    }
});

