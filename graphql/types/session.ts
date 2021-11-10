import { makeObjectType } from 'graphql/utils/objectType';
import { Session } from 'nexus-prisma';

export const SessionType = makeObjectType<'Session'>({ model: Session });
