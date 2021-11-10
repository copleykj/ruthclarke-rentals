import { makeObjectType } from 'graphql/utils/objectType';
import { inputObjectType } from 'nexus';
import { User, UserRole } from 'nexus-prisma';

import { PhoneRegEx } from 'graphql/regexes';

import * as Yup from 'yup';
import { makeCrud } from 'graphql/utils/makeCrud';

export const UserType = makeObjectType<'User'>({ model: User });

export const UsersSelectorInput = inputObjectType({
  name: 'UsersSelectorInput',
  definition (t) {
    t.string('email');
    t.string('firstName');
    t.string('lastName');
    t.string('phone');
    t.list.field('roles', { type: 'UserRole' });
  },
});

const UserDataValidation = ({ object, string, array }: typeof Yup) => (object({
  email: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  phone: string().matches(PhoneRegEx).required(),
  roles: array().of(string().oneOf(UserRole.members)),
}));

export const UserCrud = makeCrud({
  type: UserType,
  input: UsersSelectorInput,
  dataValidation: UserDataValidation,
});
