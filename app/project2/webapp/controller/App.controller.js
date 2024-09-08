sap.ui.define([
	"sap/m/library",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Item",
	"sap/ui/model/json/JSONModel",
	"sap/m/upload/Uploader"
], function (MobileLibrary, Controller, Item, JSONModel, Uploader) {
	"use strict";

	return Controller.extend("project2.controller.App", {
		onInit: function () {
			var sPath = sap.ui.require.toUrl("odata/v4/transport/Files"),
				oUploadSet = this.byId("UploadSet");

			this.getView().setModel(new JSONModel(sPath));

			// Modify "add file" button
			oUploadSet.getDefaultFileUploader().setButtonOnly(false);
			oUploadSet.getDefaultFileUploader().setTooltip("");
			oUploadSet.getDefaultFileUploader().setIconOnly(true);
			oUploadSet.getDefaultFileUploader().setIcon("sap-icon://attachment");
			oUploadSet.attachUploadCompleted(this.onUploadCompleted.bind(this));
		},
		
		
		
		onUploadCompleted: function(oEvent) {
			this.oItemToUpdate = null;
			this.byId("versionButton").setEnabled(false);
		}
	});
});