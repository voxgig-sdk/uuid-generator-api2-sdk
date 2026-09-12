import { UuidGeneratorApi2EntityBase } from '../UuidGeneratorApi2EntityBase';
import type { UuidGeneratorApi2SDK } from '../UuidGeneratorApi2SDK';
import type { Control } from '../types';
import type { V3n, V3nLoadMatch, V3nListMatch } from '../UuidGeneratorApi2Types';
declare class V3nEntity extends UuidGeneratorApi2EntityBase<V3n> {
    constructor(client: UuidGeneratorApi2SDK, entopts: any);
    make(this: V3nEntity): V3nEntity;
    load(this: any, reqmatch?: V3nLoadMatch, ctrl?: Control): Promise<V3nEntity>;
    list(this: any, reqmatch?: V3nListMatch, ctrl?: Control): Promise<V3nEntity[]>;
}
export { V3nEntity };
