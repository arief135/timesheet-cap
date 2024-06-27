sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'lrop/test/integration/FirstJourney',
		'lrop/test/integration/pages/TimesheetEntryList',
		'lrop/test/integration/pages/TimesheetEntryObjectPage'
    ],
    function(JourneyRunner, opaJourney, TimesheetEntryList, TimesheetEntryObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('lrop') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTimesheetEntryList: TimesheetEntryList,
					onTheTimesheetEntryObjectPage: TimesheetEntryObjectPage
                }
            },
            opaJourney.run
        );
    }
);