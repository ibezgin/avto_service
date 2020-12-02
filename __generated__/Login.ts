/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_authentication_login {
  __typename: "LoginType";
  id: string | null;
  username: string | null;
}

export interface Login_authentication {
  __typename: "AuthenticationMutation";
  login: Login_authentication_login | null;
}

export interface Login {
  authentication: Login_authentication;
}

export interface LoginVariables {
  username?: string | null;
  password?: string | null;
}
