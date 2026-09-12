import { UuidGeneratorApi2EntityBase } from '../UuidGeneratorApi2EntityBase';
import type { UuidGeneratorApi2SDK } from '../UuidGeneratorApi2SDK';
import type { Control } from '../types';
import type { V4n, V4nLoadMatch, V4nListMatch } from '../UuidGeneratorApi2Types';
declare class V4nEntity extends UuidGeneratorApi2EntityBase<V4n> {
    constructor(client: UuidGeneratorApi2SDK, entopts: any);
    make(this: V4nEntity): V4nEntity;
    load(this: any, reqmatch?: V4nLoadMatch, ctrl?: Control): Promise<V4nEntity>;
    list(this: any, reqmatch?: V4nListMatch, ctrl?: Control): Promise<V4nEntity[]>;
}
export { V4nEntity };
