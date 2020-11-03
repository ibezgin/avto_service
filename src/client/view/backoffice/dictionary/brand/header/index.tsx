import { Button, Col, Row } from "antd";
import React from "react";
import { DictionaryBrandModal } from "../modal";

export const DictionaryBrandHeader = React.memo(() => {
    return (
        <>
            <DictionaryBrandModal>
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
            </DictionaryBrandModal>
        </>
    );
});
