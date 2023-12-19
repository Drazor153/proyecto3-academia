// export function paginate<T>(data: T[], page: number, size: number) {
//   const start = (page - 1) * size;
//   const end = page * size;

//   return data.slice(start, end);
// }

// export function hasPreviousPage(page: number) {
//   return page > 1;
// }

// export function hasNextPage<T>(data: T[], page: number, size: number) {
//   const end = page * size;

//   return end < data.length;
// }

export function paginated<T>(data: T[], page: number, size: number) {
  const start = (page - 1) * size;

  const end = page * size;

  return {
    array: data.slice(start, end),
    next: end < data.length,
    previous: page > 1,
  };
}
