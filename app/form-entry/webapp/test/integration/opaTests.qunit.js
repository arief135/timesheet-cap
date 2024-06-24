sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'formentry/test/integration/FirstJourney',
		'formentry/test/integration/pages/TimesheetEntryObjectPage'
    ],
    function(JourneyRunner, opaJourney, TimesheetEntryObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('formentry') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTimesheetEntryObjectPage: TimesheetEntryObjectPage
                }
            },
            opaJourney.run
        );
    }
);