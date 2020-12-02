import _ from "lodash";
import { AccessEnum } from "../service/enums/access";
import { useUser } from "./use-user";

export function usePermission() {
    const user = useUser();

    const hasPermission = (permission: AccessEnum) => {
        const isAviable = _.get(user, ["permission", permission]);

        return !!isAviable;
    };

    return { hasPermission };
}
