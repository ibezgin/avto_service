import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { DictionaryBrandModal } from "../modal";

export const DictionaryBrandHeader = React.memo(() => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
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
            <DictionaryBrandModal visible={visible} setVisible={setVisible} />
        </>
    );
});
