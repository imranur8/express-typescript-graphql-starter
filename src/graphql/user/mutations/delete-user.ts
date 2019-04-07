import { GraphQLContext } from "../../../index";
import UserModel from "../../../model/user";
import { DeleteConfirmation } from "../../../types";
import logger from "../../../utils/logger";

const deleteUser  = async ( id: string , context: GraphQLContext ): Promise<DeleteConfirmation> => {
  try {
    const user = await UserModel.deleteOne({_id: id});
    if (!user.deletedCount) {
      logger.error(`User not found for: ${id}`);
      throw new Error(`User not found for: ${id}`);
    } else {
      return {
        _id : id,
        message: "User deleted successfully",
        status: "success"
      };
    }
  } catch (error) {
    logger.error(`${error.message} - ${id}`);
    throw error.message;
  }
};

export default deleteUser;
