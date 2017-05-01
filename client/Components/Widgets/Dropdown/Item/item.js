Template.item.events({
    'click .popup-button': function(e, tmpl){
        hideDropDown();
    }
});


var hideDropDown = function(){
    var parentView = Blaze.currentView.parentView.parentView.parentView.parentView;
    console.log(parentView);
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.show.set(false);
};