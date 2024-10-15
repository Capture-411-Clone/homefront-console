import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const pathname = usePathname();

  const checkPath = path?.startsWith('#');

  let currentPath = path === '/' ? '/' : `${path}/`;
  if (currentPath.includes('?')) {
    // remove ?query
    currentPath = currentPath.split('?')[0];
    currentPath = currentPath === '/' ? '/' : `${currentPath}/`;
  }
  const normalActive = !checkPath && pathname === currentPath;

  const deepActive = !checkPath && pathname.includes(currentPath);

  return deep ? deepActive : normalActive;
}
