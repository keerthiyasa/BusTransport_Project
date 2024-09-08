namespace com.transportsystem.bus;

using {cuid, managed} from '@sap/cds/common';

entity Files : cuid, managed {
    key ID    : UUID;
    @title: 'File ID'
    fid   : Association to one Bus;
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;

    // Association to Bus entity
    
}

entity Bus : managed, cuid {
    key ID        : UUID;
    
    
    bus_id: Integer;
    @title: 'Bus_Type'
    bustype: String(20);
    @title: 'Busstops'
    busstops: String(20);
    @title: 'Routes_Schedules'
    busroutes: String(20);
    @title: 'Bus_Capability'
    buscap: Integer;
    @title: 'Bus_operator'
    busop: String(20);
    Files : Composition of many Files on Files.fid=$self;
    // Association to multiple Files entities
    
}

// Actions for file upload
action fileUpload(
    mimeType: String,
    fileName: String,
    fileContent: String,
    fileExtension: String
) returns Boolean;

define action UploadData() returns Boolean;
