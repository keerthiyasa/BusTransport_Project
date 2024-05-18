

using {com.transportsystem.bus as transport} from '../db/schema';

service Transport {
    entity Bus as projection on transport.Bus
}

annotate Transport.Bus with @odata.draft.enabled;
