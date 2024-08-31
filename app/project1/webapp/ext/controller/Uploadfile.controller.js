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
        },
		onFileChange: function (oEvent) {
			// Read file
			var file = oEvent.getParameter("files")[0];
			if (file === undefined) {
				return;
			}
			fileType = file.type;  //mimetype or file type
			fileName = file.name;
			//Instantiate JavaScript FileReader API
			var fileReader = new FileReader();
			//Read file content using JavaScript FileReader API
			var readFile = function onReadFile(file) {
				return new Promise(function (resolve) {
					fileReader.onload = function (loadEvent) {
						resolve(loadEvent.target.result.match(/,(.*)$/)[1]);
					};
					fileReader.readAsDataURL(file);
				});
			};

			new Action(readFile(file)).executeWithBusyIndicator().then(function (result) {
				fileContent = result;
			})
		},
		onUploadPress: function (oEvent) {
			var oResourceBundle = this.base.getView().getModel("i18n").getResourceBundle();
			//check file has been entered
			if (fileContent === undefined || fileContent === "") {
				MessageToast.show(oResourceBundle.getText("uploadFileErrMsg"));
				return;
			}

			var oModel = this.base.getExtensionAPI().getModel();

			var oOperation = oModel.bindContext("/VendorEmail" + Constants.serviceNamespace + "fileUpload(...)");

			var fnSuccess = function () {
				oModel.refresh();
				MessageToast.show(oResourceBundle.getText("uploadFileSuccMsg"));
				oDialog.close();
				//Clear the file name from file uploader
				sap.ui.getCore().byId("idFileUpload").clear();
				oDialog.destroy();
				fileContent = undefined;
			}.bind(this);

			var fnError = function (oError) {
				this.base.editFlow.securedExecution(
					function () {
						Messaging.addMessages(
							new sap.ui.core.message.Message({
								message: oError.message,
								target: "",
								persistent: true,
								type: sap.ui.core.MessageType.Error,
								code: oError.error.code
							})
						);
						var aErrorDetail = oError.error.details;
						aErrorDetail.forEach((error) => {
							Messaging.addMessages(
								new sap.ui.core.message.Message({
									message: error.message,
									target: "",
									persistent: true,
									type: sap.ui.core.MessageType.Error,
									code: error.code
								})
							);
						})
					}
				);
				oDialog.close();
				//Clear the file name from file uploader
				sap.ui.getCore().byId("idFileUpload").clear();
				oDialog.destroy();
				fileContent = undefined;
			}.bind(this);

			oOperation.setParameter("mimeType", fileType);
			oOperation.setParameter("fileName", fileName);
			oOperation.setParameter("fileContent", fileContent);
			oOperation.setParameter("process", sProcess);
			oOperation.execute().then(fnSuccess, fnError);
		},
		onTempDownload: function (oEvent) {
			var oModel = this.base.getExtensionAPI().getModel(),
				oResourceBundle = this.base.getView().getModel("i18n").getResourceBundle();

			var oModel = this.base.getExtensionAPI().getModel(),
				oResourceBundle = this.base.getView().getModel("i18n").getResourceBundle();

			var oOperation = oModel.bindContext("/VendorEmail" + Constants.serviceNamespace + "downloadFile(...)");

			//Success function to display success messages from OData Operation
			var fnSuccess = function () {
				var oResults = oOperation.getBoundContext().getObject();

				var aUint8Array = Uint8Array.from(atob(oResults.fileContent), c => c.charCodeAt(0)),
					oblob = new Blob([aUint8Array], { type: oResults.mimeType });

				File.save(oblob, oResults.fileName, oResults.fileExtension, oResults.mimeType);
				MessageToast.show(oResourceBundle.getText("downloadTempSuccMsg"));
			}.bind(this);

			//Error function to display error messages from OData Operation
			var fnError = function () {
				this.base.editFlow.securedExecution(
					function () {
						Messaging.addMessages(
							new sap.ui.core.message.Message({
								message: oError.message,
								target: "",
								persistent: true,
								type: sap.ui.core.MessageType.Error,
								code: oError.error.code
							})
						);
						var aErrorDetail = oError.error.details;
						aErrorDetail.forEach((error) => {
							Messaging.addMessages(
								new sap.ui.core.message.Message({
									message: error.message,
									target: "",
									persistent: true,
									type: sap.ui.core.MessageType.Error,
									code: error.code
								})
							);
						})
					}
				);
			}.bind(this);

			// Execute OData V4 operation i.e a static function 'downloadFile' to download the excel template
			oOperation.execute().then(fnSuccess, fnError)
                        // From UI5 version 1.123.0 onwards use invoke function
			//oOperation.invoke().then(fnSuccess, fnError);
		}
    });
});
