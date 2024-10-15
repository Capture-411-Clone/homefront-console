import { Box, Breadcrumbs, BreadcrumbsProps, Link, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface HeaderBreadcrumbsProps extends BreadcrumbsProps {
  action?: ReactNode;
  heading: string;
  moreLink?: string[];
  links: any;
}

const Separator = (
  <Box
    component="span"
    sx={{
      width: 4,
      height: 4,
      borderRadius: '50%',
      bgcolor: 'text.disabled',
    }}
  />
);

export default function HeaderBreadCrumbs({
  links,
  action,
  heading,
  moreLink = [],
  sx,
  ...other
}: HeaderBreadcrumbsProps) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Breadcrumbs separator={Separator}>
            {links.slice(0, links.length - 1).map((link: any) => (
              <Link key={link} color="inherit" href="#">
                {link.name}
              </Link>
            ))}
            <Typography
              variant="body2"
              sx={{
                maxWidth: 260,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                color: 'text.disabled',
                textOverflow: 'ellipsis',
              }}
            >
              {links[links.length - 1].name}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
}
