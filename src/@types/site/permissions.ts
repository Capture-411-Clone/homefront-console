export type GetOpportunityPermissionsResponseDataType = {
  statusCode: number;
  data: {
    CanAccessAgency: boolean;
    CanCreateAgency: boolean;
    CanAccessCategory: boolean;
    CanCreateCategory: boolean;
    CanAccessDepartment: boolean;
    CanCreateDepartment: boolean;
    CanAccessFiscalYear: boolean;
    CanCreateFiscalYear: boolean;
    CanAccessOpportunity: boolean;
    CanCreateOpportunity: boolean;
    CanAccessMarket: boolean;
    CanCreateMarket: boolean;
    CanAccessNaics: boolean;
    CanCreateNaics: boolean;
    CanAccessOffice: boolean;
    CanCreateOffice: boolean;
    CanAccessSetAside: boolean;
    CanCreateSetAside: boolean;
    CanAccessContractVehicle: boolean;
    CanCreateContractVehicle: boolean;
    CanAccessUser: boolean;
    CanCreateUser: boolean;
  };
};

export type GetAllPermissionsReturnType = GetOpportunityPermissionsResponseDataType['data'];

export type SitePermissionsType = GetAllPermissionsReturnType;
