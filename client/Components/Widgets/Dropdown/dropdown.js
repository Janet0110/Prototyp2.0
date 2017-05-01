Template.dropdown.onCreated(function(){
    this.show = new ReactiveVar(false);
});

Template.dropdown.helpers({
   state: function(){
       return Template.instance().show.get();
   }
});

Template.dropdown.events({
    'click .popup-link-button': function(e, tmpl){
        tmpl.show.set(!tmpl.show.get());
    }
});
