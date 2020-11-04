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
  _keep?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  brand: BrandMutation;
  models: ModelsMutation;
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



