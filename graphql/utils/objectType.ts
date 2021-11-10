import { objectType, enumType } from 'nexus';

interface IFieldResolvers {
  [key: string]: (...args: any[]) => any;
}

export const makeDefinition = (model: any, omitFields: string[] = [], fieldResolvers: IFieldResolvers = {}) => {
  const omittedFields = [...omitFields, '$name', '$description'];
  return function definition (t: any) {
    Object.entries(model).forEach((key) => {
      const [fieldName, fieldDefinition] = key;
      if (!omittedFields.includes(fieldName)) {
        if (typeof fieldResolvers[fieldName] !== 'undefined') {
          t.field({
            ...fieldDefinition as object,
            resolve: fieldResolvers[fieldName],
          });
        } else {
          t.field(fieldDefinition);
        }
      }
    });
  };
};

interface IMakeObjectTypeOptions {
  model: any;
  omitFields?: string[];
  fieldResolvers?: IFieldResolvers;
}

export const makeObjectType = <T extends string> ({ model, omitFields = [], fieldResolvers = {} }: IMakeObjectTypeOptions) => {
  return objectType<T>({
    name: model.$name,
    description: model.$description,
    definition: makeDefinition(model, omitFields),
  });
};

export const makeEnumTypes = (enums: any[]) => {
  return enums.map(enumField => enumType(enumField));
};
