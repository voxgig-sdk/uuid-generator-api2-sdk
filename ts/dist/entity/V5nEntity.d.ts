import { UuidGeneratorApi2EntityBase } from '../UuidGeneratorApi2EntityBase';
import type { UuidGeneratorApi2SDK } from '../UuidGeneratorApi2SDK';
import type { Control } from '../types';
import type { V5n, V5nLoadMatch, V5nListMatch } from '../UuidGeneratorApi2Types';
declare class V5nEntity extends UuidGeneratorApi2EntityBase<V5n> {
    constructor(client: UuidGeneratorApi2SDK, entopts: any);
    make(this: V5nEntity): V5nEntity;
    load(this: any, reqmatch?: V5nLoadMatch, ctrl?: Control): Promise<V5nEntity>;
    list(this: any, reqmatch?: V5nListMatch, ctrl?: Control): Promise<V5nEntity[]>;
}
export { V5nEntity };
