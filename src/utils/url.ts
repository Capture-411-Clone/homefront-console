export function joinUrl(...parts: string[]) {
  return parts
    .map((part, index) => {
      if (index === 0) {
        // Ensure no trailing slash for the first part
        return part.trim().replace(/\/+$/, '');
      }
      // Ensure no leading or trailing slashes for the middle parts
      return part.trim().replace(/^\/+|\/+$/g, '');
    })
    .join('/');
}
