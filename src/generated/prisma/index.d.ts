
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Asset
 * 
 */
export type Asset = $Result.DefaultSelection<Prisma.$AssetPayload>
/**
 * Model BarcodeSequence
 * 
 */
export type BarcodeSequence = $Result.DefaultSelection<Prisma.$BarcodeSequencePayload>
/**
 * Model MasterData
 * 
 */
export type MasterData = $Result.DefaultSelection<Prisma.$MasterDataPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model FilterTemplate
 * 
 */
export type FilterTemplate = $Result.DefaultSelection<Prisma.$FilterTemplatePayload>
/**
 * Model DraftTicket
 * 
 */
export type DraftTicket = $Result.DefaultSelection<Prisma.$DraftTicketPayload>
/**
 * Model PortalTicket
 * 
 */
export type PortalTicket = $Result.DefaultSelection<Prisma.$PortalTicketPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AssetStatus: {
  UN_USED: 'UN_USED',
  IN_USED: 'IN_USED',
  BROKEN: 'BROKEN',
  MAINTENANCE: 'MAINTENANCE'
};

export type AssetStatus = (typeof AssetStatus)[keyof typeof AssetStatus]


export const MasterDataType: {
  LOCATION: 'LOCATION',
  FLOOR: 'FLOOR',
  OWNER: 'OWNER',
  PURCHASING_UNIT: 'PURCHASING_UNIT',
  ASSET_TYPE: 'ASSET_TYPE'
};

export type MasterDataType = (typeof MasterDataType)[keyof typeof MasterDataType]


export const AuditAction: {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction]


export const TicketStatus: {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]

}

export type AssetStatus = $Enums.AssetStatus

export const AssetStatus: typeof $Enums.AssetStatus

export type MasterDataType = $Enums.MasterDataType

export const MasterDataType: typeof $Enums.MasterDataType

export type AuditAction = $Enums.AuditAction

