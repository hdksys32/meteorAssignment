Meteor.publish('getActivity', function(query,limit,skip) {
    return events.find(query,{limit:limit ,skip: skip});
});