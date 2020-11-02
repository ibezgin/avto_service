import { gql } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/camelcase
export const All_BRAND = gql`
    query AllBrand {
        brand {
            allBrand {
                _id
                title
            }
        }
    }
`;
