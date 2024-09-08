
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    'use strict';

    return Controller.extend("project1.controller.project1", {
        bus: async function (oEvent) {
            MessageToast.show("Button was pressed");
            // Additional logic
        }
    });
});