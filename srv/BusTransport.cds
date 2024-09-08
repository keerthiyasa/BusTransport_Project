

using {com.transportsystem.bus as transport} from '../db/schema';

service Transport {
    entity Files as projection on transport.Files
    action DownloadTemplate() returns String;
    action UploadData() returns Boolean;
    action fileUpload(mimeType: String, fileName: String, fileContent: String, fileExtension: String) returns Boolean;
    action downloadFile() returns {
        fileContent: String;
        fileName: String;
        mimeType: String;
        fileExtension: String;
    };
    entity Bus as projection on transport.Bus
}

annotate Transport.Bus with @odata.draft.enabled;
//annotate Transport.Files with @odata.draft.enabled;


// Annotations for Bus entity
annotate Transport.Bus with @(
    UI.LineItem: [
        
        {
            $Type: 'UI.DataField',
            Value: bus_id
        },
        {
            $Type: 'UI.DataField',
            Value: bustype
        },
        {
            $Type: 'UI.DataField',
            Value: busstops
        },
        {
            $Type: 'UI.DataField',
            Value: busroutes
        },
        {
            $Type: 'UI.DataField',
            Value: buscap
        },
        {
            $Type: 'UI.DataField',
            Value: busop
        }
    ]
);

annotate Transport.Bus with @(
    UI.FieldGroup #BusTransport : {
        $Type: 'UI.FieldGroupType',
        Data: [
            
            {
                $Type: 'UI.DataField',
                Value: bus_id
            },
            {
                $Type: 'UI.DataField',
                Value: bustype
            },
            {
                $Type: 'UI.DataField',
                Value: busstops
            },
            {
                $Type: 'UI.DataField',
                Value: busroutes
            },
            {
                $Type: 'UI.DataField',
                Value: buscap
            },
            {
                $Type: 'UI.DataField',
                Value: busop
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'GeneratedFacet1',
            Label: 'General Information',
            Target: '@UI.FieldGroup#BusTransport'
        },
        /*{
            $Type: 'UI.ReferenceFacet',
            ID: 'relatedFilesFacet',
            Label: 'Related Files',
            Target:'Files/@UI.LineItem',
            
        }*/
    ]
);




annotate Transport.Files with @(
    UI.LineItem: [
        {
            Label: 'Product ID',
            Value: fid_ID

        },
        {
            $Type: 'UI.DataField',
            Value: fileName,
            Label: 'File Name'
        },
        {
            $Type: 'UI.DataField',
            Value: mediaType,
            Label: 'Media Type'
        },
        {
            $Type: 'UI.DataField',
            Value: size,
            Label: 'File Size'
        },
        {
            $Type: 'UI.DataField',
            Value: url,
            Label: 'URL'
        }
    ],
    UI.FieldGroup #FileDetails: {
        $Type: 'UI.FieldGroupType',
        Data: [
            {
            Label: 'Files ID',
            Value: fid_ID
        },
            {
                $Type: 'UI.DataField',
                Value: fileName,
                Label: 'File Name'
            },
            {
                $Type: 'UI.DataField',
                Value: mediaType,
                Label: 'Media Type'
            },
            {
                $Type: 'UI.DataField',
                Value: size,
                Label: 'File Size'
            },
            {
                $Type: 'UI.DataField',
                Value: url,
                Label: 'URL'
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'relatedFilesFacet',
            Label: 'Related Files',
            Target: '@UI.FieldGroup#FileDetails',
            
        }
    ]
);
