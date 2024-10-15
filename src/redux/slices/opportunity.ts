import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreateOpportunitySteps,
  CurrentOpportunityIdChangedPayloadType,
  OpportunityState,
  StepChangedPayloadType,
} from 'src/@types/redux/opportunity';
import { OpportunityGuessedData } from 'src/@types/opportunity/ai-models/opportunityAIDocValues';
/* eslint-disable import/no-cycle */
import { OpportunityPdfGptChoiceValues } from 'src/@types/opportunity/ai-models/opportunityPdfDocValues';
import { RootState } from '../store';
// utils

// ----------------------------------------------------------------------

const initialState: OpportunityState = {
  currentOpportunityId: 0,
  createOpportunityActiveStep: CreateOpportunitySteps[0],
  opportunityGuessedData: {
    title: '',
    description: '',
    department: '',
    agency: '',
    office: '',
    naics: '',
    contract_vehicle: '',
    set_aside: '',
    year: '',
    solicitation_number: '',
  },
};

const slice = createSlice({
  name: 'opportunity',
  initialState,
  reducers: {
    createOpportunityActiveStepChanged: (state, action: PayloadAction<StepChangedPayloadType>) => {
      state.createOpportunityActiveStep = action.payload;
    },
    currentOpportunityIdChanged: (
      state,
      action: PayloadAction<CurrentOpportunityIdChangedPayloadType>
    ) => {
      state.currentOpportunityId = action.payload;
    },
    opportunityGuessedDataChanged: (state, action: PayloadAction<OpportunityGuessedData>) => {
      // compare values if payload keys are not empty add them if not dont change old data key is empty
      const keys = Object.keys(action.payload);
      keys.forEach((key) => {
        if (
          action.payload[key as keyof OpportunityGuessedData] !== '' &&
          state.opportunityGuessedData[key as keyof OpportunityPdfGptChoiceValues] === ''
        ) {
          state.opportunityGuessedData[key as keyof OpportunityPdfGptChoiceValues] =
            action.payload[key as keyof OpportunityGuessedData];
        }
      });
    },
    opportunityGuessedDataReseted: (state) => {
      state.opportunityGuessedData = initialState.opportunityGuessedData;
    },
  },
});

// Reducer
export default slice.reducer;

// Selectors
export const createOpportunityActiveStepSelector = (state: RootState): StepChangedPayloadType =>
  state.opportunity.createOpportunityActiveStep;

export const currentOpportunityIdSelector = (
  state: RootState
): CurrentOpportunityIdChangedPayloadType => state.opportunity.currentOpportunityId;

export const opportunityGuessedDataSelector = (state: RootState): OpportunityPdfGptChoiceValues =>
  state.opportunity.opportunityGuessedData;

// Actions
export const {
  createOpportunityActiveStepChanged,
  currentOpportunityIdChanged,
  opportunityGuessedDataChanged,
  opportunityGuessedDataReseted,
} = slice.actions;
