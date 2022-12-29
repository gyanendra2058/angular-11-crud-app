export enum States {

    // Translation States
    TranslationsNotLoaded = 'TranslationsNotLoaded',
    GetTranslationsInProgress = 'GetTranslationsInProgress',
    GetTranslationsFailure = 'GetTranslationsFailure',
    TranslationsLoaded = 'TranslationsLoaded',

    // Api States
    ApiRequestNotStarted = 'ApiRequestNotStarted',
    ApiRequestSuccess = 'ApiRequestSuccess',
    ApiRequestInProgress = 'ApiRequestInProgress',
    ApiRequestFailure = 'ApiRequestFailure',

    // Dynamic collections
    DynamicCollectionsLoadStart = 'DynamicCollectionsLoadStart',
    DynamicCollectionsLoadSuccess = 'DynamicCollectionsLoadSuccess',
    DynamicCollectionsLoadFailure = 'DynamicCollectionsLoadFailure',

    TaskNotStarted = 'TaskNotStarted',
    TaskInProgress = 'TaskInProgress',
    TaskFailure = 'TaskFailure',
    TaskSuccess = 'TaskSuccess',
}
