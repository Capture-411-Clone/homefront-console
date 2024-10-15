import { OpportunityPdfGptChoiceValues } from '../opportunity/ai-models/opportunityPdfDocValues';

type StepperFormStep = {
  name: string;
  path: string;
};

export const CreateOpportunitySteps = [
  {
    name: 'Documents',
    path: 'documents',
  },
  {
    name: 'Information',
    path: 'information',
  },
] satisfies StepperFormStep[];

interface FormStep extends StepperFormStep {}

export enum CreateOpportunityStepsEnum {
  Documents = 0,
  Information = 1,
}

export enum DocumentTypeEnum {
  RFP_RFQ = 'RFP/RFQ',
  Instructions = 'Instructions',
  SOWs_PWS = 'SOWs/PWS',
  Pricing_Sheets = 'Pricing Sheets',
  Q_And_A = 'Q & A',
  Other = 'Other',
}

export const DocumentTypes = [
  DocumentTypeEnum.RFP_RFQ,
  DocumentTypeEnum.Instructions,
  DocumentTypeEnum.SOWs_PWS,
  DocumentTypeEnum.Pricing_Sheets,
  DocumentTypeEnum.Q_And_A,
  DocumentTypeEnum.Other,
] as const;

export interface OpportunityState {
  createOpportunityActiveStep: FormStep;
  currentOpportunityId: number;
  opportunityGuessedData: OpportunityPdfGptChoiceValues;
}

export type StepChangedPayloadType = FormStep;
export type CurrentOpportunityIdChangedPayloadType = number;
