import { makeObjectType } from 'graphql/utils/objectType';
import { inputObjectType } from 'nexus';
import { LaundryType, Unit, Utility } from 'nexus-prisma';
import * as Yup from 'yup';
import { makeCrud } from 'graphql/utils/makeCrud';

export const UnitType = makeObjectType<'User'>({ model: Unit });

export const UnitSelectorInput = inputObjectType({
  name: 'UnitSelectorInput',
  definition (t) {
    t.nonNull.string('address');
    t.nonNull.string('city');
    t.string('name');
    t.int('bedrooms');
    t.int('fullBaths');
    t.int('halfBaths');
    t.field('laundry', { type: 'LaundryType', default: 'NONE' });
    t.list.field('utilities', { type: 'Utility' });
    t.string('description');
    t.boolean('visible');
    t.dateTime('availableDate');
  },
});

const UnitDataValidation = ({ object, date, string, number, array, boolean }: typeof Yup) => (object({
  address: string(),
  city: string(),
  name: string(),
  bedrooms: number().integer().min(1),
  fullBaths: number().integer().min(1),
  halfBaths: number().integer().min(0),
  laundry: string().oneOf(LaundryType.members),
  utilities: array().of(string().oneOf(Utility.members)),
  description: string(),
  visible: boolean(),
  availableDate: date(),
}));

export const UnitCrud = makeCrud({
  type: UnitType,
  input: UnitSelectorInput,
  dataValidation: UnitDataValidation,
});
