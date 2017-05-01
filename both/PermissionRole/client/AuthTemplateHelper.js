Template.registerHelper('isAdmin', function() {
    if(Meteor.users.findOne({_id: Meteor.userId(), 'teams': {$elemMatch: {id: currentTeamId(), role: {$eq: Rol.ADMIN}}}})){
            return true;
    }
});

