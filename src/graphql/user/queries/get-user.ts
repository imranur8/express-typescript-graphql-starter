import { GraphQLContext } from "../../../index";
import UserModel from "../../../model/user";
import { User } from "../../../types";
import logger from "../../../utils/logger";

const getUser = async ( id , context: GraphQLContext ): Promise<User> => {
  try {
    const user = await UserModel.findOne({_id: id});
    return user;
  } catch (error) {
    logger.error(error.message);
    throw error.message;
  }
};

export default getUser;
