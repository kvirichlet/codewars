const AssemblerInterpreter = {
  mov (a1, a2) {
    this.registers[a1] = isNaN(a2) ? this.registers[a2] : Number(a2);
  },
  inc (a) {
    this.registers[a]++;
  },
  dec (a) {
    this.registers[a]--;
  },
  jnz (a1, a2) {
    if (this.registers[a1] !== 0) {
      this.pointer += (isNaN(a2) ? this.registers[a2] : Number(a2)) - 1;
    }
  }
};

export function simple_assembler (commands) { // eslint-disable-line camelcase
  const ctx = {
    pointer: 0,
    registers: {}
  };

  while (ctx.pointer < commands.length) {
    const line = commands[ctx.pointer].trim();
    const [command, ...args] = line.split(/\s+/);

    AssemblerInterpreter[command].call(ctx, ...args);

    ctx.pointer++;
  }

  return ctx.registers;
}
