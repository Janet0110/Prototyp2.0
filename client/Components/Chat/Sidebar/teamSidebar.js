/*Deklarierung und Instanziierug einer reaktiven Variable*/
Template.teamSidebar.onCreated(function(){
   this.newUser = new ReactiveVar(false);
});
/*Handling der Events, die an ein Element gebunden werden*/
Template.teamSidebar.events({
    /*Öffnet das Dialogfenster, um einen neuen Benutzer einzuladen*/
   'click .team_tools': function(e, tmpl){
       Meteor.call('hasPermission', Perm.INVITE_USER, currentTeamId(), User.id(), function(err, hasPermission){
           if(hasPermission){
               tmpl.newUser.set(true);
           }else{
               Materialize.toast('Not allowed', 4000, "error");
           }
       });
   },
    /*Routing zur Permissions-Komponente*/
   'click .permission': function(e, tmpl){
         FlowRouter.go('permissions', { team: Session.get('team') });
   },
    /*Routing zur UserRoles-Komponente*/
   'click .userRoles': function(e, tmpl){
      FlowRouter.go('userRoles', { team: Session.get('team') });
   }

});
/*Helpers für die Verwendung im Template*/
Template.teamSidebar.helpers({
    /*holt sich den Wert aus der reakiven Variable, für das Anzeige des Dialogs, um einen neuen Benutzer hinzuzufügen*/
   newUser: function(){
      return Template.instance().newUser.get();
   },
    /*holt sich alle Benutzer des Teams, für die Anzeige*/
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