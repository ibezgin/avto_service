import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../gql/authentication/current-user";
import { Query } from "../service/types/types";

export function useUser() {
    const currentUserQuery = useQuery<Query>(CURRENT_USER);

    const currentUser = currentUserQuery.data?.authentication.currentUser;

    return currentUser;
}
