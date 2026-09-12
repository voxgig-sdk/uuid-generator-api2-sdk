import { UuidGeneratorApi2EntityBase } from '../UuidGeneratorApi2EntityBase';
import type { UuidGeneratorApi2SDK } from '../UuidGeneratorApi2SDK';
import type { Control } from '../types';
import type { Guid, GuidLoadMatch, GuidListMatch } from '../UuidGeneratorApi2Types';
declare class GuidEntity extends UuidGeneratorApi2EntityBase<Guid> {
    constructor(client: UuidGeneratorApi2SDK, entopts: any);
    make(this: GuidEntity): GuidEntity;
    load(this: any, reqmatch?: GuidLoadMatch, ctrl?: Control): Promise<GuidEntity>;
    list(this: any, reqmatch?: GuidListMatch, ctrl?: Control): Promise<GuidEntity[]>;
}
export { GuidEntity };
