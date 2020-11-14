export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  JSONObject: any;
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  brand: BrandQuery;
  models: ModelsQuery;
  service: ServiceQuery;
  carPart: CarPartQuery;
  users: UsersQuery;
  clients: ClientsQuery;
  authentication: AuthenticationQuery;
  cars: CarsQuery;
  proposal: ProposalQuery;
  _keep?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  brand: BrandMutation;
  models: ModelsMutation;
  service: ServiceMutation;
  carPart: CarPartMutation;
  users: UsersMutation;
  clients: ClientsMutation;
  authentication: AuthenticationMutation;
  cars: CarsMutation;
  proposal: ProposalMutation;
  _keep?: Maybe<Scalars['Boolean']>;
};

export type BrandQuery = {
  __typename?: 'BrandQuery';
  allBrands: Array<BrandType>;
};

export type BrandMutation = {
  __typename?: 'BrandMutation';
  addBrand?: Maybe<Scalars['Boolean']>;
  deleteBrand?: Maybe<Scalars['Boolean']>;
  updateBrand?: Maybe<Scalars['Boolean']>;
};


export type BrandMutationAddBrandArgs = {
  title: Scalars['String'];
};


export type BrandMutationDeleteBrandArgs = {
  id: Scalars['String'];
};


export type BrandMutationUpdateBrandArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};

export type BrandType = {
  __typename?: 'BrandType';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type ModelsQuery = {
  __typename?: 'ModelsQuery';
  allModels: Array<ModelType>;
};

export type ModelsMutation = {
  __typename?: 'ModelsMutation';
  addModel?: Maybe<Scalars['Boolean']>;
  deleteModel?: Maybe<Scalars['Boolean']>;
  updateModel?: Maybe<Scalars['Boolean']>;
};


export type ModelsMutationAddModelArgs = {
  title: Scalars['String'];
  brandId: Scalars['String'];
};


export type ModelsMutationDeleteModelArgs = {
  id: Scalars['String'];
};


export type ModelsMutationUpdateModelArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
  brandId?: Maybe<Scalars['String']>;
};

export type ModelType = {
  __typename?: 'ModelType';
  id: Scalars['String'];
  brandId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ServiceQuery = {
  __typename?: 'ServiceQuery';
  allServices: Array<ServiceType>;
};

export type ServiceMutation = {
  __typename?: 'ServiceMutation';
  addService?: Maybe<Scalars['Boolean']>;
  deleteService?: Maybe<Scalars['Boolean']>;
  updateService?: Maybe<Scalars['Boolean']>;
};


export type ServiceMutationAddServiceArgs = {
  title: Scalars['String'];
  price: Scalars['Float'];
};


export type ServiceMutationDeleteServiceArgs = {
  id: Scalars['String'];
};


export type ServiceMutationUpdateServiceArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
  price: Scalars['Float'];
};

export type ServiceType = {
  __typename?: 'ServiceType';
  id: Scalars['String'];
  title: Scalars['String'];
  price: Scalars['Float'];
};

export type CarPartQuery = {
  __typename?: 'CarPartQuery';
  allCarParts: Array<CarPartType>;
};

export type CarPartMutation = {
  __typename?: 'CarPartMutation';
  addCarPart?: Maybe<Scalars['Boolean']>;
  deleteCarPart?: Maybe<Scalars['Boolean']>;
  updateCarPart?: Maybe<Scalars['Boolean']>;
};


export type CarPartMutationAddCarPartArgs = {
  title: Scalars['String'];
  price: Scalars['Float'];
};


export type CarPartMutationDeleteCarPartArgs = {
  id: Scalars['String'];
};


export type CarPartMutationUpdateCarPartArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
  price: Scalars['Float'];
};

export type CarPartType = {
  __typename?: 'CarPartType';
  id: Scalars['String'];
  title: Scalars['String'];
  price: Scalars['Float'];
};

export type UsersQuery = {
  __typename?: 'UsersQuery';
  allUsers?: Maybe<Array<Maybe<UserType>>>;
};

export type UsersMutation = {
  __typename?: 'UsersMutation';
  addUser?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<Scalars['Boolean']>;
};


export type UsersMutationAddUserArgs = {
  data?: Maybe<UserInput>;
};


export type UsersMutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type UsersMutationUpdateUserArgs = {
  id: Scalars['String'];
  data: UserInput;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  permission?: Maybe<Array<Maybe<Scalars['String']>>>;
  position: Scalars['String'];
};

