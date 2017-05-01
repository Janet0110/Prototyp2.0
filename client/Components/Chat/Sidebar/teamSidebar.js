Template.teamSidebar.onCreated(function(){
   this.newUser = new ReactiveVar(false);
});


Template.teamSidebar.events({
   'click .team_tools': function(e, tmpl){
       Meteor.call('hasPermission', Perm.INVITE_USER, currentTeamId(), User.id(), function(err, hasPermission){
           if(hasPermission){
               tmpl.newUser.set(true);
           }else{
               Materialize.toast('Not allowed', 4000, "error");
           }
       });
   },
   'click .permission': function(e, tmpl){
         FlowRouter.go('permissions', { team: Session.get('team') });
   },
   'click .userRoles': function(e, tmpl){
      FlowRouter.go('userRoles', { team: Session.get('team') });
   }

});

Template.teamSidebar.helpers({
   newUser: function(){
      return Template.instance().newUser.get();
   },
   users: function() {
      var users = [];
      var usersId = Teams.find({}, {fields: {"users": 1}}).fetch()[0].users
      for(var i = 0; i < usersId.length; i++){
         var user = Meteor.users.find(usersId[i].user).fetch()[0];
         users.push({
            name: user.username
         });
      }
      return users;
   }

});