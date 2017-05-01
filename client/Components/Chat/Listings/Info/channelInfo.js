Template.channelInfo.onCreated(function(){
    Session.set("channelSidebar", false);
});

Template.channelInfo.events({
    'click .fixed-action-btn': function(){
        Session.set("channelSidebar", !Session.get("channelSidebar"));
    }
});