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
  clients: ClientsQuery;
  cars: CarsQuery;
  _keep?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  brand: BrandMutation;
  models: ModelsMutation;
  service: ServiceMutation;
  carPart: CarPartMutation;
  clients: ClientsMutation;
  cars: CarsMutation;
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
};

export type ClientInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
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



