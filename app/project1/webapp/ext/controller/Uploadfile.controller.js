sap.ui.define([
    'sap/ui/core/mvc/ControllerExtension', 
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/odata/v4/ODataModel'
], function (ControllerExtension, MessageToast, Fragment, ODataModel) {
    'use strict';
 
    var Constants = {
        fragmentName: 'project1.ext.fragment.uploadFileDialog', // Replace with the actual path to your XML fragment
        serviceNamespace: "com.transportsystem.bus"
    };

    return ControllerExtension.extend('project1.ext.controller.Uploadfile', {
        override: {
            onInit: function () {
                // Ensure dialog reference is correctly assigned
                this.oDialog = this.byId("idFileDialog");
                if (!this.oDialog) {
                    console.warn("FileUpload dialog not found in onInit.");
                }
                
            }
        },
        

        
        uploadExcel: function (oEvent) {
            var that = this;
            Fragment.load({
                name: Constants.fragmentName,
                controller: this
            }).then(function (oDialog) {
                that.oDialog = oDialog;
                that.getView().addDependent(that.oDialog);
                that.oDialog.open();
            }).catch(function (error) {
                MessageToast.show("Failed to load the fragment: " + error.message);
            });
        },
        onCancelPress: function () {
            var oDialog = this.oDialog || sap.ui.getCore().byId("idFileDialog");

            if (oDialog) {
                oDialog.close();
            } else {
                console.error("Dialog not found.");
            }
        },
        onFileChange: function (oEvent) {
            var file = oEvent.getParameter("files")[0];
            if (!file) {
                return;
            }
        
            this.fileType = file.type;  
            this.fileName = file.name;  
            this.fileExtension = file.name.split('.').pop();
        
            var fileReader = new FileReader();
            
            fileReader.onload = function (loadEvent) {
                this.fileContent = loadEvent.target.result.split(",")[1];
            }.bind(this);  
        
            fileReader.readAsDataURL(file);
        },
        onUploadPress: function (oEvent) {
            var that = this;
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
        
            // Check if file content is available
            if (!this.fileContent || this.fileContent === "") {
                MessageToast.show(oResourceBundle.getText("uploadFileErrMsg"));
                return;
            }
        
            // Prepare the data for the upload
            var data = JSON.stringify({
                mimeType: this.fileType,
                fileName: this.fileName,
                fileContent: this.fileContent,
                fileExtension: this.fileExtension
            });
        
            // Perform the AJAX request to upload the file
            $.ajax({
                url: "/odata/v4/Transport/fileUpload",
                type: "POST",
                contentType: "application/json",
                data: data,
                dataType: "json",
                success: function (response) {
                    // Show success message
                    MessageToast.show(oResourceBundle.getText("fileUploadSuccessMsg"));
        
                    // Clear the file uploader and file content
                    sap.ui.getCore().byId("idFileUpload").clear();
                    that.fileContent = undefined;
        
                    // Close the FileUpload dialog if it's open
                    if (that.oDialog) {
                        that.oDialog.close();
                    } else {
                        console.warn("FileUpload dialog reference not found.");
                    }
                    
                    
                    // Refresh the List Report
                    that._refreshListReport();
                },
                error: function (xhr, status, error) {
                    // Show error message
                    var errorMessage = oResourceBundle.getText("fileUploadErrorMsg");
                    MessageToast.show(errorMessage);
        
                    console.error("Upload failed:", error);
                },
            });
        },
        
        _refreshListReport: function () {
            var oExtensionAPI = this.getView().getController().getExtensionAPI();  // Get the extension API
            if (oExtensionAPI && oExtensionAPI.refresh) {
                oExtensionAPI.refresh();  // Refresh the List Report's binding
            } else {
                console.error("Extension API not available for refreshing List Report.");
            }
        },
        
        onTempDownload: function (oEvent) {
            var wb = XLSX.utils.book_new();
            var wsData = [
                ["id", "busno", "bustype", "busstops", "busroutes", "timings","buscap","busop"] 
            ];
            var ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, "Template");
            var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "bus_template.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    });
});
