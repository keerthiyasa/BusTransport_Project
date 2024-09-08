
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
'use strict';

    return  {
        
        // This is the function bound to the button
        bus: async function (oEvent) {
            MessageToast.show("Button was pressed");

           
        }
    }
});