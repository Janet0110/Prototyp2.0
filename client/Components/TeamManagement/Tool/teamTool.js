/*setzt beim Erstellen des Templates die Session "teamSidebar" auf false, damit die Sidebar versteckt wirdn*/
Template.teamTool.onCreated(function(){
    Session.set("teamSidebar", false);
});
/*Handling der Events, die an ein Element gebunden werden*/
Template.teamTool.events({
    /*öffnet oder schließt die TeamSidebar*/
    'click .fixed-action-btn': function(){
        Session.set("teamSidebar", !Session.get("teamSidebar"));
    }
});