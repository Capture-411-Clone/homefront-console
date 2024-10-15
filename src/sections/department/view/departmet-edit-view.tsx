'use client';

import { Container } from '@mui/material';
import React from 'react';
import { useDepartmentsQuery } from 'src/_req-hooks/opportunity/depatments/useDepartmentsQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import DepartmentNewEditForm from '../department-new-edit-form';

type Props = {
  id: string;
};

export default function DepartmetEditView({ id }: Props) {
  const { data: currentDepartment } = useDepartmentsQuery({ id }, { enabled: !!id });

  const department = currentDepartment?.data.items[0];
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit Department"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Department', href: paths.dashboard.department.root },
          { name: department?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <DepartmentNewEditForm currentDepartment={department} />
    </Container>
  );
}
