import { useState, useEffect, useCallback } from 'react';
// @mui
import Collapse from '@mui/material/Collapse';
// routes
import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';
//
import { paths } from 'src/routes/paths';
import { NavListProps, NavConfigProps } from '../types';
import NavItem from './nav-item';

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
  config: NavConfigProps;
};

const importantPaths = [paths.dashboard.opportunity.new];

export default function NavList({ data, depth, hasChild, config }: NavListRootProps) {
  const pathname = usePathname();

  const active = useActiveLink(data.path, hasChild);

  const externalLink = data.path?.includes('http');

  const isImportant = importantPaths.includes(data.path);

  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <NavItem
        sx={{ color: isImportant ? 'error.main' : 'inherit' }}
        item={data}
        depth={depth}
        open={open}
        active={active}
        externalLink={externalLink}
        onClick={handleToggle}
        config={config}
      />

      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList data={data.children} depth={depth} config={config} />
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
  config: NavConfigProps;
};

function NavSubList({ data, depth, config }: NavListSubProps) {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}
