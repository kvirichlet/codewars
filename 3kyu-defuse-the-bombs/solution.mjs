/* eslint-disable */
const puzzleSolutions = [
  () => {
    Bomb.diffuse(42);
  },
  () => {
    Bomb.diffuse();
    Bomb.diffuse();
    Bomb.diffuse();
    Bomb.diffuse();
    Bomb.diffuse();
  },
  () => {
    Bomb.diffuse(global.BombKey);
  },
  () => {
    diffuseTheBomb = () => true;
    Bomb.diffuse();
  },
  () => {
    console.log(atob(Bomb.hint.match(/[^\s]+/)));
    Bomb.diffuse(3.14159);
  },
  () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 4);
    Bomb.diffuse(date);
  },
  () => {
    Bomb.diffuse(Object.freeze({ key: 43 }));
  },
  () => {
    const obj = {
      valueOf () {
        if (!this.touched) {
          this.touched = true;
          return 9;
        }
        return 11;
      }
    };
    Bomb.diffuse(obj);
  },
  () => {
    const obj = {
      valueOf () {
        if (!this.touched) {
          this.touched = true;
          return 0.5;
        }
        return 1;
      }
    };
    Math.random = () => obj;
    Bomb.diffuse(42);
  },
  () => {
    Array.prototype.valueOf = function () {
      return this.reduce((acc, current) => acc + current);
    };
    Bomb.diffuse(new Buffer('yes').toString('base64'));
  }
];

for (let i = 0; i < puzzleSolutions.length; i++) {
  console.log(`> ${puzzleSolutions.length - i}th bomb hint: ${Bomb.hint}`);
  console.log(String(Bomb.diffuse));
  puzzleSolutions[i]();
  console.log('='.repeat(20) + '\n');
}
