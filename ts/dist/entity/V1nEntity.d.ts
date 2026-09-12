import { UuidGeneratorApi2EntityBase } from '../UuidGeneratorApi2EntityBase';
import type { UuidGeneratorApi2SDK } from '../UuidGeneratorApi2SDK';
import type { Control } from '../types';
import type { V1n, V1nLoadMatch, V1nListMatch } from '../UuidGeneratorApi2Types';
declare class V1nEntity extends UuidGeneratorApi2EntityBase<V1n> {
    constructor(client: UuidGeneratorApi2SDK, entopts: any);
    make(this: V1nEntity): V1nEntity;
    load(this: any, reqmatch?: V1nLoadMatch, ctrl?: Control): Promise<V1nEntity>;
    list(this: any, reqmatch?: V1nListMatch, ctrl?: Control): Promise<V1nEntity[]>;
}
export { V1nEntity };
