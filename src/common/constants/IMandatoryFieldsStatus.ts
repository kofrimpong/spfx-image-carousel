export interface IMandatoryFieldsStatus {
  needsSiteUrl: boolean;
  needsWebUrl: boolean;
  needsListId: boolean;
  allConfigured: boolean;
  needsViewFields?:boolean;
}
