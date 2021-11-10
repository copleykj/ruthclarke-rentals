import { chain, inputRule } from 'graphql-shield';
import { addRulesForQuery, isAdmin, isAuthenticated, validateFindByIdInput, validatePaginatedQueryInput, addRulesForMutation } from 'graphql/permissions';
import * as Yup from 'yup';
import { intArg, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus';

interface CrudDefinition {
  type: any;
  input: any;
  dataValidation: (yup: typeof Yup) => Yup.ObjectSchema
}

export const makeCrud = ({
  type,
  input,
  dataValidation,
}: CrudDefinition) => {
  const typeName = type.config.name as string;
  const lcTypeName = typeName.toLowerCase();
  const Edge = objectType({
    name: `${lcTypeName}Edge`,
    definition (t) {
      t.string('cursor');
      t.field('node', { type: type });
    },
  });

  const PaginatedResponse = objectType({
    name: `Paginated${typeName}Response`,
    definition (t) {
      t.field('pageInfo', { type: 'PageInfo' });
      t.list.field('edges', { type: Edge });
    },
  });

  // Paginated Query
  addRulesForQuery(`${lcTypeName}s`, chain(validatePaginatedQueryInput, isAuthenticated, isAdmin));

  const PaginatedQuery = queryField(`${lcTypeName}s`, {
    type: PaginatedResponse,
    args: {
      first: intArg({ default: 10 }),
      after: stringArg(),
    },
    async resolve (_parent, args, { prisma }: any) {
      const first = args.first ?? 10;
      const after = args.after;
      let queryResults = null;
      let queryOptions = {
        take: first,
      } as any;

      const collection = prisma[lcTypeName];

      if (after) {
        queryOptions = { ...queryOptions, skip: 1, cursor: { id: after } };
      }

      queryResults = await collection.findMany(queryOptions);

      if (queryResults.length > 0) {
        const endCursor = queryResults[queryResults.length - 1].id;
        const nextResultQueryOptions = {
          take: first,
          skip: 1,
          cursor: {
            id: endCursor,
          },
        };
        const nextResult = await collection.findMany(nextResultQueryOptions);

        const hasNextPage = nextResult.length >= first;

        return {
          pageInfo: {
            hasNextPage,
            endCursor,
          },
          edges: queryResults.map((result: any) => ({
            cursor: result.id,
            node: result,
          })),
        };
      }

      return {
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
        edges: [],
      };
    },
  });

  // Single Record Query
  addRulesForQuery(`${lcTypeName}`, chain(validateFindByIdInput, isAuthenticated));

  const SingleRecordQuery = queryField(lcTypeName, {
    type: type,
    args: {
      id: nonNull(stringArg()),
    },
    resolve (_parent, { id }, { prisma }: any) {
      const collection = prisma[lcTypeName];
      return collection.findUnique({
        where: {
          id: id,
        },
      });
    },
  });

  const validateInput = inputRule()((yup) => {
    const { object } = yup;
    return object({
      data: dataValidation(yup),
    });
  });

  addRulesForMutation(`create${typeName}`, chain(validateInput, isAuthenticated, isAdmin));

  const CreateMutation = mutationField(`create${typeName}`, {
    type: type,
    args: {
      data: nonNull(input),
    },
    resolve (_parent, { data }, { prisma }: any) {
      const collection = prisma[lcTypeName];
      return collection.create({ data });
    },
  });

  const ValidateUpdateInput = inputRule()((yup) => {
    const { string, object } = yup;
    return object({
      id: string().uuid().required(),
      data: dataValidation(yup),
    });
  });

  addRulesForMutation(`update${typeName}`, chain(ValidateUpdateInput, isAuthenticated, isAdmin));

  const UpdateMutation = mutationField(`update${typeName}`, {
    type: type,
    args: {
      id: nonNull(stringArg()),
      data: nonNull(input),
    },
    resolve (_parent, { id, data }, { prisma }: any) {
      const collection = prisma[lcTypeName];
      return collection.update({ where: { id: id }, data: data });
    },
  });

  addRulesForMutation(`delete${typeName}`, chain(validateFindByIdInput, isAuthenticated, isAdmin));

  const deleteMutation = mutationField(`delete${typeName}`, {
    type: type,
    args: {
      id: nonNull(stringArg()),
    },
    resolve (_parent, { id }, { prisma }: any) {
      const collection = prisma[lcTypeName];
      return collection.delete({ where: { id: id } });
    },
  });

  return [Edge, PaginatedResponse, PaginatedQuery, SingleRecordQuery, CreateMutation, UpdateMutation, deleteMutation];
};
