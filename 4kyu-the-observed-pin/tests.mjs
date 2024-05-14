import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';

import { getPINs } from './solution.mjs';

const fixedTests = [{
  input: '0',
  result: ['0', '8']
}, {
  input: '2',
  result: ['1', '2', '3', '5']
}, {
  input: '8',
  result: ['0', '5', '7', '8', '9']
}, {
  input: '11',
  result: ['11', '12', '14', '21', '22', '24', '41', '42', '44']
}, {
  input: '46',
  result: ['13', '15', '16', '19', '43', '45', '46', '49', '53', '55', '56', '59', '73', '75', '76', '79']
}, {
  input: '58',
  result: [
    '20', '25', '27', '28', '29', '40', '45', '47', '48',
    '49', '50', '55', '57', '58', '59', '60', '65', '67',
    '68', '69', '80', '85', '87', '88', '89'
  ]
}, {
  input: '469',
  result: [
    '136', '138', '139', '156', '158',
    '159', '166', '168', '169', '196',
    '198', '199', '436', '438', '439',
    '456', '458', '459', '466', '468',
    '469', '496', '498', '499', '536',
    '538', '539', '556', '558', '559',
    '566', '568', '569', '596', '598',
    '599', '736', '738', '739', '756',
    '758', '759', '766', '768', '769',
    '796', '798', '799'
  ]
}, {
  input: '0317',
  result: [
    '0214', '0217', '0218', '0224', '0227',
    '0228', '0244', '0247', '0248', '0314',
    '0317', '0318', '0324', '0327', '0328',
    '0344', '0347', '0348', '0614', '0617',
    '0618', '0624', '0627', '0628', '0644',
    '0647', '0648', '8214', '8217', '8218',
    '8224', '8227', '8228', '8244', '8247',
    '8248', '8314', '8317', '8318', '8324',
    '8327', '8328', '8344', '8347', '8348',
    '8614', '8617', '8618', '8624', '8627',
    '8628', '8644', '8647', '8648'
  ]
}, {
  input: '825',
  result: [
    '012', '014', '015', '016', '018', '022', '024', '025',
    '026', '028', '032', '034', '035', '036', '038', '052',
    '054', '055', '056', '058', '512', '514', '515', '516',
    '518', '522', '524', '525', '526', '528', '532', '534',
    '535', '536', '538', '552', '554', '555', '556', '558',
    '712', '714', '715', '716', '718', '722', '724', '725',
    '726', '728', '732', '734', '735', '736', '738', '752',
    '754', '755', '756', '758', '812', '814', '815', '816',
    '818', '822', '824', '825', '826', '828', '832', '834',
    '835', '836', '838', '852', '854', '855', '856', '858',
    '912', '914', '915', '916', '918', '922', '924', '925',
    '926', '928', '932', '934', '935', '936', '938', '952',
    '954', '955', '956', '958'
  ]
}, {
  input: '007',
  result: ['004', '007', '008', '084', '087', '088', '804', '807', '808', '884', '887', '888']
}, {
  input: '00000000',
  result: [
    '00000000', '00000008', '00000080', '00000088', '00000800', '00000808', '00000880', '00000888',
    '00008000', '00008008', '00008080', '00008088', '00008800', '00008808', '00008880', '00008888',
    '00080000', '00080008', '00080080', '00080088', '00080800', '00080808', '00080880', '00080888',
    '00088000', '00088008', '00088080', '00088088', '00088800', '00088808', '00088880', '00088888',
    '00800000', '00800008', '00800080', '00800088', '00800800', '00800808', '00800880', '00800888',
    '00808000', '00808008', '00808080', '00808088', '00808800', '00808808', '00808880', '00808888',
    '00880000', '00880008', '00880080', '00880088', '00880800', '00880808', '00880880', '00880888',
    '00888000', '00888008', '00888080', '00888088', '00888800', '00888808', '00888880', '00888888',
    '08000000', '08000008', '08000080', '08000088', '08000800', '08000808', '08000880', '08000888',
    '08008000', '08008008', '08008080', '08008088', '08008800', '08008808', '08008880', '08008888',
    '08080000', '08080008', '08080080', '08080088', '08080800', '08080808', '08080880', '08080888',
    '08088000', '08088008', '08088080', '08088088', '08088800', '08088808', '08088880', '08088888',
    '08800000', '08800008', '08800080', '08800088', '08800800', '08800808', '08800880', '08800888',
    '08808000', '08808008', '08808080', '08808088', '08808800', '08808808', '08808880', '08808888',
    '08880000', '08880008', '08880080', '08880088', '08880800', '08880808', '08880880', '08880888',
    '08888000', '08888008', '08888080', '08888088', '08888800', '08888808', '08888880', '08888888',
    '80000000', '80000008', '80000080', '80000088', '80000800', '80000808', '80000880', '80000888',
    '80008000', '80008008', '80008080', '80008088', '80008800', '80008808', '80008880', '80008888',
    '80080000', '80080008', '80080080', '80080088', '80080800', '80080808', '80080880', '80080888',
    '80088000', '80088008', '80088080', '80088088', '80088800', '80088808', '80088880', '80088888',
    '80800000', '80800008', '80800080', '80800088', '80800800', '80800808', '80800880', '80800888',
    '80808000', '80808008', '80808080', '80808088', '80808800', '80808808', '80808880', '80808888',
    '80880000', '80880008', '80880080', '80880088', '80880800', '80880808', '80880880', '80880888',
    '80888000', '80888008', '80888080', '80888088', '80888800', '80888808', '80888880', '80888888',
    '88000000', '88000008', '88000080', '88000088', '88000800', '88000808', '88000880', '88000888',
    '88008000', '88008008', '88008080', '88008088', '88008800', '88008808', '88008880', '88008888',
    '88080000', '88080008', '88080080', '88080088', '88080800', '88080808', '88080880', '88080888',
    '88088000', '88088008', '88088080', '88088088', '88088800', '88088808', '88088880', '88088888',
    '88800000', '88800008', '88800080', '88800088', '88800800', '88800808', '88800880', '88800888',
    '88808000', '88808008', '88808080', '88808088', '88808800', '88808808', '88808880', '88808888',
    '88880000', '88880008', '88880080', '88880088', '88880800', '88880808', '88880880', '88880888',
    '88888000', '88888008', '88888080', '88888088', '88888800', '88888808', '88888880', '88888888'
  ]
}];

const neighbors = {
  1: ['1', '2', '4'],
  2: ['1', '2', '3', '5'],
  3: ['2', '3', '6'],
  4: ['1', '4', '5', '7'],
  5: ['2', '4', '5', '6', '8'],
  6: ['3', '5', '6', '9'],
  7: ['4', '7', '8'],
  8: ['5', '7', '8', '9', '0'],
  9: ['6', '8', '9'],
  0: ['8', '0']
};
const randomTests = Array.from({ length: 10 }, () => {
  let input = '';
  let numbers = [ '' ];
  const length = Math.ceil(Math.random() * 8)

  for (let i = 0; i < length; i++) {
    const digit = Math.trunc(Math.random() * 10);

    input += digit;
    numbers = numbers.flatMap(str => neighbors[digit].map(digit => str + digit));
  }

  return {
    input,
    result: numbers.sort()
  };
});

describe('[4kyu] The observed PIN', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(input, () => {
        deepEqual(getPINs(input).sort(), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(input, () => {
        deepEqual(getPINs(input).sort(), result);
      });
    }
  });
});