/*Deklariert und Inititalisiert eine Variable, für das Anzeigen eines Dropdown-Menüs*/
Template.dropdown.onCreated(function(){
    this.show = new ReactiveVar(false);
});
/*Helpers für die Verwendung im Template*/
Template.dropdown.helpers({
/*holt sich den Wert, um das Dropdown-Menü anzuzeigen*/
   state: function(){
       return Template.instance().show.get();
   }
});
/*Handling der Events, die an ein Element gebunden werden*/
Template.dropdown.events({
    /*öffnet Dropdown-Menü*/
    'click .popup-link-button': function(e, tmpl){
        tmpl.show.set(!tmpl.show.get());
    }
});
