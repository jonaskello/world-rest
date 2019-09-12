export interface WhereInList {
  readonly variables: { readonly [name: string]: unknown };
  readonly list: string;
}

export function generateWhereInList(name: string, values: ReadonlyArray<unknown>): WhereInList {
  let list = "";
  const variables: { [name: string]: unknown } = {};
  for (let i = 0; i < values.length; i++) {
    const variableName = `${name}${i}`;
    list += `, @${variableName}`;
    variables[variableName] = values[i];
  }
  list = list.length > 0 ? list.substr(2) : list;
  return { variables, list };
}
