Template.dropdown.onCreated(function(){
    Session.set("teamSidebar", false);
});

Template.teamTool.events({
    'click .fixed-action-btn': function(){
        Session.set("teamSidebar", !Session.get("teamSidebar"));
       // console.log("Session TeamSidebar: " + Session.get("teamSidebar"));
    }
});