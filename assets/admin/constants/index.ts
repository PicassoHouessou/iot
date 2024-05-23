export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
}

export const appUrl = process.env.ADMIN_URL_APP_URL;
export const mercureUrl = process.env.ADMIN_MERCURE_URL;
export const apiUrl = process.env.ADMIN_API_URL;

export enum ApiFormat {
    JSON = 'application/json',
    JSON_MERGE_PATCH = 'application/merge-patch+json',
    JSONLD = 'application/ld+json',
    GRAPHQL = 'application/graphql',
    JSONAPI = 'application/vnd.api+json',
    HAL = 'application/hal+json',
    YAML = 'application/x-yaml',
    CSV = 'text/csv',
    HTML = 'text/html',
    RAW_JSON = 'raw/json',
    RAW_XML = 'raw/xml',
}

export enum ApiRoutesWithoutPrefix {
    LOGS = '/logs',
    MODULES = '/modules',
    USERS = '/users',
    MODULE_TYPES = '/module_types',
    MODULE_HISTORIES = '/module_histories',
    MODULE_STATUSES = '/module_statuses',
    STATISTICS = '/statistics',
    COMMANDS = '/commands',
}

export enum AdminPages {
    LOGS = '/logs',
    MODULES = '/modules/main',
    MODULES_EDIT = '/modules/main/edit',
    MODULES_SEE = '/modules/main/see',
    USERS = '/users',
    MODULE_TYPES = '/modules/types',
    MODULE_HISTORIES = '/modules/histories',
    MODULE_STATUSES = '/modules/statuses',
    MODULE_STATUSES_SEE = '/modules/statuses/see',
    MODULE_STATUSES_EDIT = '/modules/statuses/edit',
    MODULE_TYPES_SEE = '/modules/types/see',
    MODULE_TYPES_EDIT = '/modules/types/edit',
    DASHBOARD = '/',
    MODULES_ADD = '/modules/main/add',
    MODULE_TYPES_ADD = '/modules/types/add',
    MODULE_STATUSES_ADD = '/modules/statuses/add',
    PROFILES = '/profiles',
    CALENDAR = '/calendar',
}

type BaseApiFilters = 'search' | 'page';

export type ModulesApiFilters = BaseApiFilters | 'name' | 'description' | 'createdAt';

export type ModuleTypesApiFilters =
    | BaseApiFilters
    | 'name'
    | 'unitOfMeasure'
    | 'minValue'
    | 'maxValue';

export type ModuleStatusApiFilters = BaseApiFilters | 'name' | 'slug';

export type ApiFiltersType =
    | ModulesApiFilters
    | ModuleTypesApiFilters
    | ModuleStatusApiFilters;

export enum StatisticEnum {
    USER,
    MODULE,
    MODULE_TYPE,
    MODULE_HISTORY,
    MODULE_STATUS,
}
