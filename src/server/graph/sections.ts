import { querySubSchema } from "./query";
import { roleSubSchema } from "./sections/role";
import { SubSchema } from "./sub-schema";

export const sections: SubSchema[] = [roleSubSchema];

export const schemas: SubSchema[] = [...sections, querySubSchema];
