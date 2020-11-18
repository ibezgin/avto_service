import { Button, Col, Row } from "antd";
import _ from "lodash";
import React from "react";
import { ModalForm } from "../../../../../components/modal-form";
import { usePermission } from "../../../../../hooks/use-permission";
import { AccessEnum } from "../../../../../service/enums/access";
import { useUsersHelper } from "../helper";

export const DictionaryUsersHeader = React.memo(() => {
    const { sendAddUser, loadingMutation, formFields } = useUsersHelper();

    const { hasPermission } = usePermission();

    hasPermission(AccessEnum.DICTIONARY);
    hasPermission(AccessEnum.PROPOSAL);
    hasPermission(AccessEnum.PROPOSAL_CARS);
    return (
        <>
            <ModalForm
                onSubmit={(values, { resetForm }) => {
                    sendAddUser(
                        _.pick(
                            values,
                            "firstname",
                            "username",
                            "password",
                            "position",
                            "lastname",
                            "permission",
                        ),
                    );
                    values.setVisible();
                    resetForm();
                }}
                formFields={formFields}
                loading={loadingMutation}
            >
                {setVisible => (
                    <Row gutter={[16, 0]} justify="end">
                        <Col>
                            <Button
                                type="primary"
                                size="large"
                                style={{ width: "120px" }}
                                onClick={() => {
                                    setVisible(true);
                                }}
                            >
                                Добавить
                            </Button>
                        </Col>
                    </Row>
                )}
            </ModalForm>
        </>
    );
});
