import { describe, it } from 'node:test';
import { deepEqual, throws } from 'node:assert';

import { query } from './solution.mjs';

describe('[1kyu] Functional SQL', () => {
  const people = [
    { name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' },
    { name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single' },
    { name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' },
    { name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married' },
    { name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married' },
    { name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single' },
    { name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married' }
  ];

  const peopleFrequency = [
    ['Peter', 3],
    ['Anna', 4],
    ['Peter', 7],
    ['Michael', 10]
  ];

  const teachers = [
    { teacherId: '1', teacherName: 'Peter' },
    { teacherId: '2', teacherName: 'Anna' }
  ];

  const students = [
    { studentName: 'Michael', tutor: '1' },
    { studentName: 'Rose', tutor: '2' }
  ];

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const profession = person => person.profession;
  const name = person => person.name;
  const age = person => person.age;
  const maritalStatus = person => person.maritalStatus;
  const isTeacher = person => person.profession === 'teacher';
  const professionCount = group => [group[0], group[1].length];
  const naturalCompare = (value1, value2) => (value1 < value2) ? -1 : ((value1 > value2) ? 1 : 0);
  const number = arg => arg;

  describe('Fixed Tests', () => {
    function runTests (tests) {
      tests.forEach(({ title, query, result }) => it(title, () => deepEqual(query.execute(), result)));
    }

    describe('Basic SELECT Tests', () => {
      runTests([{
        title: 'query().select().from(people).execute()',
        query: query().select().from(people),
        result: people
      }, {
        title: 'query().select().execute()',
        query: query().select(),
        result: []
      }, {
        title: 'query().from(people).execute()',
        query: query().from(people),
        result: people
      }, {
        title: 'query().execute()',
        query: query(),
        result: []
      }, {
        title: 'query().from(people).select().execute()',
        query: query().from(people).select(),
        result: people
      }]);
    });

    describe('Basic SELECT and WHERE Over Objects', () => {
      runTests([{
        title: 'query().select().from(people).execute()',
        query: query().select().from(people),
        result: people
      }, {
        title: 'query().select(profession).from(people).execute()',
        query: query().select(profession).from(people),
        result: ['teacher', 'teacher', 'teacher', 'scientific', 'scientific', 'scientific', 'politician']
      }, {
        title: 'query().select(profession).execute()',
        query: query().select(profession),
        result: []
      }, {
        title: 'query().select(profession).from(people).where(isTeacher).execute()',
        query: query().select(profession).from(people).where(isTeacher),
        result: ['teacher', 'teacher', 'teacher']
      }, {
        title: 'query().from(people).where(isTeacher).execute()',
        query: query().from(people).where(isTeacher),
        result: people.slice(0, 3)
      }, {
        title: 'query().select(name).from(people).where(isTeacher).execute()',
        query: query().select(name).from(people).where(isTeacher),
        result: ['Peter', 'Michael', 'Peter']
      }, {
        title: 'query().where(isTeacher).from(people).select(name).execute()',
        query: query().where(isTeacher).from(people).select(name),
        result: ['Peter', 'Michael', 'Peter']
      }]);
    });

    describe('GROUP BY Tests', () => {
      runTests([{
        title: 'query().select().from(people).groupBy(profession).execute()',
        query: query().select().from(people).groupBy(profession),
        result: [['teacher', [{ name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }, { name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single' }, { name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }]], ['scientific', [{ name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married' }, { name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married' }, { name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single' }]], ['politician', [{ name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married' }]]]
      }, {
        title: 'query().select().from(people).where(isTeacher).groupBy(profession).execute()',
        query: query().select().from(people).where(isTeacher).groupBy(profession),
        result: [['teacher', [{ name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }, { name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single' }, { name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }]]]
      }, {
        title: 'query().select().from(people).groupBy(profession, name).execute()',
        query: query().select().from(people).groupBy(profession, name),
        result: [['teacher', [['Peter', [{ name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }, { name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }]], ['Michael', [{ name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single' }]]]], ['scientific', [['Anna', [{ name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married' }, { name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single' }]], ['Rose', [{ name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married' }]]]], ['politician', [['Anna', [{ name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married' }]]]]]
      }, {
        title: 'query().select().from(people).groupBy(profession, name, age, maritalStatus).execute()',
        query: query().select().from(people).groupBy(profession, name, age, maritalStatus),
        result: [['teacher', [['Peter', [[20, [['married', [{ name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }, { name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married' }]]]]]], ['Michael', [[50, [['single', [{ name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single' }]]]]]]]], ['scientific', [['Anna', [[20, [['married', [{ name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married' }]], ['single', [{ name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single' }]]]]]], ['Rose', [[50, [['married', [{ name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married' }]]]]]]]], ['politician', [['Anna', [[50, [['married', [{ name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married' }]]]]]]]]]
      }, {
        title: 'query().select(professionCount).from(people).groupBy(profession).orderBy(naturalCompare).execute()',
        query: query().select(professionCount).from(people).groupBy(profession).orderBy(naturalCompare),
        result: [['politician', 1], ['scientific', 3], ['teacher', 3]]
      }, {
        title: 'query().select(professionCount).from(people).groupBy(profession).orderBy(naturalCompare).execute()',
        query: query().from(numbers).groupBy(number),
        result: [[1, [1]], [2, [2]], [3, [3]], [4, [4]], [5, [5]], [6, [6]], [7, [7]], [8, [8]], [9, [9]]]
      }]);
    });

    describe('Numbers Tests', () => {
      const prime = number => [2, 3, 5, 7].includes(number) ? 'prime' : 'divisible';
      const isEven = number => number % 2 === 0;
      const parity = number => isEven(number) ? 'even' : 'odd';
      const descendentCompare = (number1, number2) => number2 - number1;
      const odd = group => group[0] === 'odd';
      const lessThan3 = number => number < 3;
      const greaterThan4 = number => number > 4;

      runTests([{
        title: 'query().select().from(numbers).execute()',
        query: query().select().from(numbers),
        result: numbers
      }, {
        title: 'query().select().from(numbers).groupBy(parity).execute()',
        query: query().select().from(numbers).groupBy(parity),
        result: [['odd', [1, 3, 5, 7, 9]], ['even', [2, 4, 6, 8]]]
      }, {
        title: 'query().select().from(numbers).groupBy(parity, prime).execute()',
        query: query().select().from(numbers).groupBy(parity, prime),
        result: [['odd', [['divisible', [1, 9]], ['prime', [3, 5, 7]]]], ['even', [['prime', [2]], ['divisible', [4, 6, 8]]]]]
      }, {
        title: 'query().select().from(numbers).groupBy(parity).having(odd).execute()',
        query: query().select().from(numbers).groupBy(parity).having(odd),
        result: [['odd', [1, 3, 5, 7, 9]]]
      }, {
        title: 'query().select().from(numbers).orderBy(descendentCompare).execute()',
        query: query().select().from(numbers).orderBy(descendentCompare),
        result: [9, 8, 7, 6, 5, 4, 3, 2, 1]
      }, {
        title: 'query().select().from(numbers).where(lessThan3, greaterThan4).execute()',
        query: query().select().from(numbers).where(lessThan3, greaterThan4),
        result: [1, 2, 5, 6, 7, 8, 9]
      }]);
    });

    describe('Frequency Tests', () => {
      const sumValues = ([name, values]) => [name, values.reduce((result, person) => result + person[1], 0)];
      const nameGrouping = person => person[0];
      const id = value => value;
      const frequency = group => ({ value: group[0], frequency: group[1].length });
      const greaterThan1 = group => group[1].length > 1;
      const greaterThan5 = group => group[0] > 5;
      const isOdd = group => group[0] % 2 !== 0;
      const isPair = group => group[0] % 2 === 0;

      const numbers = [1, 2, 1, 3, 5, 6, 1, 2, 5, 6];

      runTests([{
        title: 'query().select(sumValues).from(peopleFrequency).orderBy(naturalCompare).groupBy(nameGrouping).execute()',
        query: query().select(sumValues).from(peopleFrequency).orderBy(naturalCompare).groupBy(nameGrouping),
        result: [['Anna', 4], ['Michael', 10], ['Peter', 10]]
      }, {
        title: 'query().select(frequency).from(numbers).groupBy(id).execute()',
        query: query().select(frequency).from(numbers).groupBy(id),
        result: [{ value: 1, frequency: 3 }, { value: 2, frequency: 2 }, { value: 3, frequency: 1 }, { value: 5, frequency: 2 }, { value: 6, frequency: 2 }]
      }, {
        title: 'query().select(frequency).from(numbers).groupBy(id).having(greaterThan1).having(isPair).execute()',
        query: query().select(frequency).from(numbers).groupBy(id).having(greaterThan1).having(isPair),
        result: [{ value: 2, frequency: 2 }, { value: 6, frequency: 2 }]
      }, {
        title: 'query().select(frequency).from(numbers).groupBy(id).having(greaterThan5, isOdd).execute()',
        query: query().select(frequency).from(numbers).groupBy(id).having(greaterThan5, isOdd),
        result: [{ value: 1, frequency: 3 }, { value: 3, frequency: 1 }, { value: 5, frequency: 2 }, { value: 6, frequency: 2 }]
      }]);
    });

    describe('Join Tests', () => {
      const teacherJoin = (join) => join[0].teacherId === join[1].tutor;
      const student = (join) => ({ studentName: join[1].studentName, teacherName: join[0].teacherName });
      const tutor1 = (join) => join[1].tutor === '1';

      const numbers1 = [1, 2];
      const numbers2 = [4, 5];

      runTests([{
        title: 'query().select(student).from(teachers, students).where(teacherJoin).execute()',
        query: query().select(student).from(teachers, students).where(teacherJoin),
        result: [{ studentName: 'Michael', teacherName: 'Peter' }, { studentName: 'Rose', teacherName: 'Anna' }]
      }, {
        title: 'query().select().from(numbers1, numbers2).execute()',
        query: query().select().from(numbers1, numbers2),
        result: [[1, 4], [1, 5], [2, 4], [2, 5]]
      }, {
        title: 'query().select(student).from(teachers, students).where(teacherJoin).where(tutor1).execute()',
        query: query().select(student).from(teachers, students).where(teacherJoin).where(tutor1),
        result: [{ studentName: 'Michael', teacherName: 'Peter' }]
      }, {
        title: 'query().where(teacherJoin).select(student).where(tutor1).from(teachers, students).execute()',
        query: query().where(teacherJoin).select(student).where(tutor1).from(teachers, students),
        result: [{ studentName: 'Michael', teacherName: 'Peter' }]
      }]);
    });

    describe('Order of Clause Execution Tests', () => {
      const firstElement = (pair) => pair[0];
      const secondElement = (pair) => pair[1];
      const firstElementOdd = (pair) => pair[0] % 2 !== 0;
      const greaterThan6 = (group) => group[0] > 6;

      const numbers = [[9, 5], [2, 8], [3, 3], [0, 5]];

      runTests([{
        title: 'query().orderBy(naturalCompare).select(secondElement).from(numbers).execute()',
        query: query().orderBy(naturalCompare).select(secondElement).from(numbers),
        result: [3, 5, 5, 8]
      }, {
        title: 'query().groupBy(secondElement).where(firstElementOdd).from(numbers).execute()',
        query: query().groupBy(secondElement).where(firstElementOdd).from(numbers),
        result: [[5, [[9, 5]]], [3, [[3, 3]]]]
      }, {
        title: 'query().having(greaterThan6).groupBy(secondNumber).from(numbers).execute()',
        query: query().having(greaterThan6).groupBy(secondElement).from(numbers),
        result: [[8, [[2, 8]]]]
      }, {
        title: 'query().select(secondElement).having(greaterThan6).groupBy(firstElement).from(numbers).execute()',
        query: query().select(secondElement).having(greaterThan6).groupBy(firstElement).from(numbers),
        result: [[[9, 5]]]
      }]);
    });

    describe('Duplication Exception Tests', () => {
      const cases = [{
        title: 'query().select().select().execute()',
        fn: () => query().select().select().execute(),
        clause: 'SELECT'
      }, {
        title: 'query().select().from(people).select().execute()',
        fn: () => query().select().from(people).select().execute(),
        clause: 'SELECT'
      }, {
        title: 'query().select().from(people).from(people).execute()',
        fn: () => query().select().from(people).from(people).execute(),
        clause: 'FROM'
      }, {
        title: 'query().select().from(people).orderBy(naturalCompare).orderBy(naturalCompare).execute()',
        fn: () => query().select().from(people).orderBy(naturalCompare).orderBy(naturalCompare).execute(),
        clause: 'ORDERBY'
      }, {
        title: '() => query().select().groupBy(profession).from(people).groupBy(profession).execute()',
        fn: () => query().select().groupBy(profession).from(people).groupBy(profession).execute(),
        clause: 'GROUPBY'
      }];

      for (const { title, fn, clause } of cases) {
        it(title, () => {
          throws(fn, new RegExp(`^Error: Duplicate ${clause}$`, 'i'));
        });
      }
    });
  });
});
