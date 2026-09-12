import { Context } from './Context';
declare class UuidGeneratorApi2Error extends Error {
    isUuidGeneratorApi2Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { UuidGeneratorApi2Error };
