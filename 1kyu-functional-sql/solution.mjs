export function query () {
  const tables = [];
  const whereClauses = [];
  const groupByClauses = [];
  const havingClauses = [];
  let selector;
  let comparator;

  return {
    from (...args) {
      if (tables.length) throw new Error('Duplicate FROM');
      tables.push(...args.map(structuredClone));
      return this;
    },
    where (...args) {
      whereClauses.push(args);
      return this;
    },
    groupBy (...args) {
      if (groupByClauses.length) throw new Error('Duplicate GROUPBY');
      groupByClauses.push(...args);
      return this;
    },
    having (...args) {
      havingClauses.push(args);
      return this;
    },
    select (f = e => e) {
      if (selector) throw new Error('Duplicate SELECT');
      selector = f;
      return this;
    },
    orderBy (f) {
      if (comparator) throw new Error('Duplicate ORDERBY');
      comparator = f;
      return this;
    },
    execute () {
      let data = executeJoin(tables);
      data = executeWhere(data, whereClauses);
      data = executeGroupBy(data, groupByClauses);
      data = executeHaving(data, havingClauses);
      data = executeSelect(data, selector);
      data = executeOrderBy(data, comparator);
      return data;
    }
  };
}

function executeJoin (tables) {
  return tables.length < 2
    ? tables[0] ?? []
    : tables.reduce((acc, table) => acc.flatMap(part => table.map(next => [...part, next])), [[]]);
}

function executeWhere (data, whereClauses) {
  return whereClauses.length
    ? data.filter(datum => whereClauses.every(set => set.some(clause => clause(datum))))
    : data;
}

function executeGroupBy (data, clauses) {
  if (clauses.length === 0) return data;

  const [clause, ...restClauses] = clauses;
  const map = new Map();

  for (const datum of data) {
    const key = clause(datum);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(datum);
  }

  return Array.from(map.entries()).map(([key, values]) => [key, executeGroupBy(values, restClauses)]);
}

function executeHaving (data, havingClauses) {
  return havingClauses.length
    ? data.filter(datum => havingClauses.every(set => set.some(clause => clause(datum))))
    : data;
}

function executeSelect (data, selector) {
  return selector ? data.map(selector) : data;
}

function executeOrderBy (data, comparator) {
  return comparator ? data.sort(comparator) : data;
}
