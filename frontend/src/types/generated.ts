/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BodyCreateTokenTokenPost {
  /**
   * Grant Type
   * @pattern password
   */
  grant_type?: string;

  /** Username */
  username: string;

  /** Password */
  password: string;

  /** Scope */
  scope?: string;

  /** Client Id */
  client_id?: string;

  /** Client Secret */
  client_secret?: string;
}

export interface BodyCreateUploadImageImageUploadPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

export interface HTTPValidationError {
  /** Message */
  message?: string;
}

export interface ImageModel {
  /** Url */
  url: string;
}

export interface ItemCreate {
  /** Name */
  name: string;

  /** Price */
  price: number;

  /**
   * Image Url
   * @format uri
   */
  image_url: string;

  /** Description */
  description: string;
}

export interface ItemInDatabase {
  /** Name */
  name: string;

  /** Price */
  price: number;

  /**
   * Image Url
   * @format uri
   */
  image_url: string;

  /**
   * Id
   * @format uuid
   */
  id: string;

  /** Description */
  description: string;
  seller: Seller;

  /**
   * Created At
   * @format date-time
   */
  created_at: string;

  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

export interface ItemRead {
  /** Name */
  name: string;

  /** Price */
  price: number;

  /**
   * Image Url
   * @format uri
   */
  image_url: string;

  /**
   * Id
   * @format uuid
   */
  id: string;
}

export interface Message {
  /** Message */
  message: string;
}

export interface QueryCreate {
  /** Query */
  query: string;
}

export interface QueryInDatabase {
  /**
   * Id
   * @format uuid
   */
  id: string;

  /** Query */
  query: string;
  seller: Seller;

  /**
   * Created At
   * @format date-time
   */
  created_at: string;

  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

export interface ReadItems {
  /** Data */
  data: ItemRead[];

  /** Skip */
  skip?: number;
}

export interface ReadQueries {
  /** Data */
  data: ReadQuery[];

  /** Skip */
  skip?: number;
}

export interface ReadQuery {
  /**
   * Id
   * @format uuid
   */
  id: string;

  /** Query */
  query: string;
}

export interface Secret {
  /** Access Token */
  access_token: string;

  /** Token Type */
  token_type: string;
}

export interface Seller {
  /** Name */
  name: string;

  /**
   * Email
   * @format email
   */
  email: string;

  /**
   * Image Url
   * @format uri
   */
  image_url: string;

  /**
   * Id
   * @format uuid
   */
  id: string;

  /**
   * Password
   * @format password
   */
  password: string;

  /** Is Active */
  is_active: boolean;

  /**
   * Created At
   * @format date-time
   */
  created_at: string;

  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

export interface SellerCreate {
  /** Name */
  name: string;

  /**
   * Email
   * @format email
   */
  email: string;

  /**
   * Image Url
   * @format uri
   */
  image_url: string;

  /**
   * Password
   * @format password
   */
  password: string;
}

export interface SellerInDatabase {
  /** Name */
  name: string;

  /**
   * Email
   * @format email
   */
  email: string;

  /**
   * Image Url
   * @format uri
   */
  image_url: string;

  /**
   * Id
   * @format uuid
   */
  id: string;

  /**
   * Password
   * @format password
   */
  password: string;

  /** Is Active */
  is_active: boolean;

  /**
   * Created At
   * @format date-time
   */
  created_at: string;

  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;

  /** Items */
  items: ItemRead[];
}

export interface SellerRead {
  /** Name */
  name: string;

  /**
   * Email
   * @format email
   */
  email: string;

  /**
   * Image Url
   * @format uri
   */
  image_url: string;

  /**
   * Id
   * @format uuid
   */
  id: string;

  /** Items */
  items: ItemRead[];
}

export interface ValidationError {
  /** Location */
  loc: string[];

