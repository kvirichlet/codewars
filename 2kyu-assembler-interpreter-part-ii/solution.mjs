const instructions = {
  mov (x, y) {
    this.register[x] = this.getValue(y);
  },
  inc (x) {
    this.register[x] += 1;
  },
  dec (x) {
    this.register[x] -= 1;
  },
  add (x, y) {
    this.register[x] += this.getValue(y);
  },
  sub (x, y) {
    this.register[x] -= this.getValue(y);
  },
  mul (x, y) {
    this.register[x] *= this.getValue(y);
  },
  div (x, y) {
    this.register[x] = Math.trunc(this.register[x] / this.getValue(y));
  },
  jmp (label) {
    this.pointer = this.labels[label];
  },
  cmp (x, y) {
    this.cmp = this.getValue(x) - this.getValue(y);
  },
  jne (label) {
    if (this.cmp !== 0) {
      this.pointer = this.labels[label];
    }
  },
  je (label) {
    if (this.cmp === 0) {
      this.pointer = this.labels[label];
    }
  },
  jge (label) {
    if (this.cmp >= 0) {
      this.pointer = this.labels[label];
    }
  },
  jg (label) {
    if (this.cmp > 0) {
      this.pointer = this.labels[label];
    }
  },
  jle (label) {
    if (this.cmp <= 0) {
      this.pointer = this.labels[label];
    }
  },
  jl (label) {
    if (this.cmp < 0) {
      this.pointer = this.labels[label];
    }
  },
  call (label) {
    this.stack.push(this.pointer);
    this.pointer = this.labels[label];
  },
  ret () {
    this.pointer = this.stack.pop();
  },
  msg (...args) {
    this.output = args.map(arg => arg.startsWith('\'') ? arg.slice(1, -1) : this.register[arg]).join('');
  },
  end () {
    this.ended = true;
  }
};

export function assemblerInterpreter (code) {
  const ctx = {
    commands: [],
    register: {},
    labels: {},
    stack: [],
    pointer: 0,
    cmp: undefined,
    output: -1,
    ended: false,
    getValue: (arg) => isNaN(arg) ? ctx.register[arg] : Number(arg)
  };

  Object.assign(ctx, parseCode(code));

  while (ctx.pointer < ctx.commands.length && !ctx.ended) {
    const { instruction, args } = ctx.commands[ctx.pointer++];
    instructions[instruction].call(ctx, ...args);
  }

  return ctx.ended ? ctx.output : -1;
}

function parseCode (code) {
  const labels = {};
  const commands = [];
  const lines = code
    .split('\n')
    .map(line => line.replace(/;.+$/, '').trim())
    .filter(Boolean);

  for (const line of lines) {
    if (/^\w+:$/.test(line)) {
      const label = line.match(/^(\w+):$/)[1];
      labels[label] = commands.length;
      continue;
    }

    const [, instruction, rest] = line.match(/^(\w+)(.*)$/);
    const args = rest.trim().match(/(\w+|'.*?')((?!,\s*)(\w+|'.*?')){0,}/g) || [];

    commands.push({ instruction, args });
  }

  return { labels, commands };
}
