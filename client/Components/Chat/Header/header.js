/*Helpers für die Verwendung im Template*/
Template.header.helpers({
    /*Holt sich den Wert, der in der Session "team" gespeichert wurde, für das Anzeigen im Header*/
    team: function () {
        return Session.get("team");
    },
    /*Holt sich aktuellen Channelnamen von der Session*/
    channel: function(){
        return Session.get("channel");
    },
    /*Holt sich aktuellen Benutzernamen für das Dropdown-Menü*/
    name: function(){
        return User.get().username;
    },
    /*Legt Menü-Unterpunkte für das Dropdown-Menü an*/
    accountList: function(){
        return [
            {menuName: "Logout", id:"logoutBtn"},
            {menuName: "Change password", id: "changePwdBtn"}];
    },
    /*Umständliche Art, um den Headerbereich für die Rollen- und Berechtigungs-Komponente anzupassen*/
    admin: function(){
        return Session.get("content") !== 'admin'
    }
});

/*Handling der Events, die an ein Element gebunden werden*/
Template.header.events({
    /*Loggt den Benutzer aus*/
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