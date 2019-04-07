export type Maybe<T> = T | null;

/** ### UserQueryArgs More detail https://github.com/mixmaxhq/mongo-cursor-pagination#find #### Arguments - limit{Number} - The page size. - paginatedField{String} - The field name to query the range for. The field must be: - sortAscending {Boolean} - True to sort using paginatedField ascending (default is false - descending). - next {String} - The value to start querying the page. - previous {String} - The value to start querying previous page. - name{String} - User full name */
export interface UserQueryArgs {
  limit?: Maybe<number>;

  paginatedField?: Maybe<string>;

  sortAscending?: Maybe<boolean>;

  next?: Maybe<string>;

  previous?: Maybe<string>;

  name?: Maybe<string>;
}
/** UserInput - **email**:String - User email - **name**:String - User full name - **password**:String - User password */
export interface UserInput {
  email: string;

  name: string;

  password: string;
}
/** UserInputUpdate - **_id**:String - user primary key - **email**:String - User email - **name**:String - User full name - **password**:String - User password */
export interface UserUpdateInput {
  _id: string;

  email?: Maybe<string>;

  name?: Maybe<string>;

  password?: Maybe<string>;
}

export interface QueryArgs {
  limit?: Maybe<number>;

  paginatedField?: Maybe<string>;

  sortAscending?: Maybe<boolean>;

  next?: Maybe<string>;

  previous?: Maybe<string>;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  /** get all users */
  users?: Maybe<ConnectionUser>;
  /** fetch a user */
  user?: Maybe<User>;
}

export interface ConnectionUser {
  results?: Maybe<(Maybe<User>)[]>;

  previous?: Maybe<string>;

  hasPrevious?: Maybe<boolean>;

  next?: Maybe<string>;

  hasNext?: Maybe<boolean>;
}

/** User Schema */
export interface User {
  _id: string;

  createdAt: string;

  updatedAt?: Maybe<string>;

  email: string;

  name: string;

  password?: Maybe<string>;
}

export interface Mutation {
  /** create a new user */
  createUser?: Maybe<User>;
  /** update a user */
  updateUser?: Maybe<User>;
  /** delete a user */
  deleteUser?: Maybe<DeleteConfirmation>;
}

export interface DeleteConfirmation {
  _id?: Maybe<string>;

  status?: Maybe<string>;

  message?: Maybe<string>;
}

export interface Content {
  text?: Maybe<string>;
}

/** Generic GraphQL type Other GraphQL inherits these */
export interface Node {
  _id: string;

  createdAt: string;

  updatedAt?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface UsersQueryArgs {
  input?: Maybe<UserQueryArgs>;
}
export interface UserQueryArgs {
  _id: string;
}
export interface CreateUserMutationArgs {
  input?: Maybe<UserInput>;
}
export interface UpdateUserMutationArgs {
  input?: Maybe<UserUpdateInput>;
}
export interface DeleteUserMutationArgs {
  _id: string;
}
