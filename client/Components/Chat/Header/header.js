Template.header.helpers({
    team: function () {
        return Session.get("team");
    },
    channel: function(){
        return Session.get("channel");
    },
    name: function(){
        return User.get().username;
    },
    accountList: function(){
        return [
            {menuName: "Logout", id:"logoutBtn"},
            {menuName: "Change password", id: "changePwdBtn"}];
    },
    admin: function(){
        return Session.get("content") !== 'admin'
    }
});

Template.header.events({
   'click #logoutBtn': function(evt, tmpl){
       Meteor.logout(function(err) {
           if(!err){
               FlowRouter.go("/")
           }else{
               Materialize.toast(err.message, 4000, "error");
           }
       });
   }

});