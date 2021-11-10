import { makeObjectType } from 'graphql/utils/objectType';
import { inputObjectType } from 'nexus';
import { Property, PropertyType as PropertyEnum } from 'nexus-prisma';
import * as Yup from 'yup';
import { makeCrud } from 'graphql/utils/makeCrud';

export const PropertyType = makeObjectType<'User'>({ model: Property });

export const PropertySelectorInput = inputObjectType({
  name: 'PropertySelectorInput',
  definition (t) {
    t.string('streetAddress');
    t.string('city');
    t.field('type', { type: 'PropertyType' });
    t.float('longitude');
    t.float('latitude');
    t.int('numUnits');
  },
});

const PropertyDataValidation = ({ object, string, number }: typeof Yup) => (object({
  streetAddress: string().required(),
  city: string().required(),
  type: string().oneOf(PropertyEnum.members).required(),
  latitude: number().min(-180).max(180).required(),
  longitude: number().min(-180).max(180).required(),
  numUnits: number().integer().min(0).required(),
}));

export const PropertyCrud = makeCrud({
  type: PropertyType,
  input: PropertySelectorInput,
  dataValidation: PropertyDataValidation,
});
