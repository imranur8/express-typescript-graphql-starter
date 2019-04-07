import { GraphQLContext } from "../../../index";
import UserModel from "../../../model/user";
import { User, UserInput } from "../../../types";
import logger from "../../../utils/logger";

const createUser  = async ( input: UserInput, context: GraphQLContext ): Promise<User> => {
  try {
    const user = new UserModel(input);
    const response = await user.save();
    return response;
  } catch (error) {
    logger.error(error.message);
    throw error.message;
  }
};

export default createUser;
