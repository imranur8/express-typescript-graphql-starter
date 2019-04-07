import { GraphQLContext } from "../../index";
import {
  ConnectionUser,
  DeleteConfirmation,
  User
} from "../../types";
import createUser from "./mutations/create-user";
import deleteUser from "./mutations/delete-user";
import updateUser from "./mutations/update-user";
import getUser from "./queries/get-user";
import getUsers from "./queries/get-users";

exports.resolver = {
  User: {},
  Query: {
    user: async ({ }, args, context: GraphQLContext) => {
      const { _id } = args;
      return getUser(_id, context);
    },
    users: async ({ }, { input }, context: GraphQLContext): Promise<ConnectionUser> => {
      return getUsers(input, context);
    },
  },
  Mutation: {
    createUser: async ( {} , { input } , context: GraphQLContext): Promise<User> => {
      return createUser( input , context);
    },
    updateUser: async ( {} , { input } , context: GraphQLContext): Promise<User> => {
      return updateUser( input , context);
    },
    deleteUser: async ( {} , args , context: GraphQLContext): Promise<DeleteConfirmation> => {
      const { _id } = args;
      return deleteUser( _id , context);
    }
  },
};
