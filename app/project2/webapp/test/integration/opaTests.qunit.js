sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project2/test/integration/FirstJourney',
		'project2/test/integration/pages/BusList',
		'project2/test/integration/pages/BusObjectPage'
    ],
    function(JourneyRunner, opaJourney, BusList, BusObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project2') + '/index.html'
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