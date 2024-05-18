using {Transport.Bus as Bus} from './BusTransport';

annotate Bus with @(
    UI.LineItem: [
        {
            $Type:'UI.DataField',
            Value: busno
        },
         {
            $Type:'UI.DataField',
            Value: bustype
        },
         {
            $Type:'UI.DataField',
            Value: busstops
        },
         {
            $Type:'UI.DataField',
            Value: busroutes
        },
        {
            $Type:'UI.DataField',
            Value: timings
        },
        {
            $Type:'UI.DataField',
            Value: buscap
        },
        {
            $Type:'UI.DataField',
            Value: busop
        },
        
    ]
);

annotate Bus with @(
    UI.FieldGroup #BusTransport : {
        $Type : 'UI.FieldGroupType',
        Data : [
        {
            $Type:'UI.DataField',
            Value: busno
        },
         {
            $Type:'UI.DataField',
            Value: bustype
        },
         {
            $Type:'UI.DataField',
            Value: busstops
        },
        {
            $Type:'UI.DataField',
            Value: busroutes
        },
        {
            $Type:'UI.DataField',
            Value: timings
        },
        {
            $Type:'UI.DataField',
            Value: buscap
        },
        {
            $Type:'UI.DataField',
            Value: busop
        },
    ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#BusTransport',
        },
    ],
    
);