export type UserInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  permission?: Maybe<Array<Maybe<Scalars['String']>>>;
  position: Scalars['String'];
};

export type ClientsQuery = {
  __typename?: 'ClientsQuery';
  allClients: Array<ClientType>;
};

export type ClientsMutation = {
  __typename?: 'ClientsMutation';
  addClient?: Maybe<Scalars['Boolean']>;
  deleteClient?: Maybe<Scalars['Boolean']>;
  updateClient?: Maybe<Scalars['Boolean']>;
};


export type ClientsMutationAddClientArgs = {
  data: ClientInput;
};


export type ClientsMutationDeleteClientArgs = {
  id: Scalars['String'];
};


export type ClientsMutationUpdateClientArgs = {
  id: Scalars['String'];
  data: ClientInput;
};

export type ClientType = {
  __typename?: 'ClientType';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  createTime: Scalars['String'];
};

export type ClientInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  createTime: Scalars['String'];
};

export type AuthenticationQuery = {
  __typename?: 'AuthenticationQuery';
  currentUser?: Maybe<LoginType>;
};

export type AuthenticationMutation = {
  __typename?: 'AuthenticationMutation';
  login?: Maybe<LoginType>;
  logout?: Maybe<Scalars['Boolean']>;
};


export type AuthenticationMutationLoginArgs = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type LoginType = {
  __typename?: 'LoginType';
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  permission?: Maybe<Scalars['JSON']>;
  position?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CarsQuery = {
  __typename?: 'CarsQuery';
  allCars: Array<CarType>;
};

export type CarsMutation = {
  __typename?: 'CarsMutation';
  addCar?: Maybe<Scalars['Boolean']>;
  deleteCar?: Maybe<Scalars['Boolean']>;
  updateCar?: Maybe<Scalars['Boolean']>;
};


export type CarsMutationAddCarArgs = {
  data: CarInput;
};


export type CarsMutationDeleteCarArgs = {
  id: Scalars['String'];
};


export type CarsMutationUpdateCarArgs = {
  id: Scalars['String'];
  data: CarInput;
};

export type CarType = {
  __typename?: 'CarType';
  id: Scalars['String'];
  brandId: Scalars['String'];
  modelId: Scalars['String'];
  clientId: Scalars['String'];
  gosNumber: Scalars['String'];
  color: Scalars['String'];
};

export type CarInput = {
  brandId: Scalars['String'];
  modelId: Scalars['String'];
  clientId: Scalars['String'];
  gosNumber: Scalars['String'];
  color: Scalars['String'];
};

export type ProposalQuery = {
  __typename?: 'ProposalQuery';
  allProposals: Array<ProposalType>;
  proposalById: ProposalType;
};


export type ProposalQueryProposalByIdArgs = {
  id: Scalars['String'];
};

export type ProposalMutation = {
  __typename?: 'ProposalMutation';
  addProposal?: Maybe<Scalars['Boolean']>;
  deleteProposal?: Maybe<Scalars['Boolean']>;
  updateProposal?: Maybe<Scalars['Boolean']>;
};


export type ProposalMutationAddProposalArgs = {
  data: ProposalInput;
};


export type ProposalMutationDeleteProposalArgs = {
  id: Scalars['String'];
};


export type ProposalMutationUpdateProposalArgs = {
  id: Scalars['String'];
  data?: Maybe<ProposalInput>;
};

export type ProposalType = {
  __typename?: 'ProposalType';
  id: Scalars['String'];
  createTime: Scalars['String'];
  changeTime: Scalars['String'];
  status: Scalars['Int'];
  clientId: Scalars['String'];
  carId: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  proposalReason?: Maybe<Scalars['String']>;
  technicalInspectionResult?: Maybe<Scalars['String']>;
  recomendedWork?: Maybe<Array<Maybe<Scalars['String']>>>;
  completedWork?: Maybe<Scalars['JSON']>;
};

export type ProposalInput = {
  createTime: Scalars['String'];
  changeTime: Scalars['String'];
  status: Scalars['Int'];
  clientId: Scalars['String'];
  carId: Scalars['String'];
  userId: Scalars['String'];
  proposalReason?: Maybe<Scalars['String']>;
  technicalInspectionResult?: Maybe<Scalars['String']>;
  recomendedWork?: Maybe<Array<Maybe<Scalars['String']>>>;
  completedWork?: Maybe<Scalars['JSON']>;
};



