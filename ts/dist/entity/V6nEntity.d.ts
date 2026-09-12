import { UuidGeneratorApi2EntityBase } from '../UuidGeneratorApi2EntityBase';
import type { UuidGeneratorApi2SDK } from '../UuidGeneratorApi2SDK';
import type { Control } from '../types';
import type { V6n, V6nLoadMatch, V6nListMatch } from '../UuidGeneratorApi2Types';
declare class V6nEntity extends UuidGeneratorApi2EntityBase<V6n> {
    constructor(client: UuidGeneratorApi2SDK, entopts: any);
    make(this: V6nEntity): V6nEntity;
    load(this: any, reqmatch?: V6nLoadMatch, ctrl?: Control): Promise<V6nEntity>;
    list(this: any, reqmatch?: V6nListMatch, ctrl?: Control): Promise<V6nEntity[]>;
}
export { V6nEntity };
