import { Button, Col, Row } from "antd";
import React from "react";
import { DictionaryModelsModal } from "../modal";

export const DictionaryModelsHeader = React.memo(() => {
    return (
        <>
            <DictionaryModelsModal>
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
            </DictionaryModelsModal>
        </>
    );
});
