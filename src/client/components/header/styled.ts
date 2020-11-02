import styled from "styled-components";

const Header = styled.div`
    display: flex;
    width: 100%;
    padding: 24px 44px 32px;
    align-items: center;
    & > :nth-child(2) {
        width: 295px;
        margin-right: 40px;
        margin-left: 46px;
        flex: none;
        .anticon {
            vertical-align: middle;
        }
        .main-icon-bg {
            fill: #e5e6e7;
        }
        .main-icon-line {
            fill: #0c0f20;
        }
        .ant-typography {
            display: inline-block;
            vertical-align: middle;
            margin-top: 0;
            margin-bottom: 0;
            margin-left: 14px;
            width: 238px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .ant-typography-secondary {
            display: block;
            font-size: 11px;
            margin-left: 0;
        }
    }
    & > :nth-child(3) {
        flex: 1;
    }
    & > :nth-child(4) {
        flex: none;
        margin-left: 40px;
    }
`;

const UserInfo = styled.div`
    cursor: pointer;
    .ant-typography {
        padding-left: 14px;
    }
    .anticon {
        vertical-align: middle;
        cursor: pointer;
    }
`;

const UserInfoTitle = styled.div`
    font-size: 11px;
    color: #617279;
`;
const UserInfoValue = styled.div`
    font-size: 14px;
    color: #0c0f20;
    display: flex;
    justify-content: space-between;
`;
const UserInfoLogout = styled.div`
    color: #f24579;
`;

export const SC = {
    Header,
    UserInfo,
    UserInfoValue,
    UserInfoLogout,
    UserInfoTitle,
};
