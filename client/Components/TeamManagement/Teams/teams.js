/*Helpers für die Verwendung im Template*/
Template.teams.helpers({
    /*holt sich die Teams, die einem Benutzer zur Verfügung stehen*/
    teams: function(){
        return Teams.find({"users.user": User.id()}).fetch()
    }
});