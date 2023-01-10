export class GetTranslations {
  static readonly type = '[App] GetTranslations';
}

export class GotTranslations {
  static readonly type = '[App] GotTranslations';
}

export class GetDynamicCollections {
  static readonly type = '[App] GetDynamicCollections';
  constructor(public lang: string) {
  }
}