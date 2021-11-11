import { makeObjectType } from 'graphql/utils/objectType';
import { inputObjectType } from 'nexus';
import { LaundryType, Unit, Utility } from 'nexus-prisma';
import * as Yup from 'yup';
import { makeCrud } from 'graphql/utils/makeCrud';

export const UnitType = makeObjectType<'User'>({ model: Unit });

export const UnitSelectorInput = inputObjectType({
  name: 'UnitSelectorInput',
  definition (t) {
    t.nonNull.string('unitName');
    t.int('numBedrooms');
    t.int('numFullBathrooms');
    t.int('numHalfBathrooms');
    t.field('laundry', { type: 'LaundryType', default: 'NONE' });
    t.list.field('utilities', { type: 'Utility' });
    t.string('description');
    t.boolean('available');
    t.dateTime('availableDate');
    t.nonNull.id('propertyId');
  },
});

const UnitDataValidation = ({ object, date, string, number, array, boolean }: typeof Yup) => (object({
  unitName: string().required(),
  numBedrooms: number().integer().min(1),
  numFullBathrooms: number().integer().min(1),
  numHalfBathrooms: number().integer().min(0),
  laundry: string().oneOf(LaundryType.members),
  utilities: array().of(string().oneOf(Utility.members)),
  description: string(),
  available: boolean(),
  availableDate: date(),
  propertyId: string().required(),
}));

export const UnitCrud = makeCrud({
  type: UnitType,
  input: UnitSelectorInput,
  dataValidation: UnitDataValidation,
});
