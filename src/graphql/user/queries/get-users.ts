import { GraphQLContext } from "../../../index";
import UserModel from "../../../model/user";
import { ConnectionUser, UserQueryArgs } from "../../../types";
import logger from "../../../utils/logger";

const getUsers = async ( input: UserQueryArgs, context: GraphQLContext ): Promise<ConnectionUser> => {
  try {
    const { limit, name } = input;
    let query = {};
    if (name) {
      query = {...query, name};
    }
    const users = await UserModel.paginate({limit, query});
    return users;
  } catch (error) {
    logger.error(error.message);
    throw error.message;
  }
};

export default getUsers;
