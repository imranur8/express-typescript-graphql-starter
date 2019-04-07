import { GraphQLContext } from "../../../index";
import UserModel from "../../../model/user";
import { User, UserUpdateInput } from "../../../types";
import logger from "../../../utils/logger";

const updateUser  = async ( input: UserUpdateInput, context: GraphQLContext ): Promise<User> => {
  const { _id } = input;
  try {
    const user: User = await UserModel.findOneAndUpdate({ _id }, input );
    if (!user) {
      logger.error(`User not found for: ${_id}`);
      throw new Error(`User not found for: ${_id}`);
    }
    return user;
  } catch (error) {
    logger.error(`${error.message} - ${_id}`);
    throw error.message;
  }
};

export default updateUser;
