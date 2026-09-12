import { UuidGeneratorApi2EntityBase } from '../UuidGeneratorApi2EntityBase';
import type { UuidGeneratorApi2SDK } from '../UuidGeneratorApi2SDK';
import type { Control } from '../types';
import type { V7n, V7nLoadMatch, V7nListMatch } from '../UuidGeneratorApi2Types';
declare class V7nEntity extends UuidGeneratorApi2EntityBase<V7n> {
    constructor(client: UuidGeneratorApi2SDK, entopts: any);
    make(this: V7nEntity): V7nEntity;
    load(this: any, reqmatch?: V7nLoadMatch, ctrl?: Control): Promise<V7nEntity>;
    list(this: any, reqmatch?: V7nListMatch, ctrl?: Control): Promise<V7nEntity[]>;
}
export { V7nEntity };
