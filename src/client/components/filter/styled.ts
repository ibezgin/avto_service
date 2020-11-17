import styled from "styled-components";

const Wrapper = styled.div`
    background: #e5e6e7;
    .ant-form {
        float: left;
        width: calc(100% - 210px);
        position: relative;
        z-index: 1;
        padding: 12px;
        min-height: 72px;
    }
    .ant-table-pagination.ant-pagination {
        width: 210px;
        margin: 0;
        text-align: end;
        margin-top: 24px;
        padding-right: 20px;
    }
    .form-item-switch {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .ant-form-item-label {
            > label {
                cursor: pointer;
            }
            margin-left: 14px;
        }
    }
    .ant-form-inline .ant-form-item {
        margin: 8px;
    }
    .ant-select.ant-select,
    .ant-input {
        width: 140px;
    }
    .ant-table {
        .ant-picker {
            padding: 0;
        }
    }
`;

const Details = styled.div`
    cursor: pointer;
`;

export const SC = { Wrapper, Details };
