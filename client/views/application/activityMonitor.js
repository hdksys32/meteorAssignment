
varLimit= new ReactiveVar(10);
varPerPage=new ReactiveVar(10)
varTotalRecord = new ReactiveVar(0);
var getCurrentDateOfEvent = new ReactiveVar('')

Template.tmpActivityMonitor.created=function(){
    Session.set("query",{});
    Tracker.autorun(function() {
        Meteor.call("getTotalRecords",function(err,response){
            if(!err && response)
                varTotalRecord.set(response);
        })
        Meteor.subscribe("getActivity", Session.get("query"),varLimit.get());
    });
}

Template.tmpActivityMonitor.rendered=function() {
    var element = $('.eventMain');
    element.scroll(function() {
        if(hasMoreData()) {
            if ($(this).scrollTop() > 0 && ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight)) {
                loadMoreEvents();
            }
        }
        getDateForCurrentEvent();
    });

    element.slimScroll({
        size: '5px',
        height: '400',
        color: '#3757ff',
        railVisible: true,
        alwaysVisible: true,
        distance: '20px',
        railColor: '#eaf4ff',
        railOpacity: 0.7
    });
}

Template.tmpActivityMonitor.helpers({
    getEvents:function () {
        return events.find();
    },
    getTemplate:function (type){
        if(type=="ota_event")
            return  'tempOTAEvents';
        if(type=="water_use")
            return  'tempWaterUseEvents';
        if(type=="time_limit")
            return  'tempTimeLimitEvents';
    },
    getCurrentDateOfScrolledEvent:function(){
        return getCurrentDateOfEvent.get();
    },
    getTotalRecord:function(){
        return varTotalRecord.get();
    }
})

Template.tmpActivityMonitor.events({
    'change #ddlEventType':function(e){
        debugger;
        e.preventDefault();
        var currentTarget = e.currentTarget;
        if(currentTarget.selectedIndex > 0) {
            var value = currentTarget.options[currentTarget.selectedIndex].value;
            var query = {'event_type': value}
            Session.set("query", query);
        }
        else
            Session.set("query", {});
        return false;
    }
})

function loadMoreEvents(){
    var currentLimit =0;
    currentLimit= (varLimit.get() + varPerPage.get());
    varLimit.set(currentLimit);
}

function hasMoreData(){
    return varTotalRecord.get() > varLimit.get();
}

Template.tempOTAEvents.created=function(){
    if(this.data && this.data.success)
        this.flagOTAUpdateSucceed =isOTAUpdateSucceed(this.data.success);
}

Template.tempOTAEvents.rendered=function(){
    if(getCurrentDateOfEvent.get()=="") {
        var currentDateElement = $(".elementRequired");
        if (currentDateElement.length > 0)
            getCurrentDateOfEvent.set($(currentDateElement[0]).find(".elementFocused").text());
    }
}

Template.tempOTAEvents.helpers({
    isOTAUpdateSucceed:function (isSucceed) {
        return Template.instance().flagOTAUpdateSucceed  ? "OTA Update succeed" : "OTA Update failed"
    },
    classOTAUpdateSucceed:function (isSucceed) {
        return Template.instance().flagOTAUpdateSucceed  ? "success" : "fail"
    }
})

Template.tempWaterUseEvents.created=function(){
    if(this.data && this.data.ts) {
        this.timeStamp =  this.data.ts.t1 - this.data.ts.t0;
    }
}

Template.tempWaterUseEvents.rendered=function(){
    if(getCurrentDateOfEvent.get()=="") {
        var currentDateElement = $(".elementRequired");
        if (currentDateElement.length > 0)
            getCurrentDateOfEvent.set($(currentDateElement[0]).find(".elementFocused").text());
    }
}

Template.tempWaterUseEvents.helpers({
    getDifference:function (isSucceed) {
        return Template.instance().timeStamp;
    }
})

Template.tempTimeLimitEvents.rendered=function(){
    if(getCurrentDateOfEvent.get()=="") {
        var currentDateElement = $(".elementRequired");
        if (currentDateElement.length > 0)
            getCurrentDateOfEvent.set($(currentDateElement[0]).find(".elementFocused").text());
    }
}


function isOTAUpdateSucceed (isSucceed){
    return isSucceed;
}

getDateForCurrentEvent =function(){
    $(".elementRequired").each(function(){
        var pos =$(this).position()
        var top =pos.top;
        if(top > 0 && top < 70)
            getCurrentDateOfEvent.set($(this).find(".elementFocused").text());

    })
}
getFormattedDate=function(date){
    var today = new Date();
    if(moment(today).format("L") ==  moment(date).format("L"))
        return  moment(date).startOf('hour').fromNow();
    else
        return moment(date).format('L') + "," + moment(date).format('LT');
}

getOnlyDateForScrolledElement=function(date){
    return date && moment(date).format('L') || "-" ;
}
UI.registerHelper('getDate', getFormattedDate);
UI.registerHelper('getOnlyDate', getOnlyDateForScrolledElement);
