import { Button, Col, Row } from "antd";
import React from "react";
import { DictionaryServiceModal } from "../modal";

export const DictionaryServiceHeader = React.memo(() => {
    return (
        <>
            <DictionaryServiceModal>
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
            </DictionaryServiceModal>
        </>
    );
});
