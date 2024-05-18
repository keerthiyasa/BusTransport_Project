sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/transportsystem/bus/bus/test/integration/FirstJourney',
		'com/transportsystem/bus/bus/test/integration/pages/BusList',
		'com/transportsystem/bus/bus/test/integration/pages/BusObjectPage'
    ],
    function(JourneyRunner, opaJourney, BusList, BusObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/transportsystem/bus/bus') + '/index.html'
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