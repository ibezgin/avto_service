import { useQuery } from "@apollo/client";
import { Table } from "antd";
import ALL_ROLES from "./gql/all-roles.gql";
export const Roles = React.memo(() => {
    const allRolesQuery = useQuery(ALL_ROLES);
    return <Table />;
});