export const AuditAction: typeof $Enums.AuditAction

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Assets
 * const assets = await prisma.asset.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Assets
   * const assets = await prisma.asset.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.asset`: Exposes CRUD operations for the **Asset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assets
    * const assets = await prisma.asset.findMany()
    * ```
    */
  get asset(): Prisma.AssetDelegate<ExtArgs>;

  /**
   * `prisma.barcodeSequence`: Exposes CRUD operations for the **BarcodeSequence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BarcodeSequences
    * const barcodeSequences = await prisma.barcodeSequence.findMany()
    * ```
    */
  get barcodeSequence(): Prisma.BarcodeSequenceDelegate<ExtArgs>;

  /**
   * `prisma.masterData`: Exposes CRUD operations for the **MasterData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasterData
    * const masterData = await prisma.masterData.findMany()
    * ```
    */
  get masterData(): Prisma.MasterDataDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.filterTemplate`: Exposes CRUD operations for the **FilterTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FilterTemplates
    * const filterTemplates = await prisma.filterTemplate.findMany()
    * ```
    */
  get filterTemplate(): Prisma.FilterTemplateDelegate<ExtArgs>;

  /**
   * `prisma.draftTicket`: Exposes CRUD operations for the **DraftTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DraftTickets
    * const draftTickets = await prisma.draftTicket.findMany()
    * ```
    */
  get draftTicket(): Prisma.DraftTicketDelegate<ExtArgs>;

  /**
   * `prisma.portalTicket`: Exposes CRUD operations for the **PortalTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortalTickets
    * const portalTickets = await prisma.portalTicket.findMany()
    * ```
    */
  get portalTicket(): Prisma.PortalTicketDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.18.0
   * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Asset: 'Asset',
    BarcodeSequence: 'BarcodeSequence',
    MasterData: 'MasterData',
    AuditLog: 'AuditLog',
    FilterTemplate: 'FilterTemplate',
    DraftTicket: 'DraftTicket',
    PortalTicket: 'PortalTicket'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "asset" | "barcodeSequence" | "masterData" | "auditLog" | "filterTemplate" | "draftTicket" | "portalTicket"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Asset: {
        payload: Prisma.$AssetPayload<ExtArgs>
        fields: Prisma.AssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findFirst: {
            args: Prisma.AssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findMany: {
            args: Prisma.AssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          create: {
            args: Prisma.AssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          createMany: {
            args: Prisma.AssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          delete: {
            args: Prisma.AssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          update: {
            args: Prisma.AssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          deleteMany: {
            args: Prisma.AssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          aggregate: {
            args: Prisma.AssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsset>
          }
          groupBy: {
            args: Prisma.AssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetCountArgs<ExtArgs>
            result: $Utils.Optional<AssetCountAggregateOutputType> | number
          }
        }
      }
      BarcodeSequence: {
        payload: Prisma.$BarcodeSequencePayload<ExtArgs>
        fields: Prisma.BarcodeSequenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarcodeSequenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarcodeSequenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>
          }
          findFirst: {
            args: Prisma.BarcodeSequenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarcodeSequenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>
          }
          findMany: {
            args: Prisma.BarcodeSequenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>[]
          }
          create: {
            args: Prisma.BarcodeSequenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>
          }
          createMany: {
            args: Prisma.BarcodeSequenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarcodeSequenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>[]
          }
          delete: {
            args: Prisma.BarcodeSequenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>
          }
          update: {
            args: Prisma.BarcodeSequenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>
          }
          deleteMany: {
            args: Prisma.BarcodeSequenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarcodeSequenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BarcodeSequenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarcodeSequencePayload>
          }
          aggregate: {
            args: Prisma.BarcodeSequenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarcodeSequence>
          }
          groupBy: {
            args: Prisma.BarcodeSequenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarcodeSequenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarcodeSequenceCountArgs<ExtArgs>
            result: $Utils.Optional<BarcodeSequenceCountAggregateOutputType> | number
          }
        }
      }
      MasterData: {
        payload: Prisma.$MasterDataPayload<ExtArgs>
        fields: Prisma.MasterDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>
          }
          findFirst: {
            args: Prisma.MasterDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>
          }
          findMany: {
            args: Prisma.MasterDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>[]
          }
          create: {
            args: Prisma.MasterDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>
          }
          createMany: {
            args: Prisma.MasterDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>[]
          }
          delete: {
            args: Prisma.MasterDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>
          }
          update: {
            args: Prisma.MasterDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>
          }
          deleteMany: {
            args: Prisma.MasterDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MasterDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterDataPayload>
          }
          aggregate: {
            args: Prisma.MasterDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMasterData>
          }
          groupBy: {
            args: Prisma.MasterDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterDataCountArgs<ExtArgs>
            result: $Utils.Optional<MasterDataCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      FilterTemplate: {
        payload: Prisma.$FilterTemplatePayload<ExtArgs>
        fields: Prisma.FilterTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FilterTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FilterTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>
          }
          findFirst: {
            args: Prisma.FilterTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FilterTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>
          }
          findMany: {
            args: Prisma.FilterTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>[]
          }
          create: {
            args: Prisma.FilterTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>
          }
          createMany: {
            args: Prisma.FilterTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FilterTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>[]
          }
          delete: {
            args: Prisma.FilterTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>
          }
          update: {
            args: Prisma.FilterTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>
          }
          deleteMany: {
            args: Prisma.FilterTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FilterTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FilterTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterTemplatePayload>
          }
          aggregate: {
            args: Prisma.FilterTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFilterTemplate>
          }
          groupBy: {
            args: Prisma.FilterTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<FilterTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.FilterTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<FilterTemplateCountAggregateOutputType> | number
          }
        }
      }
      DraftTicket: {
        payload: Prisma.$DraftTicketPayload<ExtArgs>
        fields: Prisma.DraftTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DraftTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DraftTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>
          }
          findFirst: {
            args: Prisma.DraftTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DraftTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>
          }
          findMany: {
            args: Prisma.DraftTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>[]
          }
          create: {
            args: Prisma.DraftTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>
          }
          createMany: {
            args: Prisma.DraftTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DraftTicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>[]
          }
          delete: {
            args: Prisma.DraftTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>
          }
          update: {
            args: Prisma.DraftTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>
          }
          deleteMany: {
            args: Prisma.DraftTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DraftTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DraftTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftTicketPayload>
          }
          aggregate: {
            args: Prisma.DraftTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDraftTicket>
          }
          groupBy: {
            args: Prisma.DraftTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<DraftTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.DraftTicketCountArgs<ExtArgs>
            result: $Utils.Optional<DraftTicketCountAggregateOutputType> | number
          }
        }
      }
      PortalTicket: {
        payload: Prisma.$PortalTicketPayload<ExtArgs>
        fields: Prisma.PortalTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortalTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortalTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>
          }
          findFirst: {
            args: Prisma.PortalTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortalTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>
          }
          findMany: {
            args: Prisma.PortalTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>[]
          }
          create: {
            args: Prisma.PortalTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>
          }
          createMany: {
            args: Prisma.PortalTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortalTicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>[]
          }
          delete: {
            args: Prisma.PortalTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>
          }
          update: {
            args: Prisma.PortalTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>
          }
          deleteMany: {
            args: Prisma.PortalTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortalTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortalTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalTicketPayload>
          }
          aggregate: {
            args: Prisma.PortalTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortalTicket>
          }
          groupBy: {
            args: Prisma.PortalTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortalTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortalTicketCountArgs<ExtArgs>
            result: $Utils.Optional<PortalTicketCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Asset
   */

  export type AggregateAsset = {
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  export type AssetAvgAggregateOutputType = {
    quantity: number | null
    originalCost: Decimal | null
  }

  export type AssetSumAggregateOutputType = {
    quantity: number | null
    originalCost: Decimal | null
  }

  export type AssetMinAggregateOutputType = {
    id: string | null
    barcode: string | null
    prefix: string | null
    asmsBarcode: string | null
    invoiceId: string | null
    serialNumber: string | null
    quantity: number | null
    description: string | null
    originalCost: Decimal | null
    assetTypeId: string | null
    purchaseDate: Date | null
    warrantyExpiry: Date | null
    locationId: string | null
    floorId: string | null
    ownerId: string | null
    purchasingUnitId: string | null
    seatCode: string | null
    status: $Enums.AssetStatus | null
    ticketId: string | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type AssetMaxAggregateOutputType = {
    id: string | null
    barcode: string | null
    prefix: string | null
    asmsBarcode: string | null
    invoiceId: string | null
    serialNumber: string | null
    quantity: number | null
    description: string | null
    originalCost: Decimal | null
    assetTypeId: string | null
    purchaseDate: Date | null
    warrantyExpiry: Date | null
    locationId: string | null
    floorId: string | null
    ownerId: string | null
    purchasingUnitId: string | null
    seatCode: string | null
    status: $Enums.AssetStatus | null
    ticketId: string | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type AssetCountAggregateOutputType = {
    id: number
    barcode: number
    prefix: number
    asmsBarcode: number
    invoiceId: number
    serialNumber: number
    quantity: number
    description: number
    originalCost: number
    assetTypeId: number
    purchaseDate: number
    warrantyExpiry: number
    locationId: number
    floorId: number
    ownerId: number
    purchasingUnitId: number
    seatCode: number
    status: number
    ticketId: number
    note: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type AssetAvgAggregateInputType = {
    quantity?: true
    originalCost?: true
  }

  export type AssetSumAggregateInputType = {
    quantity?: true
    originalCost?: true
  }

  export type AssetMinAggregateInputType = {
    id?: true
    barcode?: true
    prefix?: true
    asmsBarcode?: true
    invoiceId?: true
    serialNumber?: true
    quantity?: true
    description?: true
    originalCost?: true
    assetTypeId?: true
    purchaseDate?: true
    warrantyExpiry?: true
    locationId?: true
    floorId?: true
    ownerId?: true
    purchasingUnitId?: true
    seatCode?: true
    status?: true
    ticketId?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type AssetMaxAggregateInputType = {
    id?: true
    barcode?: true
    prefix?: true
    asmsBarcode?: true
    invoiceId?: true
    serialNumber?: true
    quantity?: true
    description?: true
    originalCost?: true
    assetTypeId?: true
    purchaseDate?: true
    warrantyExpiry?: true
    locationId?: true
    floorId?: true
    ownerId?: true
    purchasingUnitId?: true
    seatCode?: true
    status?: true
    ticketId?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type AssetCountAggregateInputType = {
    id?: true
    barcode?: true
    prefix?: true
    asmsBarcode?: true
    invoiceId?: true
    serialNumber?: true
    quantity?: true
    description?: true
    originalCost?: true
    assetTypeId?: true
    purchaseDate?: true
    warrantyExpiry?: true
    locationId?: true
    floorId?: true
    ownerId?: true
    purchasingUnitId?: true
    seatCode?: true
    status?: true
    ticketId?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type AssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asset to aggregate.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assets
    **/
    _count?: true | AssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetMaxAggregateInputType
  }

  export type GetAssetAggregateType<T extends AssetAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset[P]>
      : GetScalarType<T[P], AggregateAsset[P]>
  }




  export type AssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithAggregationInput | AssetOrderByWithAggregationInput[]
    by: AssetScalarFieldEnum[] | AssetScalarFieldEnum
    having?: AssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetCountAggregateInputType | true
    _avg?: AssetAvgAggregateInputType
    _sum?: AssetSumAggregateInputType
    _min?: AssetMinAggregateInputType
    _max?: AssetMaxAggregateInputType
  }

  export type AssetGroupByOutputType = {
    id: string
    barcode: string
    prefix: string
    asmsBarcode: string | null
    invoiceId: string | null
    serialNumber: string | null
    quantity: number
    description: string | null
    originalCost: Decimal | null
    assetTypeId: string | null
    purchaseDate: Date | null
    warrantyExpiry: Date | null
    locationId: string | null
    floorId: string | null
    ownerId: string | null
    purchasingUnitId: string | null
    seatCode: string | null
    status: $Enums.AssetStatus
    ticketId: string | null
    note: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  type GetAssetGroupByPayload<T extends AssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetGroupByOutputType[P]>
            : GetScalarType<T[P], AssetGroupByOutputType[P]>
        }
      >
    >


  export type AssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    prefix?: boolean
    asmsBarcode?: boolean
    invoiceId?: boolean
    serialNumber?: boolean
    quantity?: boolean
    description?: boolean
    originalCost?: boolean
    assetTypeId?: boolean
    purchaseDate?: boolean
    warrantyExpiry?: boolean
    locationId?: boolean
    floorId?: boolean
    ownerId?: boolean
    purchasingUnitId?: boolean
    seatCode?: boolean
    status?: boolean
    ticketId?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    prefix?: boolean
    asmsBarcode?: boolean
    invoiceId?: boolean
    serialNumber?: boolean
    quantity?: boolean
    description?: boolean
    originalCost?: boolean
    assetTypeId?: boolean
    purchaseDate?: boolean
    warrantyExpiry?: boolean
    locationId?: boolean
    floorId?: boolean
    ownerId?: boolean
    purchasingUnitId?: boolean
    seatCode?: boolean
    status?: boolean
    ticketId?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectScalar = {
    id?: boolean
    barcode?: boolean
    prefix?: boolean
    asmsBarcode?: boolean
    invoiceId?: boolean
    serialNumber?: boolean
    quantity?: boolean
    description?: boolean
    originalCost?: boolean
    assetTypeId?: boolean
    purchaseDate?: boolean
    warrantyExpiry?: boolean
    locationId?: boolean
    floorId?: boolean
    ownerId?: boolean
    purchasingUnitId?: boolean
    seatCode?: boolean
    status?: boolean
    ticketId?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }


  export type $AssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asset"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barcode: string
      prefix: string
      asmsBarcode: string | null
      invoiceId: string | null
      serialNumber: string | null
      quantity: number
      description: string | null
      originalCost: Prisma.Decimal | null
      assetTypeId: string | null
      purchaseDate: Date | null
      warrantyExpiry: Date | null
      locationId: string | null
      floorId: string | null
      ownerId: string | null
      purchasingUnitId: string | null
      seatCode: string | null
      status: $Enums.AssetStatus
      ticketId: string | null
      note: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: string
      updatedBy: string
    }, ExtArgs["result"]["asset"]>
    composites: {}
  }

  type AssetGetPayload<S extends boolean | null | undefined | AssetDefaultArgs> = $Result.GetResult<Prisma.$AssetPayload, S>

  type AssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AssetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AssetCountAggregateInputType | true
    }

  export interface AssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asset'], meta: { name: 'Asset' } }
    /**
     * Find zero or one Asset that matches the filter.
     * @param {AssetFindUniqueArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetFindUniqueArgs>(args: SelectSubset<T, AssetFindUniqueArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Asset that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AssetFindUniqueOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Asset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetFindFirstArgs>(args?: SelectSubset<T, AssetFindFirstArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Asset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.asset.findMany()
     * 
     * // Get first 10 Assets
     * const assets = await prisma.asset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetWithIdOnly = await prisma.asset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetFindManyArgs>(args?: SelectSubset<T, AssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Asset.
     * @param {AssetCreateArgs} args - Arguments to create a Asset.
     * @example
     * // Create one Asset
     * const Asset = await prisma.asset.create({
     *   data: {
     *     // ... data to create a Asset
     *   }
     * })
     * 
     */
    create<T extends AssetCreateArgs>(args: SelectSubset<T, AssetCreateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Assets.
     * @param {AssetCreateManyArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetCreateManyArgs>(args?: SelectSubset<T, AssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assets and returns the data saved in the database.
     * @param {AssetCreateManyAndReturnArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Asset.
     * @param {AssetDeleteArgs} args - Arguments to delete one Asset.
     * @example
     * // Delete one Asset
     * const Asset = await prisma.asset.delete({
     *   where: {
     *     // ... filter to delete one Asset
     *   }
     * })
     * 
     */
    delete<T extends AssetDeleteArgs>(args: SelectSubset<T, AssetDeleteArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Asset.
     * @param {AssetUpdateArgs} args - Arguments to update one Asset.
     * @example
     * // Update one Asset
     * const asset = await prisma.asset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetUpdateArgs>(args: SelectSubset<T, AssetUpdateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Assets.
     * @param {AssetDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.asset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetDeleteManyArgs>(args?: SelectSubset<T, AssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetUpdateManyArgs>(args: SelectSubset<T, AssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Asset.
     * @param {AssetUpsertArgs} args - Arguments to update or create a Asset.
     * @example
     * // Update or create a Asset
     * const asset = await prisma.asset.upsert({
     *   create: {
     *     // ... data to create a Asset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset we want to update
     *   }
     * })
     */
    upsert<T extends AssetUpsertArgs>(args: SelectSubset<T, AssetUpsertArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.asset.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends AssetCountArgs>(
      args?: Subset<T, AssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssetAggregateArgs>(args: Subset<T, AssetAggregateArgs>): Prisma.PrismaPromise<GetAssetAggregateType<T>>

    /**
     * Group by Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetGroupByArgs['orderBy'] }
        : { orderBy?: AssetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asset model
   */
  readonly fields: AssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Asset model
   */ 
  interface AssetFieldRefs {
    readonly id: FieldRef<"Asset", 'String'>
    readonly barcode: FieldRef<"Asset", 'String'>
    readonly prefix: FieldRef<"Asset", 'String'>
    readonly asmsBarcode: FieldRef<"Asset", 'String'>
    readonly invoiceId: FieldRef<"Asset", 'String'>
    readonly serialNumber: FieldRef<"Asset", 'String'>
    readonly quantity: FieldRef<"Asset", 'Int'>
    readonly description: FieldRef<"Asset", 'String'>
    readonly originalCost: FieldRef<"Asset", 'Decimal'>
    readonly assetTypeId: FieldRef<"Asset", 'String'>
    readonly purchaseDate: FieldRef<"Asset", 'DateTime'>
    readonly warrantyExpiry: FieldRef<"Asset", 'DateTime'>
    readonly locationId: FieldRef<"Asset", 'String'>
    readonly floorId: FieldRef<"Asset", 'String'>
    readonly ownerId: FieldRef<"Asset", 'String'>
    readonly purchasingUnitId: FieldRef<"Asset", 'String'>
    readonly seatCode: FieldRef<"Asset", 'String'>
    readonly status: FieldRef<"Asset", 'AssetStatus'>
    readonly ticketId: FieldRef<"Asset", 'String'>
    readonly note: FieldRef<"Asset", 'String'>
    readonly createdAt: FieldRef<"Asset", 'DateTime'>
    readonly updatedAt: FieldRef<"Asset", 'DateTime'>
    readonly createdBy: FieldRef<"Asset", 'String'>
    readonly updatedBy: FieldRef<"Asset", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Asset findUnique
   */
  export type AssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findUniqueOrThrow
   */
  export type AssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findFirst
   */
  export type AssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findFirstOrThrow
   */
  export type AssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findMany
   */
  export type AssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Filter, which Assets to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset create
   */
  export type AssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * The data needed to create a Asset.
     */
    data: XOR<AssetCreateInput, AssetUncheckedCreateInput>
  }

  /**
   * Asset createMany
   */
  export type AssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asset createManyAndReturn
   */
  export type AssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asset update
   */
  export type AssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * The data needed to update a Asset.
     */
    data: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
    /**
     * Choose, which Asset to update.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset updateMany
   */
  export type AssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
  }

  /**
   * Asset upsert
   */
  export type AssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * The filter to search for the Asset to update in case it exists.
     */
    where: AssetWhereUniqueInput
    /**
     * In case the Asset found by the `where` argument doesn't exist, create a new Asset with this data.
     */
    create: XOR<AssetCreateInput, AssetUncheckedCreateInput>
    /**
     * In case the Asset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
  }

  /**
   * Asset delete
   */
  export type AssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Filter which Asset to delete.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset deleteMany
   */
  export type AssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assets to delete
     */
    where?: AssetWhereInput
  }

  /**
   * Asset without action
   */
  export type AssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
  }


  /**
   * Model BarcodeSequence
   */

  export type AggregateBarcodeSequence = {
    _count: BarcodeSequenceCountAggregateOutputType | null
    _avg: BarcodeSequenceAvgAggregateOutputType | null
    _sum: BarcodeSequenceSumAggregateOutputType | null
    _min: BarcodeSequenceMinAggregateOutputType | null
    _max: BarcodeSequenceMaxAggregateOutputType | null
  }

  export type BarcodeSequenceAvgAggregateOutputType = {
    lastValue: number | null
  }

  export type BarcodeSequenceSumAggregateOutputType = {
    lastValue: number | null
  }

  export type BarcodeSequenceMinAggregateOutputType = {
    prefix: string | null
    lastValue: number | null
    updatedAt: Date | null
  }

  export type BarcodeSequenceMaxAggregateOutputType = {
    prefix: string | null
    lastValue: number | null
    updatedAt: Date | null
  }

  export type BarcodeSequenceCountAggregateOutputType = {
    prefix: number
    lastValue: number
    updatedAt: number
    _all: number
  }


  export type BarcodeSequenceAvgAggregateInputType = {
    lastValue?: true
  }

  export type BarcodeSequenceSumAggregateInputType = {
    lastValue?: true
  }

  export type BarcodeSequenceMinAggregateInputType = {
    prefix?: true
    lastValue?: true
    updatedAt?: true
  }

  export type BarcodeSequenceMaxAggregateInputType = {
    prefix?: true
    lastValue?: true
    updatedAt?: true
  }

  export type BarcodeSequenceCountAggregateInputType = {
    prefix?: true
    lastValue?: true
    updatedAt?: true
    _all?: true
  }

  export type BarcodeSequenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarcodeSequence to aggregate.
     */
    where?: BarcodeSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarcodeSequences to fetch.
     */
    orderBy?: BarcodeSequenceOrderByWithRelationInput | BarcodeSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarcodeSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarcodeSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarcodeSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BarcodeSequences
    **/
    _count?: true | BarcodeSequenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BarcodeSequenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BarcodeSequenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarcodeSequenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarcodeSequenceMaxAggregateInputType
  }

  export type GetBarcodeSequenceAggregateType<T extends BarcodeSequenceAggregateArgs> = {
        [P in keyof T & keyof AggregateBarcodeSequence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarcodeSequence[P]>
      : GetScalarType<T[P], AggregateBarcodeSequence[P]>
  }




  export type BarcodeSequenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarcodeSequenceWhereInput
    orderBy?: BarcodeSequenceOrderByWithAggregationInput | BarcodeSequenceOrderByWithAggregationInput[]
    by: BarcodeSequenceScalarFieldEnum[] | BarcodeSequenceScalarFieldEnum
    having?: BarcodeSequenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarcodeSequenceCountAggregateInputType | true
    _avg?: BarcodeSequenceAvgAggregateInputType
    _sum?: BarcodeSequenceSumAggregateInputType
    _min?: BarcodeSequenceMinAggregateInputType
    _max?: BarcodeSequenceMaxAggregateInputType
  }

  export type BarcodeSequenceGroupByOutputType = {
    prefix: string
    lastValue: number
    updatedAt: Date
    _count: BarcodeSequenceCountAggregateOutputType | null
    _avg: BarcodeSequenceAvgAggregateOutputType | null
    _sum: BarcodeSequenceSumAggregateOutputType | null
    _min: BarcodeSequenceMinAggregateOutputType | null
    _max: BarcodeSequenceMaxAggregateOutputType | null
  }

  type GetBarcodeSequenceGroupByPayload<T extends BarcodeSequenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarcodeSequenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarcodeSequenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarcodeSequenceGroupByOutputType[P]>
            : GetScalarType<T[P], BarcodeSequenceGroupByOutputType[P]>
        }
      >
    >


  export type BarcodeSequenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    prefix?: boolean
    lastValue?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["barcodeSequence"]>

  export type BarcodeSequenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    prefix?: boolean
    lastValue?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["barcodeSequence"]>

  export type BarcodeSequenceSelectScalar = {
    prefix?: boolean
    lastValue?: boolean
    updatedAt?: boolean
  }


  export type $BarcodeSequencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BarcodeSequence"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      prefix: string
      lastValue: number
      updatedAt: Date
    }, ExtArgs["result"]["barcodeSequence"]>
    composites: {}
  }

  type BarcodeSequenceGetPayload<S extends boolean | null | undefined | BarcodeSequenceDefaultArgs> = $Result.GetResult<Prisma.$BarcodeSequencePayload, S>

  type BarcodeSequenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BarcodeSequenceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BarcodeSequenceCountAggregateInputType | true
    }

  export interface BarcodeSequenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BarcodeSequence'], meta: { name: 'BarcodeSequence' } }
    /**
     * Find zero or one BarcodeSequence that matches the filter.
     * @param {BarcodeSequenceFindUniqueArgs} args - Arguments to find a BarcodeSequence
     * @example
     * // Get one BarcodeSequence
     * const barcodeSequence = await prisma.barcodeSequence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarcodeSequenceFindUniqueArgs>(args: SelectSubset<T, BarcodeSequenceFindUniqueArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BarcodeSequence that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BarcodeSequenceFindUniqueOrThrowArgs} args - Arguments to find a BarcodeSequence
     * @example
     * // Get one BarcodeSequence
     * const barcodeSequence = await prisma.barcodeSequence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarcodeSequenceFindUniqueOrThrowArgs>(args: SelectSubset<T, BarcodeSequenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BarcodeSequence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarcodeSequenceFindFirstArgs} args - Arguments to find a BarcodeSequence
     * @example
     * // Get one BarcodeSequence
     * const barcodeSequence = await prisma.barcodeSequence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarcodeSequenceFindFirstArgs>(args?: SelectSubset<T, BarcodeSequenceFindFirstArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BarcodeSequence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarcodeSequenceFindFirstOrThrowArgs} args - Arguments to find a BarcodeSequence
     * @example
     * // Get one BarcodeSequence
     * const barcodeSequence = await prisma.barcodeSequence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarcodeSequenceFindFirstOrThrowArgs>(args?: SelectSubset<T, BarcodeSequenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BarcodeSequences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarcodeSequenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BarcodeSequences
     * const barcodeSequences = await prisma.barcodeSequence.findMany()
     * 
     * // Get first 10 BarcodeSequences
     * const barcodeSequences = await prisma.barcodeSequence.findMany({ take: 10 })
     * 
     * // Only select the `prefix`
     * const barcodeSequenceWithPrefixOnly = await prisma.barcodeSequence.findMany({ select: { prefix: true } })
     * 
     */
    findMany<T extends BarcodeSequenceFindManyArgs>(args?: SelectSubset<T, BarcodeSequenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BarcodeSequence.
     * @param {BarcodeSequenceCreateArgs} args - Arguments to create a BarcodeSequence.
     * @example
     * // Create one BarcodeSequence
     * const BarcodeSequence = await prisma.barcodeSequence.create({
     *   data: {
     *     // ... data to create a BarcodeSequence
     *   }
     * })
     * 
     */
    create<T extends BarcodeSequenceCreateArgs>(args: SelectSubset<T, BarcodeSequenceCreateArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BarcodeSequences.
     * @param {BarcodeSequenceCreateManyArgs} args - Arguments to create many BarcodeSequences.
     * @example
     * // Create many BarcodeSequences
     * const barcodeSequence = await prisma.barcodeSequence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarcodeSequenceCreateManyArgs>(args?: SelectSubset<T, BarcodeSequenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BarcodeSequences and returns the data saved in the database.
     * @param {BarcodeSequenceCreateManyAndReturnArgs} args - Arguments to create many BarcodeSequences.
     * @example
     * // Create many BarcodeSequences
     * const barcodeSequence = await prisma.barcodeSequence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BarcodeSequences and only return the `prefix`
     * const barcodeSequenceWithPrefixOnly = await prisma.barcodeSequence.createManyAndReturn({ 
     *   select: { prefix: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarcodeSequenceCreateManyAndReturnArgs>(args?: SelectSubset<T, BarcodeSequenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BarcodeSequence.
     * @param {BarcodeSequenceDeleteArgs} args - Arguments to delete one BarcodeSequence.
     * @example
     * // Delete one BarcodeSequence
     * const BarcodeSequence = await prisma.barcodeSequence.delete({
     *   where: {
     *     // ... filter to delete one BarcodeSequence
     *   }
     * })
     * 
     */
    delete<T extends BarcodeSequenceDeleteArgs>(args: SelectSubset<T, BarcodeSequenceDeleteArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BarcodeSequence.
     * @param {BarcodeSequenceUpdateArgs} args - Arguments to update one BarcodeSequence.
     * @example
     * // Update one BarcodeSequence
     * const barcodeSequence = await prisma.barcodeSequence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarcodeSequenceUpdateArgs>(args: SelectSubset<T, BarcodeSequenceUpdateArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BarcodeSequences.
     * @param {BarcodeSequenceDeleteManyArgs} args - Arguments to filter BarcodeSequences to delete.
     * @example
     * // Delete a few BarcodeSequences
     * const { count } = await prisma.barcodeSequence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarcodeSequenceDeleteManyArgs>(args?: SelectSubset<T, BarcodeSequenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarcodeSequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarcodeSequenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BarcodeSequences
     * const barcodeSequence = await prisma.barcodeSequence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarcodeSequenceUpdateManyArgs>(args: SelectSubset<T, BarcodeSequenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BarcodeSequence.
     * @param {BarcodeSequenceUpsertArgs} args - Arguments to update or create a BarcodeSequence.
     * @example
     * // Update or create a BarcodeSequence
     * const barcodeSequence = await prisma.barcodeSequence.upsert({
     *   create: {
     *     // ... data to create a BarcodeSequence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BarcodeSequence we want to update
     *   }
     * })
     */
    upsert<T extends BarcodeSequenceUpsertArgs>(args: SelectSubset<T, BarcodeSequenceUpsertArgs<ExtArgs>>): Prisma__BarcodeSequenceClient<$Result.GetResult<Prisma.$BarcodeSequencePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BarcodeSequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarcodeSequenceCountArgs} args - Arguments to filter BarcodeSequences to count.
     * @example
     * // Count the number of BarcodeSequences
     * const count = await prisma.barcodeSequence.count({
     *   where: {
     *     // ... the filter for the BarcodeSequences we want to count
     *   }
     * })
    **/
    count<T extends BarcodeSequenceCountArgs>(
      args?: Subset<T, BarcodeSequenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarcodeSequenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BarcodeSequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarcodeSequenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarcodeSequenceAggregateArgs>(args: Subset<T, BarcodeSequenceAggregateArgs>): Prisma.PrismaPromise<GetBarcodeSequenceAggregateType<T>>

    /**
     * Group by BarcodeSequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarcodeSequenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarcodeSequenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarcodeSequenceGroupByArgs['orderBy'] }
        : { orderBy?: BarcodeSequenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarcodeSequenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarcodeSequenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BarcodeSequence model
   */
  readonly fields: BarcodeSequenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BarcodeSequence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarcodeSequenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BarcodeSequence model
   */ 
  interface BarcodeSequenceFieldRefs {
    readonly prefix: FieldRef<"BarcodeSequence", 'String'>
    readonly lastValue: FieldRef<"BarcodeSequence", 'Int'>
    readonly updatedAt: FieldRef<"BarcodeSequence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BarcodeSequence findUnique
   */
  export type BarcodeSequenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BarcodeSequence to fetch.
     */
    where: BarcodeSequenceWhereUniqueInput
  }

  /**
   * BarcodeSequence findUniqueOrThrow
   */
  export type BarcodeSequenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BarcodeSequence to fetch.
     */
    where: BarcodeSequenceWhereUniqueInput
  }

  /**
   * BarcodeSequence findFirst
   */
  export type BarcodeSequenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BarcodeSequence to fetch.
     */
    where?: BarcodeSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarcodeSequences to fetch.
     */
    orderBy?: BarcodeSequenceOrderByWithRelationInput | BarcodeSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarcodeSequences.
     */
    cursor?: BarcodeSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarcodeSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarcodeSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarcodeSequences.
     */
    distinct?: BarcodeSequenceScalarFieldEnum | BarcodeSequenceScalarFieldEnum[]
  }

  /**
   * BarcodeSequence findFirstOrThrow
   */
  export type BarcodeSequenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BarcodeSequence to fetch.
     */
    where?: BarcodeSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarcodeSequences to fetch.
     */
    orderBy?: BarcodeSequenceOrderByWithRelationInput | BarcodeSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarcodeSequences.
     */
    cursor?: BarcodeSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarcodeSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarcodeSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarcodeSequences.
     */
    distinct?: BarcodeSequenceScalarFieldEnum | BarcodeSequenceScalarFieldEnum[]
  }

  /**
   * BarcodeSequence findMany
   */
  export type BarcodeSequenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BarcodeSequences to fetch.
     */
    where?: BarcodeSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarcodeSequences to fetch.
     */
    orderBy?: BarcodeSequenceOrderByWithRelationInput | BarcodeSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BarcodeSequences.
     */
    cursor?: BarcodeSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarcodeSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarcodeSequences.
     */
    skip?: number
    distinct?: BarcodeSequenceScalarFieldEnum | BarcodeSequenceScalarFieldEnum[]
  }

  /**
   * BarcodeSequence create
   */
  export type BarcodeSequenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * The data needed to create a BarcodeSequence.
     */
    data: XOR<BarcodeSequenceCreateInput, BarcodeSequenceUncheckedCreateInput>
  }

  /**
   * BarcodeSequence createMany
   */
  export type BarcodeSequenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BarcodeSequences.
     */
    data: BarcodeSequenceCreateManyInput | BarcodeSequenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BarcodeSequence createManyAndReturn
   */
  export type BarcodeSequenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BarcodeSequences.
     */
    data: BarcodeSequenceCreateManyInput | BarcodeSequenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BarcodeSequence update
   */
  export type BarcodeSequenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * The data needed to update a BarcodeSequence.
     */
    data: XOR<BarcodeSequenceUpdateInput, BarcodeSequenceUncheckedUpdateInput>
    /**
     * Choose, which BarcodeSequence to update.
     */
    where: BarcodeSequenceWhereUniqueInput
  }

  /**
   * BarcodeSequence updateMany
   */
  export type BarcodeSequenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BarcodeSequences.
     */
    data: XOR<BarcodeSequenceUpdateManyMutationInput, BarcodeSequenceUncheckedUpdateManyInput>
    /**
     * Filter which BarcodeSequences to update
     */
    where?: BarcodeSequenceWhereInput
  }

  /**
   * BarcodeSequence upsert
   */
  export type BarcodeSequenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * The filter to search for the BarcodeSequence to update in case it exists.
     */
    where: BarcodeSequenceWhereUniqueInput
    /**
     * In case the BarcodeSequence found by the `where` argument doesn't exist, create a new BarcodeSequence with this data.
     */
    create: XOR<BarcodeSequenceCreateInput, BarcodeSequenceUncheckedCreateInput>
    /**
     * In case the BarcodeSequence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarcodeSequenceUpdateInput, BarcodeSequenceUncheckedUpdateInput>
  }

  /**
   * BarcodeSequence delete
   */
  export type BarcodeSequenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
    /**
     * Filter which BarcodeSequence to delete.
     */
    where: BarcodeSequenceWhereUniqueInput
  }

  /**
   * BarcodeSequence deleteMany
   */
  export type BarcodeSequenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarcodeSequences to delete
     */
    where?: BarcodeSequenceWhereInput
  }

  /**
   * BarcodeSequence without action
   */
  export type BarcodeSequenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarcodeSequence
     */
    select?: BarcodeSequenceSelect<ExtArgs> | null
  }


  /**
   * Model MasterData
   */

  export type AggregateMasterData = {
    _count: MasterDataCountAggregateOutputType | null
    _min: MasterDataMinAggregateOutputType | null
    _max: MasterDataMaxAggregateOutputType | null
  }

  export type MasterDataMinAggregateOutputType = {
    id: string | null
    type: $Enums.MasterDataType | null
    name: string | null
    code: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasterDataMaxAggregateOutputType = {
    id: string | null
    type: $Enums.MasterDataType | null
    name: string | null
    code: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasterDataCountAggregateOutputType = {
    id: number
    type: number
    name: number
    code: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MasterDataMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    code?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasterDataMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    code?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasterDataCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    code?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MasterDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterData to aggregate.
     */
    where?: MasterDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterData to fetch.
     */
    orderBy?: MasterDataOrderByWithRelationInput | MasterDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasterData
    **/
    _count?: true | MasterDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterDataMaxAggregateInputType
  }

  export type GetMasterDataAggregateType<T extends MasterDataAggregateArgs> = {
        [P in keyof T & keyof AggregateMasterData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasterData[P]>
      : GetScalarType<T[P], AggregateMasterData[P]>
  }




  export type MasterDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterDataWhereInput
    orderBy?: MasterDataOrderByWithAggregationInput | MasterDataOrderByWithAggregationInput[]
    by: MasterDataScalarFieldEnum[] | MasterDataScalarFieldEnum
    having?: MasterDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterDataCountAggregateInputType | true
    _min?: MasterDataMinAggregateInputType
    _max?: MasterDataMaxAggregateInputType
  }

  export type MasterDataGroupByOutputType = {
    id: string
    type: $Enums.MasterDataType
    name: string
    code: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: MasterDataCountAggregateOutputType | null
    _min: MasterDataMinAggregateOutputType | null
    _max: MasterDataMaxAggregateOutputType | null
  }

  type GetMasterDataGroupByPayload<T extends MasterDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterDataGroupByOutputType[P]>
            : GetScalarType<T[P], MasterDataGroupByOutputType[P]>
        }
      >
    >


  export type MasterDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    code?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["masterData"]>

  export type MasterDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    code?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["masterData"]>

  export type MasterDataSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    code?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $MasterDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasterData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.MasterDataType
      name: string
      code: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["masterData"]>
    composites: {}
  }

  type MasterDataGetPayload<S extends boolean | null | undefined | MasterDataDefaultArgs> = $Result.GetResult<Prisma.$MasterDataPayload, S>

  type MasterDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MasterDataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MasterDataCountAggregateInputType | true
    }

  export interface MasterDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MasterData'], meta: { name: 'MasterData' } }
    /**
     * Find zero or one MasterData that matches the filter.
     * @param {MasterDataFindUniqueArgs} args - Arguments to find a MasterData
     * @example
     * // Get one MasterData
     * const masterData = await prisma.masterData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterDataFindUniqueArgs>(args: SelectSubset<T, MasterDataFindUniqueArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MasterData that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MasterDataFindUniqueOrThrowArgs} args - Arguments to find a MasterData
     * @example
     * // Get one MasterData
     * const masterData = await prisma.masterData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterDataFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MasterData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataFindFirstArgs} args - Arguments to find a MasterData
     * @example
     * // Get one MasterData
     * const masterData = await prisma.masterData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterDataFindFirstArgs>(args?: SelectSubset<T, MasterDataFindFirstArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MasterData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataFindFirstOrThrowArgs} args - Arguments to find a MasterData
     * @example
     * // Get one MasterData
     * const masterData = await prisma.masterData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterDataFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MasterData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterData
     * const masterData = await prisma.masterData.findMany()
     * 
     * // Get first 10 MasterData
     * const masterData = await prisma.masterData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterDataWithIdOnly = await prisma.masterData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterDataFindManyArgs>(args?: SelectSubset<T, MasterDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MasterData.
     * @param {MasterDataCreateArgs} args - Arguments to create a MasterData.
     * @example
     * // Create one MasterData
     * const MasterData = await prisma.masterData.create({
     *   data: {
     *     // ... data to create a MasterData
     *   }
     * })
     * 
     */
    create<T extends MasterDataCreateArgs>(args: SelectSubset<T, MasterDataCreateArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MasterData.
     * @param {MasterDataCreateManyArgs} args - Arguments to create many MasterData.
     * @example
     * // Create many MasterData
     * const masterData = await prisma.masterData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterDataCreateManyArgs>(args?: SelectSubset<T, MasterDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MasterData and returns the data saved in the database.
     * @param {MasterDataCreateManyAndReturnArgs} args - Arguments to create many MasterData.
     * @example
     * // Create many MasterData
     * const masterData = await prisma.masterData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MasterData and only return the `id`
     * const masterDataWithIdOnly = await prisma.masterData.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterDataCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MasterData.
     * @param {MasterDataDeleteArgs} args - Arguments to delete one MasterData.
     * @example
     * // Delete one MasterData
     * const MasterData = await prisma.masterData.delete({
     *   where: {
     *     // ... filter to delete one MasterData
     *   }
     * })
     * 
     */
    delete<T extends MasterDataDeleteArgs>(args: SelectSubset<T, MasterDataDeleteArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MasterData.
     * @param {MasterDataUpdateArgs} args - Arguments to update one MasterData.
     * @example
     * // Update one MasterData
     * const masterData = await prisma.masterData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterDataUpdateArgs>(args: SelectSubset<T, MasterDataUpdateArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MasterData.
     * @param {MasterDataDeleteManyArgs} args - Arguments to filter MasterData to delete.
     * @example
     * // Delete a few MasterData
     * const { count } = await prisma.masterData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterDataDeleteManyArgs>(args?: SelectSubset<T, MasterDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterData
     * const masterData = await prisma.masterData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterDataUpdateManyArgs>(args: SelectSubset<T, MasterDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MasterData.
     * @param {MasterDataUpsertArgs} args - Arguments to update or create a MasterData.
     * @example
     * // Update or create a MasterData
     * const masterData = await prisma.masterData.upsert({
     *   create: {
     *     // ... data to create a MasterData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterData we want to update
     *   }
     * })
     */
    upsert<T extends MasterDataUpsertArgs>(args: SelectSubset<T, MasterDataUpsertArgs<ExtArgs>>): Prisma__MasterDataClient<$Result.GetResult<Prisma.$MasterDataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MasterData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataCountArgs} args - Arguments to filter MasterData to count.
     * @example
     * // Count the number of MasterData
     * const count = await prisma.masterData.count({
     *   where: {
     *     // ... the filter for the MasterData we want to count
     *   }
     * })
    **/
    count<T extends MasterDataCountArgs>(
      args?: Subset<T, MasterDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasterData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MasterDataAggregateArgs>(args: Subset<T, MasterDataAggregateArgs>): Prisma.PrismaPromise<GetMasterDataAggregateType<T>>

    /**
     * Group by MasterData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MasterDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterDataGroupByArgs['orderBy'] }
        : { orderBy?: MasterDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MasterDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MasterData model
   */
  readonly fields: MasterDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MasterData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MasterData model
   */ 
  interface MasterDataFieldRefs {
    readonly id: FieldRef<"MasterData", 'String'>
    readonly type: FieldRef<"MasterData", 'MasterDataType'>
    readonly name: FieldRef<"MasterData", 'String'>
    readonly code: FieldRef<"MasterData", 'String'>
    readonly active: FieldRef<"MasterData", 'Boolean'>
    readonly createdAt: FieldRef<"MasterData", 'DateTime'>
    readonly updatedAt: FieldRef<"MasterData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MasterData findUnique
   */
  export type MasterDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * Filter, which MasterData to fetch.
     */
    where: MasterDataWhereUniqueInput
  }

  /**
   * MasterData findUniqueOrThrow
   */
  export type MasterDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * Filter, which MasterData to fetch.
     */
    where: MasterDataWhereUniqueInput
  }

  /**
   * MasterData findFirst
   */
  export type MasterDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * Filter, which MasterData to fetch.
     */
    where?: MasterDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterData to fetch.
     */
    orderBy?: MasterDataOrderByWithRelationInput | MasterDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterData.
     */
    cursor?: MasterDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterData.
     */
    distinct?: MasterDataScalarFieldEnum | MasterDataScalarFieldEnum[]
  }

  /**
   * MasterData findFirstOrThrow
   */
  export type MasterDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * Filter, which MasterData to fetch.
     */
    where?: MasterDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterData to fetch.
     */
    orderBy?: MasterDataOrderByWithRelationInput | MasterDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterData.
     */
    cursor?: MasterDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterData.
     */
    distinct?: MasterDataScalarFieldEnum | MasterDataScalarFieldEnum[]
  }

  /**
   * MasterData findMany
   */
  export type MasterDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * Filter, which MasterData to fetch.
     */
    where?: MasterDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterData to fetch.
     */
    orderBy?: MasterDataOrderByWithRelationInput | MasterDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasterData.
     */
    cursor?: MasterDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterData.
     */
    skip?: number
    distinct?: MasterDataScalarFieldEnum | MasterDataScalarFieldEnum[]
  }

  /**
   * MasterData create
   */
  export type MasterDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * The data needed to create a MasterData.
     */
    data: XOR<MasterDataCreateInput, MasterDataUncheckedCreateInput>
  }

  /**
   * MasterData createMany
   */
  export type MasterDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasterData.
     */
    data: MasterDataCreateManyInput | MasterDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterData createManyAndReturn
   */
  export type MasterDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MasterData.
     */
    data: MasterDataCreateManyInput | MasterDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterData update
   */
  export type MasterDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * The data needed to update a MasterData.
     */
    data: XOR<MasterDataUpdateInput, MasterDataUncheckedUpdateInput>
    /**
     * Choose, which MasterData to update.
     */
    where: MasterDataWhereUniqueInput
  }

  /**
   * MasterData updateMany
   */
  export type MasterDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MasterData.
     */
    data: XOR<MasterDataUpdateManyMutationInput, MasterDataUncheckedUpdateManyInput>
    /**
     * Filter which MasterData to update
     */
    where?: MasterDataWhereInput
  }

  /**
   * MasterData upsert
   */
  export type MasterDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * The filter to search for the MasterData to update in case it exists.
     */
    where: MasterDataWhereUniqueInput
    /**
     * In case the MasterData found by the `where` argument doesn't exist, create a new MasterData with this data.
     */
    create: XOR<MasterDataCreateInput, MasterDataUncheckedCreateInput>
    /**
     * In case the MasterData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterDataUpdateInput, MasterDataUncheckedUpdateInput>
  }

  /**
   * MasterData delete
   */
  export type MasterDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
    /**
     * Filter which MasterData to delete.
     */
    where: MasterDataWhereUniqueInput
  }

  /**
   * MasterData deleteMany
   */
  export type MasterDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterData to delete
     */
    where?: MasterDataWhereInput
  }

  /**
   * MasterData without action
   */
  export type MasterDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterData
     */
    select?: MasterDataSelect<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    entityName: string | null
    entityId: string | null
    actionType: $Enums.AuditAction | null
    changedBy: string | null
    updateSource: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    entityName: string | null
    entityId: string | null
    actionType: $Enums.AuditAction | null
    changedBy: string | null
    updateSource: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    entityName: number
    entityId: number
    actionType: number
    oldValues: number
    newValues: number
    changedBy: number
    updateSource: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    entityName?: true
    entityId?: true
    actionType?: true
    changedBy?: true
    updateSource?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    entityName?: true
    entityId?: true
    actionType?: true
    changedBy?: true
    updateSource?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    entityName?: true
    entityId?: true
    actionType?: true
    oldValues?: true
    newValues?: true
    changedBy?: true
    updateSource?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    entityName: string
    entityId: string
    actionType: $Enums.AuditAction
    oldValues: JsonValue | null
    newValues: JsonValue | null
    changedBy: string
    updateSource: string
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityName?: boolean
    entityId?: boolean
    actionType?: boolean
    oldValues?: boolean
    newValues?: boolean
    changedBy?: boolean
    updateSource?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityName?: boolean
    entityId?: boolean
    actionType?: boolean
    oldValues?: boolean
    newValues?: boolean
    changedBy?: boolean
    updateSource?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    entityName?: boolean
    entityId?: boolean
    actionType?: boolean
    oldValues?: boolean
    newValues?: boolean
    changedBy?: boolean
    updateSource?: boolean
    timestamp?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entityName: string
      entityId: string
      actionType: $Enums.AuditAction
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      changedBy: string
      updateSource: string
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly entityName: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly actionType: FieldRef<"AuditLog", 'AuditAction'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly changedBy: FieldRef<"AuditLog", 'String'>
    readonly updateSource: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model FilterTemplate
   */

  export type AggregateFilterTemplate = {
    _count: FilterTemplateCountAggregateOutputType | null
    _min: FilterTemplateMinAggregateOutputType | null
    _max: FilterTemplateMaxAggregateOutputType | null
  }

  export type FilterTemplateMinAggregateOutputType = {
    id: string | null
    userId: string | null
    templateName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FilterTemplateMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    templateName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FilterTemplateCountAggregateOutputType = {
    id: number
    userId: number
    templateName: number
    filterCriteria: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FilterTemplateMinAggregateInputType = {
    id?: true
    userId?: true
    templateName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FilterTemplateMaxAggregateInputType = {
    id?: true
    userId?: true
    templateName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FilterTemplateCountAggregateInputType = {
    id?: true
    userId?: true
    templateName?: true
    filterCriteria?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FilterTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FilterTemplate to aggregate.
     */
    where?: FilterTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FilterTemplates to fetch.
     */
    orderBy?: FilterTemplateOrderByWithRelationInput | FilterTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FilterTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FilterTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FilterTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FilterTemplates
    **/
    _count?: true | FilterTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FilterTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FilterTemplateMaxAggregateInputType
  }

  export type GetFilterTemplateAggregateType<T extends FilterTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateFilterTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFilterTemplate[P]>
      : GetScalarType<T[P], AggregateFilterTemplate[P]>
  }




  export type FilterTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FilterTemplateWhereInput
    orderBy?: FilterTemplateOrderByWithAggregationInput | FilterTemplateOrderByWithAggregationInput[]
    by: FilterTemplateScalarFieldEnum[] | FilterTemplateScalarFieldEnum
    having?: FilterTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FilterTemplateCountAggregateInputType | true
    _min?: FilterTemplateMinAggregateInputType
    _max?: FilterTemplateMaxAggregateInputType
  }

  export type FilterTemplateGroupByOutputType = {
    id: string
    userId: string
    templateName: string
    filterCriteria: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: FilterTemplateCountAggregateOutputType | null
    _min: FilterTemplateMinAggregateOutputType | null
    _max: FilterTemplateMaxAggregateOutputType | null
  }

  type GetFilterTemplateGroupByPayload<T extends FilterTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FilterTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FilterTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FilterTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], FilterTemplateGroupByOutputType[P]>
        }
      >
    >


  export type FilterTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateName?: boolean
    filterCriteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["filterTemplate"]>

  export type FilterTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateName?: boolean
    filterCriteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["filterTemplate"]>

  export type FilterTemplateSelectScalar = {
    id?: boolean
    userId?: boolean
    templateName?: boolean
    filterCriteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $FilterTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FilterTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      templateName: string
      filterCriteria: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["filterTemplate"]>
    composites: {}
  }

  type FilterTemplateGetPayload<S extends boolean | null | undefined | FilterTemplateDefaultArgs> = $Result.GetResult<Prisma.$FilterTemplatePayload, S>

  type FilterTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FilterTemplateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FilterTemplateCountAggregateInputType | true
    }

  export interface FilterTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FilterTemplate'], meta: { name: 'FilterTemplate' } }
    /**
     * Find zero or one FilterTemplate that matches the filter.
     * @param {FilterTemplateFindUniqueArgs} args - Arguments to find a FilterTemplate
     * @example
     * // Get one FilterTemplate
     * const filterTemplate = await prisma.filterTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FilterTemplateFindUniqueArgs>(args: SelectSubset<T, FilterTemplateFindUniqueArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FilterTemplate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FilterTemplateFindUniqueOrThrowArgs} args - Arguments to find a FilterTemplate
     * @example
     * // Get one FilterTemplate
     * const filterTemplate = await prisma.filterTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FilterTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, FilterTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FilterTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterTemplateFindFirstArgs} args - Arguments to find a FilterTemplate
     * @example
     * // Get one FilterTemplate
     * const filterTemplate = await prisma.filterTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FilterTemplateFindFirstArgs>(args?: SelectSubset<T, FilterTemplateFindFirstArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FilterTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterTemplateFindFirstOrThrowArgs} args - Arguments to find a FilterTemplate
     * @example
     * // Get one FilterTemplate
     * const filterTemplate = await prisma.filterTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FilterTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, FilterTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FilterTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FilterTemplates
     * const filterTemplates = await prisma.filterTemplate.findMany()
     * 
     * // Get first 10 FilterTemplates
     * const filterTemplates = await prisma.filterTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const filterTemplateWithIdOnly = await prisma.filterTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FilterTemplateFindManyArgs>(args?: SelectSubset<T, FilterTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FilterTemplate.
     * @param {FilterTemplateCreateArgs} args - Arguments to create a FilterTemplate.
     * @example
     * // Create one FilterTemplate
     * const FilterTemplate = await prisma.filterTemplate.create({
     *   data: {
     *     // ... data to create a FilterTemplate
     *   }
     * })
     * 
     */
    create<T extends FilterTemplateCreateArgs>(args: SelectSubset<T, FilterTemplateCreateArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FilterTemplates.
     * @param {FilterTemplateCreateManyArgs} args - Arguments to create many FilterTemplates.
     * @example
     * // Create many FilterTemplates
     * const filterTemplate = await prisma.filterTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FilterTemplateCreateManyArgs>(args?: SelectSubset<T, FilterTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FilterTemplates and returns the data saved in the database.
     * @param {FilterTemplateCreateManyAndReturnArgs} args - Arguments to create many FilterTemplates.
     * @example
     * // Create many FilterTemplates
     * const filterTemplate = await prisma.filterTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FilterTemplates and only return the `id`
     * const filterTemplateWithIdOnly = await prisma.filterTemplate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FilterTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, FilterTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FilterTemplate.
     * @param {FilterTemplateDeleteArgs} args - Arguments to delete one FilterTemplate.
     * @example
     * // Delete one FilterTemplate
     * const FilterTemplate = await prisma.filterTemplate.delete({
     *   where: {
     *     // ... filter to delete one FilterTemplate
     *   }
     * })
     * 
     */
    delete<T extends FilterTemplateDeleteArgs>(args: SelectSubset<T, FilterTemplateDeleteArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FilterTemplate.
     * @param {FilterTemplateUpdateArgs} args - Arguments to update one FilterTemplate.
     * @example
     * // Update one FilterTemplate
     * const filterTemplate = await prisma.filterTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FilterTemplateUpdateArgs>(args: SelectSubset<T, FilterTemplateUpdateArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FilterTemplates.
     * @param {FilterTemplateDeleteManyArgs} args - Arguments to filter FilterTemplates to delete.
     * @example
     * // Delete a few FilterTemplates
     * const { count } = await prisma.filterTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FilterTemplateDeleteManyArgs>(args?: SelectSubset<T, FilterTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FilterTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FilterTemplates
     * const filterTemplate = await prisma.filterTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FilterTemplateUpdateManyArgs>(args: SelectSubset<T, FilterTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FilterTemplate.
     * @param {FilterTemplateUpsertArgs} args - Arguments to update or create a FilterTemplate.
     * @example
     * // Update or create a FilterTemplate
     * const filterTemplate = await prisma.filterTemplate.upsert({
     *   create: {
     *     // ... data to create a FilterTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FilterTemplate we want to update
     *   }
     * })
     */
    upsert<T extends FilterTemplateUpsertArgs>(args: SelectSubset<T, FilterTemplateUpsertArgs<ExtArgs>>): Prisma__FilterTemplateClient<$Result.GetResult<Prisma.$FilterTemplatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FilterTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterTemplateCountArgs} args - Arguments to filter FilterTemplates to count.
     * @example
     * // Count the number of FilterTemplates
     * const count = await prisma.filterTemplate.count({
     *   where: {
     *     // ... the filter for the FilterTemplates we want to count
     *   }
     * })
    **/
    count<T extends FilterTemplateCountArgs>(
      args?: Subset<T, FilterTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FilterTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FilterTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FilterTemplateAggregateArgs>(args: Subset<T, FilterTemplateAggregateArgs>): Prisma.PrismaPromise<GetFilterTemplateAggregateType<T>>

    /**
     * Group by FilterTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FilterTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FilterTemplateGroupByArgs['orderBy'] }
        : { orderBy?: FilterTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FilterTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFilterTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FilterTemplate model
   */
  readonly fields: FilterTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FilterTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FilterTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FilterTemplate model
   */ 
  interface FilterTemplateFieldRefs {
    readonly id: FieldRef<"FilterTemplate", 'String'>
    readonly userId: FieldRef<"FilterTemplate", 'String'>
    readonly templateName: FieldRef<"FilterTemplate", 'String'>
    readonly filterCriteria: FieldRef<"FilterTemplate", 'Json'>
    readonly createdAt: FieldRef<"FilterTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"FilterTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FilterTemplate findUnique
   */
  export type FilterTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * Filter, which FilterTemplate to fetch.
     */
    where: FilterTemplateWhereUniqueInput
  }

  /**
   * FilterTemplate findUniqueOrThrow
   */
  export type FilterTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * Filter, which FilterTemplate to fetch.
     */
    where: FilterTemplateWhereUniqueInput
  }

  /**
   * FilterTemplate findFirst
   */
  export type FilterTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * Filter, which FilterTemplate to fetch.
     */
    where?: FilterTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FilterTemplates to fetch.
     */
    orderBy?: FilterTemplateOrderByWithRelationInput | FilterTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FilterTemplates.
     */
    cursor?: FilterTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FilterTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FilterTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FilterTemplates.
     */
    distinct?: FilterTemplateScalarFieldEnum | FilterTemplateScalarFieldEnum[]
  }

  /**
   * FilterTemplate findFirstOrThrow
   */
  export type FilterTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * Filter, which FilterTemplate to fetch.
     */
    where?: FilterTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FilterTemplates to fetch.
     */
    orderBy?: FilterTemplateOrderByWithRelationInput | FilterTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FilterTemplates.
     */
    cursor?: FilterTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FilterTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FilterTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FilterTemplates.
     */
    distinct?: FilterTemplateScalarFieldEnum | FilterTemplateScalarFieldEnum[]
  }

  /**
   * FilterTemplate findMany
   */
  export type FilterTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * Filter, which FilterTemplates to fetch.
     */
    where?: FilterTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FilterTemplates to fetch.
     */
    orderBy?: FilterTemplateOrderByWithRelationInput | FilterTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FilterTemplates.
     */
    cursor?: FilterTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FilterTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FilterTemplates.
     */
    skip?: number
    distinct?: FilterTemplateScalarFieldEnum | FilterTemplateScalarFieldEnum[]
  }

  /**
   * FilterTemplate create
   */
  export type FilterTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * The data needed to create a FilterTemplate.
     */
    data: XOR<FilterTemplateCreateInput, FilterTemplateUncheckedCreateInput>
  }

  /**
   * FilterTemplate createMany
   */
  export type FilterTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FilterTemplates.
     */
    data: FilterTemplateCreateManyInput | FilterTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FilterTemplate createManyAndReturn
   */
  export type FilterTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FilterTemplates.
     */
    data: FilterTemplateCreateManyInput | FilterTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FilterTemplate update
   */
  export type FilterTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * The data needed to update a FilterTemplate.
     */
    data: XOR<FilterTemplateUpdateInput, FilterTemplateUncheckedUpdateInput>
    /**
     * Choose, which FilterTemplate to update.
     */
    where: FilterTemplateWhereUniqueInput
  }

  /**
   * FilterTemplate updateMany
   */
  export type FilterTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FilterTemplates.
     */
    data: XOR<FilterTemplateUpdateManyMutationInput, FilterTemplateUncheckedUpdateManyInput>
    /**
     * Filter which FilterTemplates to update
     */
    where?: FilterTemplateWhereInput
  }

  /**
   * FilterTemplate upsert
   */
  export type FilterTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * The filter to search for the FilterTemplate to update in case it exists.
     */
    where: FilterTemplateWhereUniqueInput
    /**
     * In case the FilterTemplate found by the `where` argument doesn't exist, create a new FilterTemplate with this data.
     */
    create: XOR<FilterTemplateCreateInput, FilterTemplateUncheckedCreateInput>
    /**
     * In case the FilterTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FilterTemplateUpdateInput, FilterTemplateUncheckedUpdateInput>
  }

  /**
   * FilterTemplate delete
   */
  export type FilterTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
    /**
     * Filter which FilterTemplate to delete.
     */
    where: FilterTemplateWhereUniqueInput
  }

  /**
   * FilterTemplate deleteMany
   */
  export type FilterTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FilterTemplates to delete
     */
    where?: FilterTemplateWhereInput
  }

  /**
   * FilterTemplate without action
   */
  export type FilterTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterTemplate
     */
    select?: FilterTemplateSelect<ExtArgs> | null
  }


  /**
   * Model DraftTicket
   */

  export type AggregateDraftTicket = {
    _count: DraftTicketCountAggregateOutputType | null
    _min: DraftTicketMinAggregateOutputType | null
    _max: DraftTicketMaxAggregateOutputType | null
  }

  export type DraftTicketMinAggregateOutputType = {
    id: string | null
    sourceText: string | null
    ticketCode: string | null
    status: $Enums.TicketStatus | null
    submittedAt: Date | null
    submittedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DraftTicketMaxAggregateOutputType = {
    id: string | null
    sourceText: string | null
    ticketCode: string | null
    status: $Enums.TicketStatus | null
    submittedAt: Date | null
    submittedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DraftTicketCountAggregateOutputType = {
    id: number
    sourceText: number
    ticketCode: number
    parsedData: number
    status: number
    submittedAt: number
    submittedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DraftTicketMinAggregateInputType = {
    id?: true
    sourceText?: true
    ticketCode?: true
    status?: true
    submittedAt?: true
    submittedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DraftTicketMaxAggregateInputType = {
    id?: true
    sourceText?: true
    ticketCode?: true
    status?: true
    submittedAt?: true
    submittedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DraftTicketCountAggregateInputType = {
    id?: true
    sourceText?: true
    ticketCode?: true
    parsedData?: true
    status?: true
    submittedAt?: true
    submittedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DraftTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DraftTicket to aggregate.
     */
    where?: DraftTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DraftTickets to fetch.
     */
    orderBy?: DraftTicketOrderByWithRelationInput | DraftTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DraftTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DraftTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DraftTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DraftTickets
    **/
    _count?: true | DraftTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DraftTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DraftTicketMaxAggregateInputType
  }

  export type GetDraftTicketAggregateType<T extends DraftTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateDraftTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDraftTicket[P]>
      : GetScalarType<T[P], AggregateDraftTicket[P]>
  }




  export type DraftTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DraftTicketWhereInput
    orderBy?: DraftTicketOrderByWithAggregationInput | DraftTicketOrderByWithAggregationInput[]
    by: DraftTicketScalarFieldEnum[] | DraftTicketScalarFieldEnum
    having?: DraftTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DraftTicketCountAggregateInputType | true
    _min?: DraftTicketMinAggregateInputType
    _max?: DraftTicketMaxAggregateInputType
  }

  export type DraftTicketGroupByOutputType = {
    id: string
    sourceText: string
    ticketCode: string | null
    parsedData: JsonValue
    status: $Enums.TicketStatus
    submittedAt: Date | null
    submittedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: DraftTicketCountAggregateOutputType | null
    _min: DraftTicketMinAggregateOutputType | null
    _max: DraftTicketMaxAggregateOutputType | null
  }

  type GetDraftTicketGroupByPayload<T extends DraftTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DraftTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DraftTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DraftTicketGroupByOutputType[P]>
            : GetScalarType<T[P], DraftTicketGroupByOutputType[P]>
        }
      >
    >


  export type DraftTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceText?: boolean
    ticketCode?: boolean
    parsedData?: boolean
    status?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["draftTicket"]>

  export type DraftTicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceText?: boolean
    ticketCode?: boolean
    parsedData?: boolean
    status?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["draftTicket"]>

  export type DraftTicketSelectScalar = {
    id?: boolean
    sourceText?: boolean
    ticketCode?: boolean
    parsedData?: boolean
    status?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $DraftTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DraftTicket"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sourceText: string
      ticketCode: string | null
      parsedData: Prisma.JsonValue
      status: $Enums.TicketStatus
      submittedAt: Date | null
      submittedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["draftTicket"]>
    composites: {}
  }

  type DraftTicketGetPayload<S extends boolean | null | undefined | DraftTicketDefaultArgs> = $Result.GetResult<Prisma.$DraftTicketPayload, S>

  type DraftTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DraftTicketFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DraftTicketCountAggregateInputType | true
    }

  export interface DraftTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DraftTicket'], meta: { name: 'DraftTicket' } }
    /**
     * Find zero or one DraftTicket that matches the filter.
     * @param {DraftTicketFindUniqueArgs} args - Arguments to find a DraftTicket
     * @example
     * // Get one DraftTicket
     * const draftTicket = await prisma.draftTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DraftTicketFindUniqueArgs>(args: SelectSubset<T, DraftTicketFindUniqueArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DraftTicket that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DraftTicketFindUniqueOrThrowArgs} args - Arguments to find a DraftTicket
     * @example
     * // Get one DraftTicket
     * const draftTicket = await prisma.draftTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DraftTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, DraftTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DraftTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftTicketFindFirstArgs} args - Arguments to find a DraftTicket
     * @example
     * // Get one DraftTicket
     * const draftTicket = await prisma.draftTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DraftTicketFindFirstArgs>(args?: SelectSubset<T, DraftTicketFindFirstArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DraftTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftTicketFindFirstOrThrowArgs} args - Arguments to find a DraftTicket
     * @example
     * // Get one DraftTicket
     * const draftTicket = await prisma.draftTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DraftTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, DraftTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DraftTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DraftTickets
     * const draftTickets = await prisma.draftTicket.findMany()
     * 
     * // Get first 10 DraftTickets
     * const draftTickets = await prisma.draftTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const draftTicketWithIdOnly = await prisma.draftTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DraftTicketFindManyArgs>(args?: SelectSubset<T, DraftTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DraftTicket.
     * @param {DraftTicketCreateArgs} args - Arguments to create a DraftTicket.
     * @example
     * // Create one DraftTicket
     * const DraftTicket = await prisma.draftTicket.create({
     *   data: {
     *     // ... data to create a DraftTicket
     *   }
     * })
     * 
     */
    create<T extends DraftTicketCreateArgs>(args: SelectSubset<T, DraftTicketCreateArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DraftTickets.
     * @param {DraftTicketCreateManyArgs} args - Arguments to create many DraftTickets.
     * @example
     * // Create many DraftTickets
     * const draftTicket = await prisma.draftTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DraftTicketCreateManyArgs>(args?: SelectSubset<T, DraftTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DraftTickets and returns the data saved in the database.
     * @param {DraftTicketCreateManyAndReturnArgs} args - Arguments to create many DraftTickets.
     * @example
     * // Create many DraftTickets
     * const draftTicket = await prisma.draftTicket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DraftTickets and only return the `id`
     * const draftTicketWithIdOnly = await prisma.draftTicket.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DraftTicketCreateManyAndReturnArgs>(args?: SelectSubset<T, DraftTicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DraftTicket.
     * @param {DraftTicketDeleteArgs} args - Arguments to delete one DraftTicket.
     * @example
     * // Delete one DraftTicket
     * const DraftTicket = await prisma.draftTicket.delete({
     *   where: {
     *     // ... filter to delete one DraftTicket
     *   }
     * })
     * 
     */
    delete<T extends DraftTicketDeleteArgs>(args: SelectSubset<T, DraftTicketDeleteArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DraftTicket.
     * @param {DraftTicketUpdateArgs} args - Arguments to update one DraftTicket.
     * @example
     * // Update one DraftTicket
     * const draftTicket = await prisma.draftTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DraftTicketUpdateArgs>(args: SelectSubset<T, DraftTicketUpdateArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DraftTickets.
     * @param {DraftTicketDeleteManyArgs} args - Arguments to filter DraftTickets to delete.
     * @example
     * // Delete a few DraftTickets
     * const { count } = await prisma.draftTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DraftTicketDeleteManyArgs>(args?: SelectSubset<T, DraftTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DraftTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DraftTickets
     * const draftTicket = await prisma.draftTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DraftTicketUpdateManyArgs>(args: SelectSubset<T, DraftTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DraftTicket.
     * @param {DraftTicketUpsertArgs} args - Arguments to update or create a DraftTicket.
     * @example
     * // Update or create a DraftTicket
     * const draftTicket = await prisma.draftTicket.upsert({
     *   create: {
     *     // ... data to create a DraftTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DraftTicket we want to update
     *   }
     * })
     */
    upsert<T extends DraftTicketUpsertArgs>(args: SelectSubset<T, DraftTicketUpsertArgs<ExtArgs>>): Prisma__DraftTicketClient<$Result.GetResult<Prisma.$DraftTicketPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DraftTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftTicketCountArgs} args - Arguments to filter DraftTickets to count.
     * @example
     * // Count the number of DraftTickets
     * const count = await prisma.draftTicket.count({
     *   where: {
     *     // ... the filter for the DraftTickets we want to count
     *   }
     * })
    **/
    count<T extends DraftTicketCountArgs>(
      args?: Subset<T, DraftTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DraftTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DraftTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DraftTicketAggregateArgs>(args: Subset<T, DraftTicketAggregateArgs>): Prisma.PrismaPromise<GetDraftTicketAggregateType<T>>

    /**
     * Group by DraftTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftTicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DraftTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DraftTicketGroupByArgs['orderBy'] }
        : { orderBy?: DraftTicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DraftTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDraftTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DraftTicket model
   */
  readonly fields: DraftTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DraftTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DraftTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DraftTicket model
   */ 
  interface DraftTicketFieldRefs {
    readonly id: FieldRef<"DraftTicket", 'String'>
    readonly sourceText: FieldRef<"DraftTicket", 'String'>
    readonly ticketCode: FieldRef<"DraftTicket", 'String'>
    readonly parsedData: FieldRef<"DraftTicket", 'Json'>
    readonly status: FieldRef<"DraftTicket", 'TicketStatus'>
    readonly submittedAt: FieldRef<"DraftTicket", 'DateTime'>
    readonly submittedBy: FieldRef<"DraftTicket", 'String'>
    readonly createdAt: FieldRef<"DraftTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"DraftTicket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DraftTicket findUnique
   */
  export type DraftTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * Filter, which DraftTicket to fetch.
     */
    where: DraftTicketWhereUniqueInput
  }

  /**
   * DraftTicket findUniqueOrThrow
   */
  export type DraftTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * Filter, which DraftTicket to fetch.
     */
    where: DraftTicketWhereUniqueInput
  }

  /**
   * DraftTicket findFirst
   */
  export type DraftTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * Filter, which DraftTicket to fetch.
     */
    where?: DraftTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DraftTickets to fetch.
     */
    orderBy?: DraftTicketOrderByWithRelationInput | DraftTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DraftTickets.
     */
    cursor?: DraftTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DraftTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DraftTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DraftTickets.
     */
    distinct?: DraftTicketScalarFieldEnum | DraftTicketScalarFieldEnum[]
  }

  /**
   * DraftTicket findFirstOrThrow
   */
  export type DraftTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * Filter, which DraftTicket to fetch.
     */
    where?: DraftTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DraftTickets to fetch.
     */
    orderBy?: DraftTicketOrderByWithRelationInput | DraftTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DraftTickets.
     */
    cursor?: DraftTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DraftTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DraftTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DraftTickets.
     */
    distinct?: DraftTicketScalarFieldEnum | DraftTicketScalarFieldEnum[]
  }

  /**
   * DraftTicket findMany
   */
  export type DraftTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * Filter, which DraftTickets to fetch.
     */
    where?: DraftTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DraftTickets to fetch.
     */
    orderBy?: DraftTicketOrderByWithRelationInput | DraftTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DraftTickets.
     */
    cursor?: DraftTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DraftTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DraftTickets.
     */
    skip?: number
    distinct?: DraftTicketScalarFieldEnum | DraftTicketScalarFieldEnum[]
  }

  /**
   * DraftTicket create
   */
  export type DraftTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * The data needed to create a DraftTicket.
     */
    data: XOR<DraftTicketCreateInput, DraftTicketUncheckedCreateInput>
  }

  /**
   * DraftTicket createMany
   */
  export type DraftTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DraftTickets.
     */
    data: DraftTicketCreateManyInput | DraftTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DraftTicket createManyAndReturn
   */
  export type DraftTicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DraftTickets.
     */
    data: DraftTicketCreateManyInput | DraftTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DraftTicket update
   */
  export type DraftTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * The data needed to update a DraftTicket.
     */
    data: XOR<DraftTicketUpdateInput, DraftTicketUncheckedUpdateInput>
    /**
     * Choose, which DraftTicket to update.
     */
    where: DraftTicketWhereUniqueInput
  }

  /**
   * DraftTicket updateMany
   */
  export type DraftTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DraftTickets.
     */
    data: XOR<DraftTicketUpdateManyMutationInput, DraftTicketUncheckedUpdateManyInput>
    /**
     * Filter which DraftTickets to update
     */
    where?: DraftTicketWhereInput
  }

  /**
   * DraftTicket upsert
   */
  export type DraftTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * The filter to search for the DraftTicket to update in case it exists.
     */
    where: DraftTicketWhereUniqueInput
    /**
     * In case the DraftTicket found by the `where` argument doesn't exist, create a new DraftTicket with this data.
     */
    create: XOR<DraftTicketCreateInput, DraftTicketUncheckedCreateInput>
    /**
     * In case the DraftTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DraftTicketUpdateInput, DraftTicketUncheckedUpdateInput>
  }

  /**
   * DraftTicket delete
   */
  export type DraftTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
    /**
     * Filter which DraftTicket to delete.
     */
    where: DraftTicketWhereUniqueInput
  }

  /**
   * DraftTicket deleteMany
   */
  export type DraftTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DraftTickets to delete
     */
    where?: DraftTicketWhereInput
  }

  /**
   * DraftTicket without action
   */
  export type DraftTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DraftTicket
     */
    select?: DraftTicketSelect<ExtArgs> | null
  }


  /**
   * Model PortalTicket
   */

  export type AggregatePortalTicket = {
    _count: PortalTicketCountAggregateOutputType | null
    _min: PortalTicketMinAggregateOutputType | null
    _max: PortalTicketMaxAggregateOutputType | null
  }

  export type PortalTicketMinAggregateOutputType = {
    id: string | null
    ticketCode: string | null
    currentStep: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type PortalTicketMaxAggregateOutputType = {
    id: string | null
    ticketCode: string | null
    currentStep: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type PortalTicketCountAggregateOutputType = {
    id: number
    ticketCode: number
    currentStep: number
    flowData: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type PortalTicketMinAggregateInputType = {
    id?: true
    ticketCode?: true
    currentStep?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type PortalTicketMaxAggregateInputType = {
    id?: true
    ticketCode?: true
    currentStep?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type PortalTicketCountAggregateInputType = {
    id?: true
    ticketCode?: true
    currentStep?: true
    flowData?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type PortalTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalTicket to aggregate.
     */
    where?: PortalTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalTickets to fetch.
     */
    orderBy?: PortalTicketOrderByWithRelationInput | PortalTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortalTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortalTickets
    **/
    _count?: true | PortalTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortalTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortalTicketMaxAggregateInputType
  }

  export type GetPortalTicketAggregateType<T extends PortalTicketAggregateArgs> = {
        [P in keyof T & keyof AggregatePortalTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortalTicket[P]>
      : GetScalarType<T[P], AggregatePortalTicket[P]>
  }




  export type PortalTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalTicketWhereInput
    orderBy?: PortalTicketOrderByWithAggregationInput | PortalTicketOrderByWithAggregationInput[]
    by: PortalTicketScalarFieldEnum[] | PortalTicketScalarFieldEnum
    having?: PortalTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortalTicketCountAggregateInputType | true
    _min?: PortalTicketMinAggregateInputType
    _max?: PortalTicketMaxAggregateInputType
  }

  export type PortalTicketGroupByOutputType = {
    id: string
    ticketCode: string
    currentStep: string
    flowData: JsonValue
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
    _count: PortalTicketCountAggregateOutputType | null
    _min: PortalTicketMinAggregateOutputType | null
    _max: PortalTicketMaxAggregateOutputType | null
  }

  type GetPortalTicketGroupByPayload<T extends PortalTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortalTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortalTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortalTicketGroupByOutputType[P]>
            : GetScalarType<T[P], PortalTicketGroupByOutputType[P]>
        }
      >
    >


  export type PortalTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketCode?: boolean
    currentStep?: boolean
    flowData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["portalTicket"]>

  export type PortalTicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketCode?: boolean
    currentStep?: boolean
    flowData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["portalTicket"]>

  export type PortalTicketSelectScalar = {
    id?: boolean
    ticketCode?: boolean
    currentStep?: boolean
    flowData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }


  export type $PortalTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortalTicket"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ticketCode: string
      currentStep: string
      flowData: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      createdBy: string
      updatedBy: string
    }, ExtArgs["result"]["portalTicket"]>
    composites: {}
  }

  type PortalTicketGetPayload<S extends boolean | null | undefined | PortalTicketDefaultArgs> = $Result.GetResult<Prisma.$PortalTicketPayload, S>

  type PortalTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PortalTicketFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PortalTicketCountAggregateInputType | true
    }

  export interface PortalTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortalTicket'], meta: { name: 'PortalTicket' } }
    /**
     * Find zero or one PortalTicket that matches the filter.
     * @param {PortalTicketFindUniqueArgs} args - Arguments to find a PortalTicket
     * @example
     * // Get one PortalTicket
     * const portalTicket = await prisma.portalTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortalTicketFindUniqueArgs>(args: SelectSubset<T, PortalTicketFindUniqueArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PortalTicket that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PortalTicketFindUniqueOrThrowArgs} args - Arguments to find a PortalTicket
     * @example
     * // Get one PortalTicket
     * const portalTicket = await prisma.portalTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortalTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, PortalTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PortalTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalTicketFindFirstArgs} args - Arguments to find a PortalTicket
     * @example
     * // Get one PortalTicket
     * const portalTicket = await prisma.portalTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortalTicketFindFirstArgs>(args?: SelectSubset<T, PortalTicketFindFirstArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PortalTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalTicketFindFirstOrThrowArgs} args - Arguments to find a PortalTicket
     * @example
     * // Get one PortalTicket
     * const portalTicket = await prisma.portalTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortalTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, PortalTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PortalTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortalTickets
     * const portalTickets = await prisma.portalTicket.findMany()
     * 
     * // Get first 10 PortalTickets
     * const portalTickets = await prisma.portalTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portalTicketWithIdOnly = await prisma.portalTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortalTicketFindManyArgs>(args?: SelectSubset<T, PortalTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PortalTicket.
     * @param {PortalTicketCreateArgs} args - Arguments to create a PortalTicket.
     * @example
     * // Create one PortalTicket
     * const PortalTicket = await prisma.portalTicket.create({
     *   data: {
     *     // ... data to create a PortalTicket
     *   }
     * })
     * 
     */
    create<T extends PortalTicketCreateArgs>(args: SelectSubset<T, PortalTicketCreateArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PortalTickets.
     * @param {PortalTicketCreateManyArgs} args - Arguments to create many PortalTickets.
     * @example
     * // Create many PortalTickets
     * const portalTicket = await prisma.portalTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortalTicketCreateManyArgs>(args?: SelectSubset<T, PortalTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortalTickets and returns the data saved in the database.
     * @param {PortalTicketCreateManyAndReturnArgs} args - Arguments to create many PortalTickets.
     * @example
     * // Create many PortalTickets
     * const portalTicket = await prisma.portalTicket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortalTickets and only return the `id`
     * const portalTicketWithIdOnly = await prisma.portalTicket.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortalTicketCreateManyAndReturnArgs>(args?: SelectSubset<T, PortalTicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PortalTicket.
     * @param {PortalTicketDeleteArgs} args - Arguments to delete one PortalTicket.
     * @example
     * // Delete one PortalTicket
     * const PortalTicket = await prisma.portalTicket.delete({
     *   where: {
     *     // ... filter to delete one PortalTicket
     *   }
     * })
     * 
     */
    delete<T extends PortalTicketDeleteArgs>(args: SelectSubset<T, PortalTicketDeleteArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PortalTicket.
     * @param {PortalTicketUpdateArgs} args - Arguments to update one PortalTicket.
     * @example
     * // Update one PortalTicket
     * const portalTicket = await prisma.portalTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortalTicketUpdateArgs>(args: SelectSubset<T, PortalTicketUpdateArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PortalTickets.
     * @param {PortalTicketDeleteManyArgs} args - Arguments to filter PortalTickets to delete.
     * @example
     * // Delete a few PortalTickets
     * const { count } = await prisma.portalTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortalTicketDeleteManyArgs>(args?: SelectSubset<T, PortalTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortalTickets
     * const portalTicket = await prisma.portalTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortalTicketUpdateManyArgs>(args: SelectSubset<T, PortalTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PortalTicket.
     * @param {PortalTicketUpsertArgs} args - Arguments to update or create a PortalTicket.
     * @example
     * // Update or create a PortalTicket
     * const portalTicket = await prisma.portalTicket.upsert({
     *   create: {
     *     // ... data to create a PortalTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortalTicket we want to update
     *   }
     * })
     */
    upsert<T extends PortalTicketUpsertArgs>(args: SelectSubset<T, PortalTicketUpsertArgs<ExtArgs>>): Prisma__PortalTicketClient<$Result.GetResult<Prisma.$PortalTicketPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PortalTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalTicketCountArgs} args - Arguments to filter PortalTickets to count.
     * @example
     * // Count the number of PortalTickets
     * const count = await prisma.portalTicket.count({
     *   where: {
     *     // ... the filter for the PortalTickets we want to count
     *   }
     * })
    **/
    count<T extends PortalTicketCountArgs>(
      args?: Subset<T, PortalTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortalTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortalTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortalTicketAggregateArgs>(args: Subset<T, PortalTicketAggregateArgs>): Prisma.PrismaPromise<GetPortalTicketAggregateType<T>>

    /**
     * Group by PortalTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalTicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortalTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortalTicketGroupByArgs['orderBy'] }
        : { orderBy?: PortalTicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortalTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortalTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortalTicket model
   */
  readonly fields: PortalTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortalTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortalTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortalTicket model
   */ 
  interface PortalTicketFieldRefs {
    readonly id: FieldRef<"PortalTicket", 'String'>
    readonly ticketCode: FieldRef<"PortalTicket", 'String'>
    readonly currentStep: FieldRef<"PortalTicket", 'String'>
    readonly flowData: FieldRef<"PortalTicket", 'Json'>
    readonly createdAt: FieldRef<"PortalTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"PortalTicket", 'DateTime'>
    readonly createdBy: FieldRef<"PortalTicket", 'String'>
    readonly updatedBy: FieldRef<"PortalTicket", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PortalTicket findUnique
   */
  export type PortalTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * Filter, which PortalTicket to fetch.
     */
    where: PortalTicketWhereUniqueInput
  }

  /**
   * PortalTicket findUniqueOrThrow
   */
  export type PortalTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * Filter, which PortalTicket to fetch.
     */
    where: PortalTicketWhereUniqueInput
  }

  /**
   * PortalTicket findFirst
   */
  export type PortalTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * Filter, which PortalTicket to fetch.
     */
    where?: PortalTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalTickets to fetch.
     */
    orderBy?: PortalTicketOrderByWithRelationInput | PortalTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalTickets.
     */
    cursor?: PortalTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalTickets.
     */
    distinct?: PortalTicketScalarFieldEnum | PortalTicketScalarFieldEnum[]
  }

  /**
   * PortalTicket findFirstOrThrow
   */
  export type PortalTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * Filter, which PortalTicket to fetch.
     */
    where?: PortalTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalTickets to fetch.
     */
    orderBy?: PortalTicketOrderByWithRelationInput | PortalTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalTickets.
     */
    cursor?: PortalTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalTickets.
     */
    distinct?: PortalTicketScalarFieldEnum | PortalTicketScalarFieldEnum[]
  }

  /**
   * PortalTicket findMany
   */
  export type PortalTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * Filter, which PortalTickets to fetch.
     */
    where?: PortalTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalTickets to fetch.
     */
    orderBy?: PortalTicketOrderByWithRelationInput | PortalTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortalTickets.
     */
    cursor?: PortalTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalTickets.
     */
    skip?: number
    distinct?: PortalTicketScalarFieldEnum | PortalTicketScalarFieldEnum[]
  }

  /**
   * PortalTicket create
   */
  export type PortalTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * The data needed to create a PortalTicket.
     */
    data: XOR<PortalTicketCreateInput, PortalTicketUncheckedCreateInput>
  }

  /**
   * PortalTicket createMany
   */
  export type PortalTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortalTickets.
     */
    data: PortalTicketCreateManyInput | PortalTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalTicket createManyAndReturn
   */
  export type PortalTicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PortalTickets.
     */
    data: PortalTicketCreateManyInput | PortalTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalTicket update
   */
  export type PortalTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * The data needed to update a PortalTicket.
     */
    data: XOR<PortalTicketUpdateInput, PortalTicketUncheckedUpdateInput>
    /**
     * Choose, which PortalTicket to update.
     */
    where: PortalTicketWhereUniqueInput
  }

  /**
   * PortalTicket updateMany
   */
  export type PortalTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortalTickets.
     */
    data: XOR<PortalTicketUpdateManyMutationInput, PortalTicketUncheckedUpdateManyInput>
    /**
     * Filter which PortalTickets to update
     */
    where?: PortalTicketWhereInput
  }

  /**
   * PortalTicket upsert
   */
  export type PortalTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * The filter to search for the PortalTicket to update in case it exists.
     */
    where: PortalTicketWhereUniqueInput
    /**
     * In case the PortalTicket found by the `where` argument doesn't exist, create a new PortalTicket with this data.
     */
    create: XOR<PortalTicketCreateInput, PortalTicketUncheckedCreateInput>
    /**
     * In case the PortalTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortalTicketUpdateInput, PortalTicketUncheckedUpdateInput>
  }

  /**
   * PortalTicket delete
   */
  export type PortalTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
    /**
     * Filter which PortalTicket to delete.
     */
    where: PortalTicketWhereUniqueInput
  }

  /**
   * PortalTicket deleteMany
   */
  export type PortalTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalTickets to delete
     */
    where?: PortalTicketWhereInput
  }

  /**
   * PortalTicket without action
   */
  export type PortalTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalTicket
     */
    select?: PortalTicketSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AssetScalarFieldEnum: {
    id: 'id',
    barcode: 'barcode',
    prefix: 'prefix',
    asmsBarcode: 'asmsBarcode',
    invoiceId: 'invoiceId',
    serialNumber: 'serialNumber',
    quantity: 'quantity',
    description: 'description',
    originalCost: 'originalCost',
    assetTypeId: 'assetTypeId',
    purchaseDate: 'purchaseDate',
    warrantyExpiry: 'warrantyExpiry',
    locationId: 'locationId',
    floorId: 'floorId',
    ownerId: 'ownerId',
    purchasingUnitId: 'purchasingUnitId',
    seatCode: 'seatCode',
    status: 'status',
    ticketId: 'ticketId',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
  };

  export type AssetScalarFieldEnum = (typeof AssetScalarFieldEnum)[keyof typeof AssetScalarFieldEnum]


  export const BarcodeSequenceScalarFieldEnum: {
    prefix: 'prefix',
    lastValue: 'lastValue',
    updatedAt: 'updatedAt'
  };

  export type BarcodeSequenceScalarFieldEnum = (typeof BarcodeSequenceScalarFieldEnum)[keyof typeof BarcodeSequenceScalarFieldEnum]


  export const MasterDataScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    code: 'code',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MasterDataScalarFieldEnum = (typeof MasterDataScalarFieldEnum)[keyof typeof MasterDataScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    entityName: 'entityName',
    entityId: 'entityId',
    actionType: 'actionType',
    oldValues: 'oldValues',
    newValues: 'newValues',
    changedBy: 'changedBy',
    updateSource: 'updateSource',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const FilterTemplateScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    templateName: 'templateName',
    filterCriteria: 'filterCriteria',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FilterTemplateScalarFieldEnum = (typeof FilterTemplateScalarFieldEnum)[keyof typeof FilterTemplateScalarFieldEnum]


  export const DraftTicketScalarFieldEnum: {
    id: 'id',
    sourceText: 'sourceText',
    ticketCode: 'ticketCode',
    parsedData: 'parsedData',
    status: 'status',
    submittedAt: 'submittedAt',
    submittedBy: 'submittedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DraftTicketScalarFieldEnum = (typeof DraftTicketScalarFieldEnum)[keyof typeof DraftTicketScalarFieldEnum]


  export const PortalTicketScalarFieldEnum: {
    id: 'id',
    ticketCode: 'ticketCode',
    currentStep: 'currentStep',
    flowData: 'flowData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
  };

  export type PortalTicketScalarFieldEnum = (typeof PortalTicketScalarFieldEnum)[keyof typeof PortalTicketScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AssetStatus'
   */
  export type EnumAssetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetStatus'>
    


  /**
   * Reference to a field of type 'AssetStatus[]'
   */
  export type ListEnumAssetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetStatus[]'>
    


  /**
   * Reference to a field of type 'MasterDataType'
   */
  export type EnumMasterDataTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MasterDataType'>
    


  /**
   * Reference to a field of type 'MasterDataType[]'
   */
  export type ListEnumMasterDataTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MasterDataType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'AuditAction'
   */
  export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>
    


  /**
   * Reference to a field of type 'AuditAction[]'
   */
  export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AssetWhereInput = {
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    id?: StringFilter<"Asset"> | string
    barcode?: StringFilter<"Asset"> | string
    prefix?: StringFilter<"Asset"> | string
    asmsBarcode?: StringNullableFilter<"Asset"> | string | null
    invoiceId?: StringNullableFilter<"Asset"> | string | null
    serialNumber?: StringNullableFilter<"Asset"> | string | null
    quantity?: IntFilter<"Asset"> | number
    description?: StringNullableFilter<"Asset"> | string | null
    originalCost?: DecimalNullableFilter<"Asset"> | Decimal | DecimalJsLike | number | string | null
    assetTypeId?: StringNullableFilter<"Asset"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Asset"> | Date | string | null
    warrantyExpiry?: DateTimeNullableFilter<"Asset"> | Date | string | null
    locationId?: StringNullableFilter<"Asset"> | string | null
    floorId?: StringNullableFilter<"Asset"> | string | null
    ownerId?: StringNullableFilter<"Asset"> | string | null
    purchasingUnitId?: StringNullableFilter<"Asset"> | string | null
    seatCode?: StringNullableFilter<"Asset"> | string | null
    status?: EnumAssetStatusFilter<"Asset"> | $Enums.AssetStatus
    ticketId?: StringNullableFilter<"Asset"> | string | null
    note?: StringNullableFilter<"Asset"> | string | null
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    updatedAt?: DateTimeFilter<"Asset"> | Date | string
    createdBy?: StringFilter<"Asset"> | string
    updatedBy?: StringFilter<"Asset"> | string
  }

  export type AssetOrderByWithRelationInput = {
    id?: SortOrder
    barcode?: SortOrder
    prefix?: SortOrder
    asmsBarcode?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    quantity?: SortOrder
    description?: SortOrderInput | SortOrder
    originalCost?: SortOrderInput | SortOrder
    assetTypeId?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    warrantyExpiry?: SortOrderInput | SortOrder
    locationId?: SortOrderInput | SortOrder
    floorId?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    purchasingUnitId?: SortOrderInput | SortOrder
    seatCode?: SortOrderInput | SortOrder
    status?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type AssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    barcode?: string
    asmsBarcode?: string
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    prefix?: StringFilter<"Asset"> | string
    invoiceId?: StringNullableFilter<"Asset"> | string | null
    serialNumber?: StringNullableFilter<"Asset"> | string | null
    quantity?: IntFilter<"Asset"> | number
    description?: StringNullableFilter<"Asset"> | string | null
    originalCost?: DecimalNullableFilter<"Asset"> | Decimal | DecimalJsLike | number | string | null
    assetTypeId?: StringNullableFilter<"Asset"> | string | null
    purchaseDate?: DateTimeNullableFilter<"Asset"> | Date | string | null
    warrantyExpiry?: DateTimeNullableFilter<"Asset"> | Date | string | null
    locationId?: StringNullableFilter<"Asset"> | string | null
    floorId?: StringNullableFilter<"Asset"> | string | null
    ownerId?: StringNullableFilter<"Asset"> | string | null
    purchasingUnitId?: StringNullableFilter<"Asset"> | string | null
    seatCode?: StringNullableFilter<"Asset"> | string | null
    status?: EnumAssetStatusFilter<"Asset"> | $Enums.AssetStatus
    ticketId?: StringNullableFilter<"Asset"> | string | null
    note?: StringNullableFilter<"Asset"> | string | null
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    updatedAt?: DateTimeFilter<"Asset"> | Date | string
    createdBy?: StringFilter<"Asset"> | string
    updatedBy?: StringFilter<"Asset"> | string
  }, "id" | "barcode" | "asmsBarcode">

  export type AssetOrderByWithAggregationInput = {
    id?: SortOrder
    barcode?: SortOrder
    prefix?: SortOrder
    asmsBarcode?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    quantity?: SortOrder
    description?: SortOrderInput | SortOrder
    originalCost?: SortOrderInput | SortOrder
    assetTypeId?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    warrantyExpiry?: SortOrderInput | SortOrder
    locationId?: SortOrderInput | SortOrder
    floorId?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    purchasingUnitId?: SortOrderInput | SortOrder
    seatCode?: SortOrderInput | SortOrder
    status?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    _count?: AssetCountOrderByAggregateInput
    _avg?: AssetAvgOrderByAggregateInput
    _max?: AssetMaxOrderByAggregateInput
    _min?: AssetMinOrderByAggregateInput
    _sum?: AssetSumOrderByAggregateInput
  }

  export type AssetScalarWhereWithAggregatesInput = {
    AND?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    OR?: AssetScalarWhereWithAggregatesInput[]
    NOT?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Asset"> | string
    barcode?: StringWithAggregatesFilter<"Asset"> | string
    prefix?: StringWithAggregatesFilter<"Asset"> | string
    asmsBarcode?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    invoiceId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    serialNumber?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    quantity?: IntWithAggregatesFilter<"Asset"> | number
    description?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    originalCost?: DecimalNullableWithAggregatesFilter<"Asset"> | Decimal | DecimalJsLike | number | string | null
    assetTypeId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    purchaseDate?: DateTimeNullableWithAggregatesFilter<"Asset"> | Date | string | null
    warrantyExpiry?: DateTimeNullableWithAggregatesFilter<"Asset"> | Date | string | null
    locationId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    floorId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    ownerId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    purchasingUnitId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    seatCode?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    status?: EnumAssetStatusWithAggregatesFilter<"Asset"> | $Enums.AssetStatus
    ticketId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    note?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Asset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Asset"> | Date | string
    createdBy?: StringWithAggregatesFilter<"Asset"> | string
    updatedBy?: StringWithAggregatesFilter<"Asset"> | string
  }

  export type BarcodeSequenceWhereInput = {
    AND?: BarcodeSequenceWhereInput | BarcodeSequenceWhereInput[]
    OR?: BarcodeSequenceWhereInput[]
    NOT?: BarcodeSequenceWhereInput | BarcodeSequenceWhereInput[]
    prefix?: StringFilter<"BarcodeSequence"> | string
    lastValue?: IntFilter<"BarcodeSequence"> | number
    updatedAt?: DateTimeFilter<"BarcodeSequence"> | Date | string
  }

  export type BarcodeSequenceOrderByWithRelationInput = {
    prefix?: SortOrder
    lastValue?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarcodeSequenceWhereUniqueInput = Prisma.AtLeast<{
    prefix?: string
    AND?: BarcodeSequenceWhereInput | BarcodeSequenceWhereInput[]
    OR?: BarcodeSequenceWhereInput[]
    NOT?: BarcodeSequenceWhereInput | BarcodeSequenceWhereInput[]
    lastValue?: IntFilter<"BarcodeSequence"> | number
    updatedAt?: DateTimeFilter<"BarcodeSequence"> | Date | string
  }, "prefix">

  export type BarcodeSequenceOrderByWithAggregationInput = {
    prefix?: SortOrder
    lastValue?: SortOrder
    updatedAt?: SortOrder
    _count?: BarcodeSequenceCountOrderByAggregateInput
    _avg?: BarcodeSequenceAvgOrderByAggregateInput
    _max?: BarcodeSequenceMaxOrderByAggregateInput
    _min?: BarcodeSequenceMinOrderByAggregateInput
    _sum?: BarcodeSequenceSumOrderByAggregateInput
  }

  export type BarcodeSequenceScalarWhereWithAggregatesInput = {
    AND?: BarcodeSequenceScalarWhereWithAggregatesInput | BarcodeSequenceScalarWhereWithAggregatesInput[]
    OR?: BarcodeSequenceScalarWhereWithAggregatesInput[]
    NOT?: BarcodeSequenceScalarWhereWithAggregatesInput | BarcodeSequenceScalarWhereWithAggregatesInput[]
    prefix?: StringWithAggregatesFilter<"BarcodeSequence"> | string
    lastValue?: IntWithAggregatesFilter<"BarcodeSequence"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"BarcodeSequence"> | Date | string
  }

  export type MasterDataWhereInput = {
    AND?: MasterDataWhereInput | MasterDataWhereInput[]
    OR?: MasterDataWhereInput[]
    NOT?: MasterDataWhereInput | MasterDataWhereInput[]
    id?: StringFilter<"MasterData"> | string
    type?: EnumMasterDataTypeFilter<"MasterData"> | $Enums.MasterDataType
    name?: StringFilter<"MasterData"> | string
    code?: StringNullableFilter<"MasterData"> | string | null
    active?: BoolFilter<"MasterData"> | boolean
    createdAt?: DateTimeFilter<"MasterData"> | Date | string
    updatedAt?: DateTimeFilter<"MasterData"> | Date | string
  }

  export type MasterDataOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    type_name?: MasterDataTypeNameCompoundUniqueInput
    AND?: MasterDataWhereInput | MasterDataWhereInput[]
    OR?: MasterDataWhereInput[]
    NOT?: MasterDataWhereInput | MasterDataWhereInput[]
    type?: EnumMasterDataTypeFilter<"MasterData"> | $Enums.MasterDataType
    name?: StringFilter<"MasterData"> | string
    code?: StringNullableFilter<"MasterData"> | string | null
    active?: BoolFilter<"MasterData"> | boolean
    createdAt?: DateTimeFilter<"MasterData"> | Date | string
    updatedAt?: DateTimeFilter<"MasterData"> | Date | string
  }, "id" | "type_name">

  export type MasterDataOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MasterDataCountOrderByAggregateInput
    _max?: MasterDataMaxOrderByAggregateInput
    _min?: MasterDataMinOrderByAggregateInput
  }

  export type MasterDataScalarWhereWithAggregatesInput = {
    AND?: MasterDataScalarWhereWithAggregatesInput | MasterDataScalarWhereWithAggregatesInput[]
    OR?: MasterDataScalarWhereWithAggregatesInput[]
    NOT?: MasterDataScalarWhereWithAggregatesInput | MasterDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasterData"> | string
    type?: EnumMasterDataTypeWithAggregatesFilter<"MasterData"> | $Enums.MasterDataType
    name?: StringWithAggregatesFilter<"MasterData"> | string
    code?: StringNullableWithAggregatesFilter<"MasterData"> | string | null
    active?: BoolWithAggregatesFilter<"MasterData"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MasterData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MasterData"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    entityName?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    actionType?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    changedBy?: StringFilter<"AuditLog"> | string
    updateSource?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    entityName?: SortOrder
    entityId?: SortOrder
    actionType?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    changedBy?: SortOrder
    updateSource?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    entityName?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    actionType?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    changedBy?: StringFilter<"AuditLog"> | string
    updateSource?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    entityName?: SortOrder
    entityId?: SortOrder
    actionType?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    changedBy?: SortOrder
    updateSource?: SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    entityName?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    actionType?: EnumAuditActionWithAggregatesFilter<"AuditLog"> | $Enums.AuditAction
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    changedBy?: StringWithAggregatesFilter<"AuditLog"> | string
    updateSource?: StringWithAggregatesFilter<"AuditLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type FilterTemplateWhereInput = {
    AND?: FilterTemplateWhereInput | FilterTemplateWhereInput[]
    OR?: FilterTemplateWhereInput[]
    NOT?: FilterTemplateWhereInput | FilterTemplateWhereInput[]
    id?: StringFilter<"FilterTemplate"> | string
    userId?: StringFilter<"FilterTemplate"> | string
    templateName?: StringFilter<"FilterTemplate"> | string
    filterCriteria?: JsonFilter<"FilterTemplate">
    createdAt?: DateTimeFilter<"FilterTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"FilterTemplate"> | Date | string
  }

  export type FilterTemplateOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    templateName?: SortOrder
    filterCriteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FilterTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_templateName?: FilterTemplateUserIdTemplateNameCompoundUniqueInput
    AND?: FilterTemplateWhereInput | FilterTemplateWhereInput[]
    OR?: FilterTemplateWhereInput[]
    NOT?: FilterTemplateWhereInput | FilterTemplateWhereInput[]
    userId?: StringFilter<"FilterTemplate"> | string
    templateName?: StringFilter<"FilterTemplate"> | string
    filterCriteria?: JsonFilter<"FilterTemplate">
    createdAt?: DateTimeFilter<"FilterTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"FilterTemplate"> | Date | string
  }, "id" | "userId_templateName">

  export type FilterTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    templateName?: SortOrder
    filterCriteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FilterTemplateCountOrderByAggregateInput
    _max?: FilterTemplateMaxOrderByAggregateInput
    _min?: FilterTemplateMinOrderByAggregateInput
  }

  export type FilterTemplateScalarWhereWithAggregatesInput = {
    AND?: FilterTemplateScalarWhereWithAggregatesInput | FilterTemplateScalarWhereWithAggregatesInput[]
    OR?: FilterTemplateScalarWhereWithAggregatesInput[]
    NOT?: FilterTemplateScalarWhereWithAggregatesInput | FilterTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FilterTemplate"> | string
    userId?: StringWithAggregatesFilter<"FilterTemplate"> | string
    templateName?: StringWithAggregatesFilter<"FilterTemplate"> | string
    filterCriteria?: JsonWithAggregatesFilter<"FilterTemplate">
    createdAt?: DateTimeWithAggregatesFilter<"FilterTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FilterTemplate"> | Date | string
  }

  export type DraftTicketWhereInput = {
    AND?: DraftTicketWhereInput | DraftTicketWhereInput[]
    OR?: DraftTicketWhereInput[]
    NOT?: DraftTicketWhereInput | DraftTicketWhereInput[]
    id?: StringFilter<"DraftTicket"> | string
    sourceText?: StringFilter<"DraftTicket"> | string
    ticketCode?: StringNullableFilter<"DraftTicket"> | string | null
    parsedData?: JsonFilter<"DraftTicket">
    status?: EnumTicketStatusFilter<"DraftTicket"> | $Enums.TicketStatus
    submittedAt?: DateTimeNullableFilter<"DraftTicket"> | Date | string | null
    submittedBy?: StringNullableFilter<"DraftTicket"> | string | null
    createdAt?: DateTimeFilter<"DraftTicket"> | Date | string
    updatedAt?: DateTimeFilter<"DraftTicket"> | Date | string
  }

  export type DraftTicketOrderByWithRelationInput = {
    id?: SortOrder
    sourceText?: SortOrder
    ticketCode?: SortOrderInput | SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    submittedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DraftTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DraftTicketWhereInput | DraftTicketWhereInput[]
    OR?: DraftTicketWhereInput[]
    NOT?: DraftTicketWhereInput | DraftTicketWhereInput[]
    sourceText?: StringFilter<"DraftTicket"> | string
    ticketCode?: StringNullableFilter<"DraftTicket"> | string | null
    parsedData?: JsonFilter<"DraftTicket">
    status?: EnumTicketStatusFilter<"DraftTicket"> | $Enums.TicketStatus
    submittedAt?: DateTimeNullableFilter<"DraftTicket"> | Date | string | null
    submittedBy?: StringNullableFilter<"DraftTicket"> | string | null
    createdAt?: DateTimeFilter<"DraftTicket"> | Date | string
    updatedAt?: DateTimeFilter<"DraftTicket"> | Date | string
  }, "id">

  export type DraftTicketOrderByWithAggregationInput = {
    id?: SortOrder
    sourceText?: SortOrder
    ticketCode?: SortOrderInput | SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    submittedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DraftTicketCountOrderByAggregateInput
    _max?: DraftTicketMaxOrderByAggregateInput
    _min?: DraftTicketMinOrderByAggregateInput
  }

  export type DraftTicketScalarWhereWithAggregatesInput = {
    AND?: DraftTicketScalarWhereWithAggregatesInput | DraftTicketScalarWhereWithAggregatesInput[]
    OR?: DraftTicketScalarWhereWithAggregatesInput[]
    NOT?: DraftTicketScalarWhereWithAggregatesInput | DraftTicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DraftTicket"> | string
    sourceText?: StringWithAggregatesFilter<"DraftTicket"> | string
    ticketCode?: StringNullableWithAggregatesFilter<"DraftTicket"> | string | null
    parsedData?: JsonWithAggregatesFilter<"DraftTicket">
    status?: EnumTicketStatusWithAggregatesFilter<"DraftTicket"> | $Enums.TicketStatus
    submittedAt?: DateTimeNullableWithAggregatesFilter<"DraftTicket"> | Date | string | null
    submittedBy?: StringNullableWithAggregatesFilter<"DraftTicket"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DraftTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DraftTicket"> | Date | string
  }

  export type PortalTicketWhereInput = {
    AND?: PortalTicketWhereInput | PortalTicketWhereInput[]
    OR?: PortalTicketWhereInput[]
    NOT?: PortalTicketWhereInput | PortalTicketWhereInput[]
    id?: StringFilter<"PortalTicket"> | string
    ticketCode?: StringFilter<"PortalTicket"> | string
    currentStep?: StringFilter<"PortalTicket"> | string
    flowData?: JsonFilter<"PortalTicket">
    createdAt?: DateTimeFilter<"PortalTicket"> | Date | string
    updatedAt?: DateTimeFilter<"PortalTicket"> | Date | string
    createdBy?: StringFilter<"PortalTicket"> | string
    updatedBy?: StringFilter<"PortalTicket"> | string
  }

  export type PortalTicketOrderByWithRelationInput = {
    id?: SortOrder
    ticketCode?: SortOrder
    currentStep?: SortOrder
    flowData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type PortalTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ticketCode?: string
    AND?: PortalTicketWhereInput | PortalTicketWhereInput[]
    OR?: PortalTicketWhereInput[]
    NOT?: PortalTicketWhereInput | PortalTicketWhereInput[]
    currentStep?: StringFilter<"PortalTicket"> | string
    flowData?: JsonFilter<"PortalTicket">
    createdAt?: DateTimeFilter<"PortalTicket"> | Date | string
    updatedAt?: DateTimeFilter<"PortalTicket"> | Date | string
    createdBy?: StringFilter<"PortalTicket"> | string
    updatedBy?: StringFilter<"PortalTicket"> | string
  }, "id" | "ticketCode">

  export type PortalTicketOrderByWithAggregationInput = {
    id?: SortOrder
    ticketCode?: SortOrder
    currentStep?: SortOrder
    flowData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    _count?: PortalTicketCountOrderByAggregateInput
    _max?: PortalTicketMaxOrderByAggregateInput
    _min?: PortalTicketMinOrderByAggregateInput
  }

  export type PortalTicketScalarWhereWithAggregatesInput = {
    AND?: PortalTicketScalarWhereWithAggregatesInput | PortalTicketScalarWhereWithAggregatesInput[]
    OR?: PortalTicketScalarWhereWithAggregatesInput[]
    NOT?: PortalTicketScalarWhereWithAggregatesInput | PortalTicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortalTicket"> | string
    ticketCode?: StringWithAggregatesFilter<"PortalTicket"> | string
    currentStep?: StringWithAggregatesFilter<"PortalTicket"> | string
    flowData?: JsonWithAggregatesFilter<"PortalTicket">
    createdAt?: DateTimeWithAggregatesFilter<"PortalTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PortalTicket"> | Date | string
    createdBy?: StringWithAggregatesFilter<"PortalTicket"> | string
    updatedBy?: StringWithAggregatesFilter<"PortalTicket"> | string
  }

  export type AssetCreateInput = {
    id?: string
    barcode: string
    prefix: string
    asmsBarcode?: string | null
    invoiceId?: string | null
    serialNumber?: string | null
    quantity?: number
    description?: string | null
    originalCost?: Decimal | DecimalJsLike | number | string | null
    assetTypeId?: string | null
    purchaseDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    locationId?: string | null
    floorId?: string | null
    ownerId?: string | null
    purchasingUnitId?: string | null
    seatCode?: string | null
    status?: $Enums.AssetStatus
    ticketId?: string | null
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string
    updatedBy?: string
  }

  export type AssetUncheckedCreateInput = {
    id?: string
    barcode: string
    prefix: string
    asmsBarcode?: string | null
    invoiceId?: string | null
    serialNumber?: string | null
    quantity?: number
    description?: string | null
    originalCost?: Decimal | DecimalJsLike | number | string | null
    assetTypeId?: string | null
    purchaseDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    locationId?: string | null
    floorId?: string | null
    ownerId?: string | null
    purchasingUnitId?: string | null
    seatCode?: string | null
    status?: $Enums.AssetStatus
    ticketId?: string | null
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string
    updatedBy?: string
  }

  export type AssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    asmsBarcode?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    originalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assetTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    floorId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasingUnitId?: NullableStringFieldUpdateOperationsInput | string | null
    seatCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type AssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    asmsBarcode?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    originalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assetTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    floorId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasingUnitId?: NullableStringFieldUpdateOperationsInput | string | null
    seatCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type AssetCreateManyInput = {
    id?: string
    barcode: string
    prefix: string
    asmsBarcode?: string | null
    invoiceId?: string | null
    serialNumber?: string | null
    quantity?: number
    description?: string | null
    originalCost?: Decimal | DecimalJsLike | number | string | null
    assetTypeId?: string | null
    purchaseDate?: Date | string | null
    warrantyExpiry?: Date | string | null
    locationId?: string | null
    floorId?: string | null
    ownerId?: string | null
    purchasingUnitId?: string | null
    seatCode?: string | null
    status?: $Enums.AssetStatus
    ticketId?: string | null
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string
    updatedBy?: string
  }

  export type AssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    asmsBarcode?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    originalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assetTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    floorId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasingUnitId?: NullableStringFieldUpdateOperationsInput | string | null
    seatCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type AssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barcode?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    asmsBarcode?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    originalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assetTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    warrantyExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    floorId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasingUnitId?: NullableStringFieldUpdateOperationsInput | string | null
    seatCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus
    ticketId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type BarcodeSequenceCreateInput = {
    prefix: string
    lastValue?: number
    updatedAt?: Date | string
  }

  export type BarcodeSequenceUncheckedCreateInput = {
    prefix: string
    lastValue?: number
    updatedAt?: Date | string
  }

  export type BarcodeSequenceUpdateInput = {
    prefix?: StringFieldUpdateOperationsInput | string
    lastValue?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarcodeSequenceUncheckedUpdateInput = {
    prefix?: StringFieldUpdateOperationsInput | string
    lastValue?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarcodeSequenceCreateManyInput = {
    prefix: string
    lastValue?: number
    updatedAt?: Date | string
  }

  export type BarcodeSequenceUpdateManyMutationInput = {
    prefix?: StringFieldUpdateOperationsInput | string
    lastValue?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarcodeSequenceUncheckedUpdateManyInput = {
    prefix?: StringFieldUpdateOperationsInput | string
    lastValue?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterDataCreateInput = {
    id?: string
    type: $Enums.MasterDataType
    name: string
    code?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasterDataUncheckedCreateInput = {
    id?: string
    type: $Enums.MasterDataType
    name: string
    code?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasterDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMasterDataTypeFieldUpdateOperationsInput | $Enums.MasterDataType
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMasterDataTypeFieldUpdateOperationsInput | $Enums.MasterDataType
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterDataCreateManyInput = {
    id?: string
    type: $Enums.MasterDataType
    name: string
    code?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasterDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMasterDataTypeFieldUpdateOperationsInput | $Enums.MasterDataType
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMasterDataTypeFieldUpdateOperationsInput | $Enums.MasterDataType
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    entityName: string
    entityId: string
    actionType: $Enums.AuditAction
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changedBy: string
    updateSource?: string
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    entityName: string
    entityId: string
    actionType: $Enums.AuditAction
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changedBy: string
    updateSource?: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityName?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changedBy?: StringFieldUpdateOperationsInput | string
    updateSource?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityName?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changedBy?: StringFieldUpdateOperationsInput | string
    updateSource?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    entityName: string
    entityId: string
    actionType: $Enums.AuditAction
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changedBy: string
    updateSource?: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityName?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changedBy?: StringFieldUpdateOperationsInput | string
    updateSource?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityName?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changedBy?: StringFieldUpdateOperationsInput | string
    updateSource?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterTemplateCreateInput = {
    id?: string
    userId?: string
    templateName: string
    filterCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FilterTemplateUncheckedCreateInput = {
    id?: string
    userId?: string
    templateName: string
    filterCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FilterTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    filterCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    filterCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterTemplateCreateManyInput = {
    id?: string
    userId?: string
    templateName: string
    filterCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FilterTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    filterCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    filterCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftTicketCreateInput = {
    id?: string
    sourceText: string
    ticketCode?: string | null
    parsedData: JsonNullValueInput | InputJsonValue
    status?: $Enums.TicketStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftTicketUncheckedCreateInput = {
    id?: string
    sourceText: string
    ticketCode?: string | null
    parsedData: JsonNullValueInput | InputJsonValue
    status?: $Enums.TicketStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftTicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceText?: StringFieldUpdateOperationsInput | string
    ticketCode?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftTicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceText?: StringFieldUpdateOperationsInput | string
    ticketCode?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftTicketCreateManyInput = {
    id?: string
    sourceText: string
    ticketCode?: string | null
    parsedData: JsonNullValueInput | InputJsonValue
    status?: $Enums.TicketStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftTicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceText?: StringFieldUpdateOperationsInput | string
    ticketCode?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftTicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceText?: StringFieldUpdateOperationsInput | string
    ticketCode?: NullableStringFieldUpdateOperationsInput | string | null
    parsedData?: JsonNullValueInput | InputJsonValue
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalTicketCreateInput = {
    id?: string
    ticketCode: string
    currentStep?: string
    flowData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string
    updatedBy?: string
  }

  export type PortalTicketUncheckedCreateInput = {
    id?: string
    ticketCode: string
    currentStep?: string
    flowData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string
    updatedBy?: string
  }

  export type PortalTicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketCode?: StringFieldUpdateOperationsInput | string
    currentStep?: StringFieldUpdateOperationsInput | string
    flowData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type PortalTicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketCode?: StringFieldUpdateOperationsInput | string
    currentStep?: StringFieldUpdateOperationsInput | string
    flowData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type PortalTicketCreateManyInput = {
    id?: string
    ticketCode: string
    currentStep?: string
    flowData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string
    updatedBy?: string
  }

  export type PortalTicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketCode?: StringFieldUpdateOperationsInput | string
    currentStep?: StringFieldUpdateOperationsInput | string
    flowData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type PortalTicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ticketCode?: StringFieldUpdateOperationsInput | string
    currentStep?: StringFieldUpdateOperationsInput | string
    flowData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumAssetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | EnumAssetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetStatusFilter<$PrismaModel> | $Enums.AssetStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AssetCountOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    prefix?: SortOrder
    asmsBarcode?: SortOrder
    invoiceId?: SortOrder
    serialNumber?: SortOrder
    quantity?: SortOrder
    description?: SortOrder
    originalCost?: SortOrder
    assetTypeId?: SortOrder
    purchaseDate?: SortOrder
    warrantyExpiry?: SortOrder
    locationId?: SortOrder
    floorId?: SortOrder
    ownerId?: SortOrder
    purchasingUnitId?: SortOrder
    seatCode?: SortOrder
    status?: SortOrder
    ticketId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type AssetAvgOrderByAggregateInput = {
    quantity?: SortOrder
    originalCost?: SortOrder
  }

  export type AssetMaxOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    prefix?: SortOrder
    asmsBarcode?: SortOrder
    invoiceId?: SortOrder
    serialNumber?: SortOrder
    quantity?: SortOrder
    description?: SortOrder
    originalCost?: SortOrder
    assetTypeId?: SortOrder
    purchaseDate?: SortOrder
    warrantyExpiry?: SortOrder
    locationId?: SortOrder
    floorId?: SortOrder
    ownerId?: SortOrder
    purchasingUnitId?: SortOrder
    seatCode?: SortOrder
    status?: SortOrder
    ticketId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type AssetMinOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    prefix?: SortOrder
    asmsBarcode?: SortOrder
    invoiceId?: SortOrder
    serialNumber?: SortOrder
    quantity?: SortOrder
    description?: SortOrder
    originalCost?: SortOrder
    assetTypeId?: SortOrder
    purchaseDate?: SortOrder
    warrantyExpiry?: SortOrder
    locationId?: SortOrder
    floorId?: SortOrder
    ownerId?: SortOrder
    purchasingUnitId?: SortOrder
    seatCode?: SortOrder
    status?: SortOrder
    ticketId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type AssetSumOrderByAggregateInput = {
    quantity?: SortOrder
    originalCost?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumAssetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | EnumAssetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetStatusFilter<$PrismaModel>
    _max?: NestedEnumAssetStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BarcodeSequenceCountOrderByAggregateInput = {
    prefix?: SortOrder
    lastValue?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarcodeSequenceAvgOrderByAggregateInput = {
    lastValue?: SortOrder
  }

  export type BarcodeSequenceMaxOrderByAggregateInput = {
    prefix?: SortOrder
    lastValue?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarcodeSequenceMinOrderByAggregateInput = {
    prefix?: SortOrder
    lastValue?: SortOrder
    updatedAt?: SortOrder
  }

  export type BarcodeSequenceSumOrderByAggregateInput = {
    lastValue?: SortOrder
  }

  export type EnumMasterDataTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MasterDataType | EnumMasterDataTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMasterDataTypeFilter<$PrismaModel> | $Enums.MasterDataType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MasterDataTypeNameCompoundUniqueInput = {
    type: $Enums.MasterDataType
    name: string
  }

  export type MasterDataCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterDataMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterDataMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumMasterDataTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MasterDataType | EnumMasterDataTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMasterDataTypeWithAggregatesFilter<$PrismaModel> | $Enums.MasterDataType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMasterDataTypeFilter<$PrismaModel>
    _max?: NestedEnumMasterDataTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    entityName?: SortOrder
    entityId?: SortOrder
    actionType?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    changedBy?: SortOrder
    updateSource?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    entityName?: SortOrder
    entityId?: SortOrder
    actionType?: SortOrder
    changedBy?: SortOrder
    updateSource?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    entityName?: SortOrder
    entityId?: SortOrder
    actionType?: SortOrder
    changedBy?: SortOrder
    updateSource?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FilterTemplateUserIdTemplateNameCompoundUniqueInput = {
    userId: string
    templateName: string
  }

  export type FilterTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateName?: SortOrder
    filterCriteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FilterTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FilterTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type DraftTicketCountOrderByAggregateInput = {
    id?: SortOrder
    sourceText?: SortOrder
    ticketCode?: SortOrder
    parsedData?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DraftTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    sourceText?: SortOrder
    ticketCode?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DraftTicketMinOrderByAggregateInput = {
    id?: SortOrder
    sourceText?: SortOrder
    ticketCode?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type PortalTicketCountOrderByAggregateInput = {
    id?: SortOrder
    ticketCode?: SortOrder
    currentStep?: SortOrder
    flowData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type PortalTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketCode?: SortOrder
    currentStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type PortalTicketMinOrderByAggregateInput = {
    id?: SortOrder
    ticketCode?: SortOrder
    currentStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumAssetStatusFieldUpdateOperationsInput = {
    set?: $Enums.AssetStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumMasterDataTypeFieldUpdateOperationsInput = {
    set?: $Enums.MasterDataType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumAssetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | EnumAssetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetStatusFilter<$PrismaModel> | $Enums.AssetStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAssetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | EnumAssetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetStatus[] | ListEnumAssetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetStatusFilter<$PrismaModel>
    _max?: NestedEnumAssetStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMasterDataTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MasterDataType | EnumMasterDataTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMasterDataTypeFilter<$PrismaModel> | $Enums.MasterDataType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumMasterDataTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MasterDataType | EnumMasterDataTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasterDataType[] | ListEnumMasterDataTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMasterDataTypeWithAggregatesFilter<$PrismaModel> | $Enums.MasterDataType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMasterDataTypeFilter<$PrismaModel>
    _max?: NestedEnumMasterDataTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type NestedEnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AssetDefaultArgs instead
     */
    export type AssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AssetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BarcodeSequenceDefaultArgs instead
     */
    export type BarcodeSequenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BarcodeSequenceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MasterDataDefaultArgs instead
     */
    export type MasterDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MasterDataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FilterTemplateDefaultArgs instead
     */
    export type FilterTemplateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FilterTemplateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DraftTicketDefaultArgs instead
     */
    export type DraftTicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DraftTicketDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PortalTicketDefaultArgs instead
     */
    export type PortalTicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PortalTicketDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}