import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        cars: CarsQuery!
    }
    extend type Mutation {
        cars: CarsMutation!
    }
    type CarsQuery {
        allCars: [CarType!]!
    }
    type CarsMutation {
        addCar(data: CarInput!): Boolean
        deleteCar(id: String!): Boolean
        updateCar(id: String!, data: CarInput!): Boolean
    }

    type CarType {
        id: String!
        brandId: String!
        modelId: String!
        clientId: String!
        gosNumber: String!
        color: String!
    }

    input CarInput {
        brandId: String!
        modelId: String!
        clientId: String!
        gosNumber: String!
        color: String!
    }
`;

export const proposalCarsSubSchema = new SubSchema(types, {
    Query: {
        cars: () => ({}),
    },
    Mutation: {
        cars: () => ({}),
    },
    CarsQuery: {
        allCars: async (obj, props, { helpers }) =>
            await helpers.sections.cars.allCars(),
    },
    CarsMutation: {
        addCar: async (obj, { data }, { helpers }) =>
            await helpers.sections.cars.addCar(data),
        deleteCar: async (obj, { id }, { helpers }) =>
            await helpers.sections.cars.deleteCar(id),
        updateCar: async (obj, { id, data }, { helpers }) =>
            await helpers.sections.cars.updateCar(id, data),
    },
});
