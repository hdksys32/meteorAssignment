# meteorAssignment
Meteor Developer Interview Assignment
M. Solters, Driblet Labs
September 2016

Purpose
This is a short assignment designed to demonstrate the applicant’s (a) GitHub, (b) LESS, (c) ES6 and (d) Meteor skills.  Should not take more than a few hours.  This assignment is front-end intensive.

It should be a Meteor app, delivered as a GitHub repository (public is fine).  The Meteor app should look like the reference design on the last page, and behave as stipulated in the “Requirements” section.
Requirements
The goal of this assignment is to implement a small feature which is actually a subset of the Driblet web app already in use, the “Activity Monitor.”  See last page for design reference.

The idea is that you have a collection of events, of which there are three types (water_use, ota_event, and time_limit).  These events should appear in a vertical column, with a bit of information specific to each type displayed accordingly (see reference design).  Example MongoDB schema for each event type is provided later in this document.


Features
Infinite scrolling (default number of events loaded is 10; more are loaded when the user gets to the bottom of the scroll area)
Custom scrollbars (not all browsers will support this, that’s fine)
Filter events by event_type using dropdown on bottom
Date indicator (see bottom) updates as user scrolls through events
Water Usage Events
Display water used
Display length of event (t1-t0)
Display water temperature
Display starting timestamp (ts.t0)
Time Limit Events
Display length of time that triggered event
Display formatted phone number that was messaged
Display starting timestamp (ts)
OTA Events
Display success/failure
Change icons
Change output message
Display starting timestamp (ts)
Events always in descending chronological order (newest first)
Example Data Schema
In order to implement the “infinite scrolling” you are expected to spoof your own data as per the following schema examples.  Please randomize timestamps!

First, you may consider there to be three event types in this example:
ota_event
water_use
time_limit

For each of these three event types, an example schema is provided below.
ota_event
{
	_id: [MongoDB ID object],
	event_type: “ota_event”,
	ts: [JavaScript new Date() object]
	success: true || false
}
water_use
{
	_id: [MongoDB ID object],
	event_type: “water_use”,
	ts: {
t0: [JavaScript new Date() object],
t1: [JavaScript new Date() object] // note: t1 > t0 always!
},
	volume: (float >= 0.0), // this is the amount of water used
	temp: (float >= 0.0) // water temperature in celsius
}
Note that, for the water_use events, the length of the event (e.g. 20 sec / 1 min / etc.) as displayed in the UI is computed from ts.t1 - ts.t0. Water .volume and .temp may be referenced directly.
time_limit
{
	_id: [MongoDB ID object],
	event_type: “time_limit”,
	ts: [JavaScript new Date() object],
	limit: (int >= 0), // number of seconds of water flow which trigger the event
	phone_num: “1112223333” // phone number that was contacted
}


Meteor Guidelines and Grading Criteria
Applicants who use ECMAScript 2015 will be preferred
Please use the Blaze templating engine (as opposed to React, Angular, etc.)
Consider that this project would be but one template in a much larger application.  Consider data sub/pub scopes & patterns accordingly.
You can do whatever you want on the backend as far as publications go; you can store all events in the same collection if you want.  But please do not use insecure package; use actual pub/sub patterns, even if they are trivial.
Style Guidelines and Grading Criteria
We ask that you use LESS.  Given the small scope of this project vanilla CSS is acceptable, but we use LESS intensively with our current projects; we will prefer applicants that demonstrate a knowledge of the tool.
Do not use any third-party CSS framework - no bootstrap, no materialize, et cetera.  Part of the purpose of this assignment is to test custom CSS proficiency.
We will be grading the CSS by considering how “abstractable” it is -- are the classes used for e.g. circular icons and badge geometries easily extensible to different content?  What happens when the font size changes?
Icons:  We really don’t care if you use the icons pictured, as long as the ones you pick are properly placed, sized, and can be easily replaced with a different web font or asset.  You may use FontAwesome or Google’s Material Icon web fonts as a placeholder for the icons in the reference design.  We are also forgiving regarding exact font face, sizes and weights, provided it looks reasonably close to the reference design!

GitHub Guidelines and Grading Criteria
Driblet Labs makes heavy use of GitHub for version control and development logistics.  GitHub skills are very important for potential new hires.  Therefore, this assignment should be submitted as a public GitHub repository.

Applicants will be considered based on the clarity and granularity of their commits.  We expect the finished project to comprise a historical sequence of commits, demonstrating the work as it was done, instead of one lump “upload” once complete.

Finally, Driblet Labs makes heavy use of GitHub’s built-in issue tracker to assign and monitor development tasks.  For this assignment, the applicant should create one issue for each of the above listed “Features” (page 1).  As each feature is completed in the source code, we will be looking to see the applicant’s use of GitHub’s close-by-commit keywords in their associated commit history.  

For example, once the source has been implemented for “infinite scrolling,” we expect to find a commit comprising that source, with a commit message that closes that issue (e.g. “closes #XX”).  This is an important skill because it allows us to review milestone progress as a team, on a file-by-file basis.

