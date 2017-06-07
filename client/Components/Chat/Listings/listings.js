/*Deklarieren und Initialisieren von Varibalen bei der Erstellung des Templates*/
Template.listings.onCreated(function(){
    var self = this;
    /*für TeamSidebar*/
    this.sidebarShow = new ReactiveVar(false);
    this.show = new ReactiveVar(false);

    Tracker.autorun(function () {
        var sidebar = Session.get('teamSidebar');
        self.sidebarShow.set(sidebar);
    });
});
/*Helpers für die Verwendung im Template*/
Template.listings.helpers({
    /*Holt sich alle Channels im Team für das Anzeigen der Channels in der Liste*/
    channels: function(){
        return Channels.find({});
    },

    state: function(){
        return Template.instance().show.get();
    },
    /*Holt sich den Wert von der Instanz für das Anzeigen der TeamSidebar-Komponente*/
    sidebar: function(){
        return Template.instance().sidebarShow.get();
    }
});

/*Handling der Events, die an ein Element gebunden werden*/
Template.listings.events({
    /*Click-Event für das Öffnen eines Dialogs, um einen Channel zu erstellen*/
    'click .listings_tools': function(e, tmpl){
        Meteor.call('hasPermission', Perm.CREATE_CHANNEL, currentTeamId(), User.id(), function(err, hasPermission){
           if(hasPermission){
               tmpl.show.set(!tmpl.show.get());
           }else{
               Materialize.toast('Not allowed', 4000, "error");
           }
        });
    }
});


