
Meteor.methods({
    getTotalRecords: function() {
       return events.find({}).count();
    }
});


