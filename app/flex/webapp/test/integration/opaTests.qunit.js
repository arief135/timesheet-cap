sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'flex/test/integration/FirstJourney',
		'flex/test/integration/pages/TimesheetEntryMain'
    ],
    function(JourneyRunner, opaJourney, TimesheetEntryMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('flex') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTimesheetEntryMain: TimesheetEntryMain
                }
            },
            opaJourney.run
        );
    }
);