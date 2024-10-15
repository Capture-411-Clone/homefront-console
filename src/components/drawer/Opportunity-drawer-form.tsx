import { Stack, TextField } from '@mui/material';
import React, { use, useEffect, useState } from 'react';

type OpportunityDrawerFormProps = {
  opportunityFiltersHandler: (search: SearchType) => void;
};

export type SearchType = {
  title: string;
  market_id: string;
  department_id: string;
  agency_id: string;
  office_id: string;
  naics_id: string;
  fiscal_year_id: string;
  set_aside_id: string;
  contract_vehicle_id: string;
  solicitation_number: string;
};

export default function OpportunityDrawerForm(props: OpportunityDrawerFormProps) {
  const { opportunityFiltersHandler } = props;

  const [search, setSearch] = useState<SearchType>({
    title: '',
    market_id: '',
    department_id: '',
    agency_id: '',
    office_id: '',
    naics_id: '',
    fiscal_year_id: '',
    set_aside_id: '',
    contract_vehicle_id: '',
    solicitation_number: '',
  });

  //---------------------------------------------------------------------------------------------

  const handleSearch = (e: any) => {
    setSearch(
      (prev) =>
        ({
          ...prev,
          [e.target.name]: e.target.value,
        }) as SearchType
    );
  };

  useEffect(() => {
    opportunityFiltersHandler(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <TextField onChange={handleSearch} value={search?.title} name="title" label="Title" />
      <TextField
        onChange={handleSearch}
        value={search?.market_id}
        name="market_id"
        label="Market"
      />
      <TextField
        onChange={handleSearch}
        value={search?.department_id}
        name="department_id"
        label="Department"
      />
      <TextField
        onChange={handleSearch}
        value={search?.agency_id}
        name="agency_id"
        label="Agency"
      />
      <TextField
        onChange={handleSearch}
        value={search?.office_id}
        name="office_id"
        label="Office"
      />
      <TextField onChange={handleSearch} value={search?.naics_id} name="naics_id" label="NAICs" />
      <TextField
        onChange={handleSearch}
        value={search?.fiscal_year_id}
        name="fiscal_year_id"
        label="Year Issued"
      />
      <TextField
        onChange={handleSearch}
        value={search?.set_aside_id}
        name="set_aside_id"
        label="Set Aside"
      />
      <TextField
        onChange={handleSearch}
        value={search?.contract_vehicle_id}
        name="contract_vehicle_id"
        label="Contract Vehicle"
      />
      <TextField
        onChange={handleSearch}
        value={search?.solicitation_number}
        name="solicitation_number"
        label="Solicitation Number"
      />
    </Stack>
  );
}
