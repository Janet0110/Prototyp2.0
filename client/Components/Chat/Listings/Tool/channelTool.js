/*Beim Erstellen des Templates wird reaktive Variablen initialisiert*/
Template.channelTool.onCreated(function(){
    this.dialog = new ReactiveVar(false);
    this.dialogAddUser= new ReactiveVar(false);
});
/*Helpers für die Verwendung im Template*/
Template.channelTool.helpers({
    /*holt sich den Wert der in die reaktive Variable gespeichert wurde, für das Anzeigen des Dialogs */
    dialogState: function(){
        return Template.instance().dialog.get();
    },
    /*holt sich den Wert der in die reaktive Variable gespeichert wurde, für das Anzeigen des Dialogs, um einen Benutzer in den Channel einzuladen */
    dialogAddUserState: function(){
        return Template.instance().dialogAddUser.get();
    },
    /*Dropdown-Liste für die Menü-Unterpunkte*/
    channelList: function(){
        return [
            {menuName: "Remove Channel", id: "rmvChannelBtn"},
            {menuName: "Add user", id: "addUserBtn"},
            {menuName: 'Toast', id: "toast"}
        ]
    }
});
/*Handling der Events, die an ein Element gebunden werden*/
Template.channelTool.events({
    /*Löscht einen Channel*/
    'click #rmvChannelBtn': function(evt, tmpl){
        Meteor.call('hasChannelPermission', Perm.DELETE_CHANNEL, currentTeamId(), User.id(), currentChannelId(), function(err, hasPermission){
            if(hasPermission){
                tmpl.dialog.set(true);
            }else{
                Materialize.toast('Not allowed', 4000, "error");
            }
        });
    },
    /*Fügt einen Benutzer dem Channel hinzu*/
    'click #addUserBtn': function(evt, tmpl){
        Meteor.call('hasChannelPermission', Perm.ADD_USER_TO_CHANNEL, currentTeamId(), User.id(), currentChannelId(), function(err, hasPermission){
            if(hasPermission){
                tmpl.dialogAddUser.set(true);
            }else{
                Materialize.toast('Not allowed', 4000, "error");
            }
        });
    },
    /*Evaluierungstest*/
    'click #toast': function(evt, tmpl){
          Materialize.toast('Test done', 4000, "success");
    }
});