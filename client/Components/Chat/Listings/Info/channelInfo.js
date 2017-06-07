/*Wird Ausgeführt, wenn Template erstellt wird*/
Template.channelInfo.onCreated(function(){
    /*ChannelSidebar wird beim Erstellen des Templates ausgeblendet*/
    Session.set("channelSidebar", false);
});
/*Handling der Events, die an ein Element gebunden werden*/
Template.channelInfo.events({
    /*lässt ChannelSidebar anzeigen*/
    'click .fixed-action-btn': function(){
        Session.set("channelSidebar", !Session.get("channelSidebar"));
    }
});