Template.listings.onCreated(function(){
    var self = this;
    this.sidebarShow = new ReactiveVar(false);
    this.show = new ReactiveVar(false);

    Tracker.autorun(function () {
        var sidebar = Session.get('teamSidebar');
        self.sidebarShow.set(sidebar);
    });
});
Template.listings.helpers({
    channels: function(){
        return Channels.find({});
    },
    state: function(){
        return Template.instance().show.get();
    },
    sidebar: function(){
        return Template.instance().sidebarShow.get();
    }
});

Template.listings.events({
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


