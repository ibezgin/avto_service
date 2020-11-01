import { gql, IResolvers } from "apollo-server-express";
import { RequestContext } from "../request-context";

export const productsTypeDeff = gql`
    extend type Query {
        products: ProductsQuery!
    }
    extend type Mutation{
        products: ProductsMutation!
    }
    type ProductsQuery{
        allProducts: [ProductType]
    }
    type ProductsMutation {
        addProduct(value:ProductInput):Boolean
        updateProduct(value: ProductInput):Boolean
        deleteProduct(id: String):Boolean
    }
    type ProductType{
        _id: String
        title: String
        price: String
        imagePath: String
        count: Int
        isDisplayed: Boolean
    }
    input ProductInput {
        _id: String
        title: String
        price: Float
        imagePath: String
        count: Int
        isDisplayed: Boolean
    }
`;
export const productsResolvers: IResolvers<any, RequestContext> = {
    Query: {
        products: () => ({}),
    },
    Mutation: {
        products: () => ({}),
    },
    ProductsQuery: {
        allProducts: async (obj, props, { helpers }) =>
            await helpers.sections.products.allProducts(),
    },
    ProductsMutation: {
        addProduct: async (obj, { value }, { helpers }) =>
            await helpers.sections.products.addProduct(value),
        updateProduct: async (obj, { value }, { helpers }) =>
            await helpers.sections.products.updateProduct(value),
        deleteProduct: async (obj, { id }, { helpers }) =>
            await helpers.sections.products.deleteProduct(id),
    },
};
