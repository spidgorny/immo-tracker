// a little function to help us with reordering the result
export const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function* splitChunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export function getTabsWithPrimaryFirst(rows) {
  let PRIMARY = "Primary";
  const primaryInfo = rows?.find((x) => x.tab === PRIMARY);
  let tabs = [
    { tab: PRIMARY, ...primaryInfo, count: primaryInfo?.count ?? 0 },
    ...rows?.filter((x) => x.tab !== PRIMARY),
  ];
  return tabs;
}

export function uniqueStrings(strList) {
  return strList.reduce((a, x) => (a.includes(x) ? a : [...a, x]), []);
}

export function uniqueObjectByKey(objList, key = "id") {
  return objList.reduce(
    (a, x) => (a.includes(x[key]) ? a : [...a, x[key]]),
    []
  );
}

export const sortParts = (a, b) => {
  for (let i in a) {
    let aPart = a[i];
    let bPart = b[i];
    const cmpPart = aPart.localeCompare(bPart, undefined, { numeric: true });
    // console.log(aPart, "<=>", bPart, ":", cmpPart);
    if (cmpPart) {
      return cmpPart;
    }
  }
  return 0;
};

export function array_same(a1, a2) {
  return a1.every((x) => a2.includes(x)) && a2.every((x) => a1.includes(x));
}

export const range = function* (from = 0, total = 0, step = 1) {
  for (let i = 0; i < total; yield from + i++ * step) {}
};

export function rangeBetween(from, till, step = 1) {
  return range(from, till - from + 1, step);
}
