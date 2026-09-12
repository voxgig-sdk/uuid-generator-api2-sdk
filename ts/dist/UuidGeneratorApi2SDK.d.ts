import { GuidEntity } from './entity/GuidEntity';
import { V1nEntity } from './entity/V1nEntity';
import { V3nEntity } from './entity/V3nEntity';
import { V4nEntity } from './entity/V4nEntity';
import { V5nEntity } from './entity/V5nEntity';
import { V6nEntity } from './entity/V6nEntity';
import { V7nEntity } from './entity/V7nEntity';
export type * from './UuidGeneratorApi2Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { UuidGeneratorApi2EntityBase } from './UuidGeneratorApi2EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class UuidGeneratorApi2SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Guid(entopts?: Record<string, any>): GuidEntity;
    V1n(entopts?: Record<string, any>): V1nEntity;
    V3n(entopts?: Record<string, any>): V3nEntity;
    V4n(entopts?: Record<string, any>): V4nEntity;
    V5n(entopts?: Record<string, any>): V5nEntity;
    V6n(entopts?: Record<string, any>): V6nEntity;
    V7n(entopts?: Record<string, any>): V7nEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): UuidGeneratorApi2SDK;
    tester(testopts?: any, sdkopts?: any): UuidGeneratorApi2SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof UuidGeneratorApi2SDK;
export { stdutil, config, BaseFeature, UuidGeneratorApi2EntityBase, UuidGeneratorApi2SDK, SDK, };
