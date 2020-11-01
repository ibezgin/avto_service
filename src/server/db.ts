import { IUserDTO } from "../shared/IUserDTO";

export const users: IUserDTO[] = [
    {
        imageUrl: "/statics/gil.jpg",
        userId: "1",
        firstName: "Gil",
        lastName: "Amran",
    },
    {
        imageUrl: "/statics/noa.jpg",
        userId: "2",
        firstName: "Noa",
        lastName: "Tevel",
    },
    {
        imageUrl: "/statics/john.jpg",
        userId: "3",
        firstName: "John",
        lastName: "Doe",
    },
];

export function getUserById(userId: any): IUserDTO | undefined {
    return users.find((u: any) => u?.userId === userId);
}
