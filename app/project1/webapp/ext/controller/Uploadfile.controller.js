sap.ui.define(['sap/ui/core/mvc/ControllerExtension', 'sap/m/MessageToast'], function (ControllerExtension, MessageToast) {
    'use strict';

    var Constants = {
        fragmentName: 'project1.ext.fragment.uploadFileDialog' // Replace with the actual path to your XML fragment
    };

    return ControllerExtension.extend('project1.ext.controller.Uploadfile', {
        override: {
            onInit: function () {
                var oModel = this.base.getExtensionAPI().getModel();
            }
        },
        uploadExcel: function (oEvent) {
            this.base.getExtensionAPI().loadFragment({
                name: Constants.fragmentName,
                type: "XML",
                controller: this
            }).then(function (oDialogResult) {
                oDialogResult.open();
            }).catch(function (error) {
                MessageToast.show("Failed to load the fragment: " + error.message);
            });
        }
    });
});
