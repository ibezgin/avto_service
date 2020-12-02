/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_authentication_currentUser {
  __typename: "LoginType";
  id: string | null;
  username: string | null;
  permission: any | null;
  position: string | null;
}

export interface CurrentUser_authentication {
  __typename: "AuthenticationQuery";
  currentUser: CurrentUser_authentication_currentUser | null;
}

export interface CurrentUser {
  authentication: CurrentUser_authentication;
}
