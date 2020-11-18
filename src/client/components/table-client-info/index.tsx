import { SC } from "./styled";
import React from "react";

interface IProps {
    nameAndLastName: string;
    phoneNumber: string;
}

export const TableClientInfo = React.memo((props: IProps) => {
    const { nameAndLastName, phoneNumber } = props;
    return (
        <>
            <SC.Name>{nameAndLastName}</SC.Name>
            <SC.Phone>
                <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>,
            </SC.Phone>
        </>
    );
});
