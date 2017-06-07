/*Handling der Events, die an ein Element gebunden werden*/
Template.item.events({
    /*schließt das Dropdown-Menü*/
    'click .popup-button': function(e, tmpl){
        hideDropDown();
    }
});

/*Funktion für das Schließen des Dropdown-Menüs*/
var hideDropDown = function(){
    var parentView = Blaze.currentView.parentView.parentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.show.set(false);
};