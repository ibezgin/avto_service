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
  role: RoleQuery;
  brand: BrandQuery;
  _keep?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  role: RoleMutation;
  brand: BrandMutation;
  _keep?: Maybe<Scalars['Boolean']>;
};

export type RoleQuery = {
  __typename?: 'RoleQuery';
  allRoles: Array<RoleType>;
};

export type RoleMutation = {
  __typename?: 'RoleMutation';
  addRole?: Maybe<Scalars['Boolean']>;
};


export type RoleMutationAddRoleArgs = {
  title: Scalars['String'];
  permission?: Maybe<Scalars['JSON']>;
};

export type RoleType = {
  __typename?: 'RoleType';
  _id: Scalars['String'];
  title: Scalars['String'];
  permission?: Maybe<Scalars['JSON']>;
};

export type BrandQuery = {
  __typename?: 'BrandQuery';
  allBrands: Array<BrandType>;
};

export type BrandMutation = {
  __typename?: 'BrandMutation';
  addBrand?: Maybe<Scalars['Boolean']>;
  deleteBrand?: Maybe<Scalars['Boolean']>;
};


export type BrandMutationAddBrandArgs = {
  title: Scalars['String'];
};


export type BrandMutationDeleteBrandArgs = {
  id: Scalars['String'];
};

export type BrandType = {
  __typename?: 'BrandType';
  _id: Scalars['String'];
  title: Scalars['String'];
};



