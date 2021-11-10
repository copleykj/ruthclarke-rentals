import { makeObjectType } from 'graphql/utils/objectType';
import { inputObjectType } from 'nexus';
import { Photo } from 'nexus-prisma';
import * as Yup from 'yup';
import { makeCrud } from 'graphql/utils/makeCrud';

export const PhotoType = makeObjectType<'User'>({ model: Photo });

export const PhotoSelectorInput = inputObjectType({
  name: 'PhotoSelectorInput',
  definition (t) {
    t.string('public_id');
    t.string('propertyId');
    t.string('unitId');
    t.string('phone');
    t.field('roles', { type: 'UserRole' });
  },
});

const PhotoDataValidation = ({ object, string, array }: typeof Yup) => (object({
  public_id: string().required(),
  propertyId: string().uuid(),
  unitId: string().uuid(),
}));

export const PhotoCrud = makeCrud({
  type: PhotoType,
  input: PhotoSelectorInput,
  dataValidation: PhotoDataValidation,
});
