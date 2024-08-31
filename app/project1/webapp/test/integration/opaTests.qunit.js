sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/BusList',
		'project1/test/integration/pages/BusObjectPage'
    ],
    function(JourneyRunner, opaJourney, BusList, BusObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBusList: BusList,
					onTheBusObjectPage: BusObjectPage
                }
            },
            opaJourney.run
        );
    }
);