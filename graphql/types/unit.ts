import { makeObjectType } from 'graphql/utils/objectType';
import { inputObjectType } from 'nexus';
import { Unit } from 'nexus-prisma';
import * as Yup from 'yup';
import { makeCrud } from 'graphql/utils/makeCrud';

export const UnitType = makeObjectType<'User'>({ model: Unit });

export const UnitSelectorInput = inputObjectType({
  name: 'UnitSelectorInput',
  definition (t) {
    t.string('unitName');
    t.int('numBedrooms');
    t.float('numBathrooms');
    t.field('laundry', { type: 'LaundryType' });
    t.list.field('utilities', { type: 'Utility' });
  },
});

const UnitDataValidation = ({ object, string, array }: typeof Yup) => (object({
  public_id: string().required(),
  propertyId: string().uuid(),
  unitId: string().uuid(),
}));

export const UnitCrud = makeCrud({
  type: UnitType,
  input: UnitSelectorInput,
  dataValidation: UnitDataValidation,
});
