namespace com.transportsystem.bus;
using {cuid, managed} from '@sap/cds/common';

entity Bus: managed, cuid {
    @title:'Bus_Number'
    busno: Integer;
    @title: 'Bus_Type'
    bustype: String(40);
    @title: 'Busstops'
    busstops: String(40);
    @title: 'Routes'
    busroutes: String(40);
    @title: 'Timings'
    timings: Integer;
    @title: 'Bus_Capability'
    buscap: Integer;
    @title: 'Bus_operator'
    busop: String(15);
}

