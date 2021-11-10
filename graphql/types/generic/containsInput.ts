import { inputObjectType } from 'nexus';

export const containsInput = inputObjectType({
  name: 'ContainsInput',
  definition (t) {
    t.string('contains');
  },
});