  /** Message */
  msg: string;

  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Mercari Clone API
 * @version 0.1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  image = {
    /**
     * No description
     *
     * @name CreateUploadImageImageUploadPost
     * @summary Create Upload Image
     * @request POST:/image/upload
     */
    createUploadImageImageUploadPost: (data: BodyCreateUploadImageImageUploadPost, params: RequestParams = {}) =>
      this.request<ImageModel, Message | HTTPValidationError>({
        path: `/image/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  token = {
    /**
     * No description
     *
     * @name CreateTokenTokenPost
     * @summary Create Token
     * @request POST:/token
     */
    createTokenTokenPost: (data: BodyCreateTokenTokenPost, params: RequestParams = {}) =>
      this.request<Secret, Message | HTTPValidationError>({
        path: `/token`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),
  };
  items = {
    /**
     * No description
     *
     * @name ReadItemsItemsGet
     * @summary Read Items
     * @request GET:/items
     */
    readItemsItemsGet: (query: { skip: number; limit: number; query?: string }, params: RequestParams = {}) =>
      this.request<ReadItems, HTTPValidationError>({
        path: `/items`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateItemItemsPost
     * @summary Create Item
     * @request POST:/items
     * @secure
     */
    createItemItemsPost: (data: ItemCreate, params: RequestParams = {}) =>
      this.request<ItemInDatabase, Message | HTTPValidationError>({
        path: `/items`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ReadItemItemsItemIdGet
     * @summary Read Item
     * @request GET:/items/{item_id}
     */
    readItemItemsItemIdGet: (itemId: string, params: RequestParams = {}) =>
      this.request<ItemInDatabase, Message | HTTPValidationError>({
        path: `/items/${itemId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteItemItemsItemIdDelete
     * @summary Delete Item
     * @request DELETE:/items/{item_id}
     * @secure
     */
    deleteItemItemsItemIdDelete: (itemId: string, params: RequestParams = {}) =>
      this.request<ItemInDatabase, Message | HTTPValidationError>({
        path: `/items/${itemId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  sellers = {
    /**
     * No description
     *
     * @name ReadSellersSellersGet
     * @summary Read Sellers
     * @request GET:/sellers
     */
    readSellersSellersGet: (params: RequestParams = {}) =>
      this.request<SellerRead[], any>({
        path: `/sellers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateSellerSellersPost
     * @summary Create Seller
     * @request POST:/sellers
     */
    createSellerSellersPost: (data: SellerCreate, params: RequestParams = {}) =>
      this.request<SellerInDatabase, Message | HTTPValidationError>({
        path: `/sellers`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ReadSellerSellersSellerIdGet
     * @summary Read Seller
     * @request GET:/sellers/{seller_id}
     */
    readSellerSellersSellerIdGet: (sellerId: string, params: RequestParams = {}) =>
      this.request<SellerRead, Message | HTTPValidationError>({
        path: `/sellers/${sellerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdateCurrentSellerStatusSellersMeInactivatePatch
     * @summary Update Current Seller Status
     * @request PATCH:/sellers/me/inactivate
     * @secure
     */
    updateCurrentSellerStatusSellersMeInactivatePatch: (params: RequestParams = {}) =>
      this.request<SellerRead, Message>({
        path: `/sellers/me/inactivate`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ReadCurrentSellerSellersMeGet
     * @summary Read Current Seller
     * @request GET:/sellers/me/
     * @secure
     */
    readCurrentSellerSellersMeGet: (params: RequestParams = {}) =>
      this.request<SellerRead, Message>({
        path: `/sellers/me/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  queries = {
    /**
     * No description
     *
     * @name ReadQueriesQueriesGet
     * @summary Read Queries
     * @request GET:/queries
     * @secure
     */
    readQueriesQueriesGet: (query: { skip: number; limit: number; query?: string }, params: RequestParams = {}) =>
      this.request<ReadQueries, Message | HTTPValidationError>({
        path: `/queries`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateQueryQueriesPost
     * @summary Create Query
     * @request POST:/queries
     * @secure
     */
    createQueryQueriesPost: (data: QueryCreate, params: RequestParams = {}) =>
      this.request<QueryInDatabase, Message | HTTPValidationError>({
        path: `/queries`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteQueryQueriesQueryIdDelete
     * @summary Delete Query
     * @request DELETE:/queries/{query_id}
     * @secure
     */
    deleteQueryQueriesQueryIdDelete: (queryId: string, params: RequestParams = {}) =>
      this.request<QueryInDatabase, Message | HTTPValidationError>({
        path: `/queries/${queryId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
