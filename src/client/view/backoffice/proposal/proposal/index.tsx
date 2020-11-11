import { Checkbox, Collapse, List, Skeleton, Tag, Typography } from "antd";
import React from "react";
import {
    CardCell,
    CardInner,
    CardRow,
    CardTitle,
    CardWrapper,
} from "../../../../components/ui/card/styled";
import { SC } from "./styled";

export const ProposalProposal = React.memo(() => {
    return (
        <CardWrapper>
            <CardInner>
                <CardRow>
                    <CardCell>
                        <CardTitle>Информация о клиенте</CardTitle>
                    </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Имя</CardCell>
                    <CardCell>Евдоким</CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Фамилия</CardCell>
                    <CardCell>Егоров</CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Номер телефона</CardCell>
                    <CardCell>+7 (999)-755-04-57</CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>
                        <CardTitle>Информация о авто</CardTitle>
                    </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Марка</CardCell>
                    <CardCell>BMW</CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Модель</CardCell>
                    <CardCell>5 series</CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Модель</CardCell>
                    <CardCell>5 series</CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Гос номер</CardCell>
                    <CardCell>Ы_231_AS_23RUS </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>Цвет</CardCell>
                    <CardCell>красный</CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>
                        <CardTitle>Статус заявки</CardTitle>
                    </CardCell>
                    <CardCell>
                        <Tag color="blue">Принята</Tag>
                    </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>
                        <CardTitle>Причина обращения</CardTitle>
                    </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>
                        Не горит фара, сломан бампер, переборка движка
                    </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>
                        <CardTitle>Результат технического осмотра</CardTitle>
                    </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>
                        Перегорел контакт фары, шуруп н241 газнил, требуется
                        замена
                    </CardCell>
                </CardRow>
                <CardRow>
                    <CardCell>
                        <CardTitle>Рекомендованные работы</CardTitle>
                    </CardCell>
                </CardRow>
                <List
                    size="large"
                    dataSource={["замена бампера [2000]", "замена фары [500]"]}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
                <CardRow>
                    <CardCell>
                        <CardTitle>Выполненные работы</CardTitle>
                    </CardCell>
                </CardRow>
                <List
                    size="large"
                    dataSource={["замена бампера [2000]", "замена фары [500]"]}
                    renderItem={item => (
                        <List.Item>
                            <Checkbox checked={true} disabled={false}>
                                {item}
                            </Checkbox>
                        </List.Item>
                    )}
                />
                <CardRow>
                    <CardCell>
                        <CardTitle>Итого: 2500 руб.</CardTitle>
                    </CardCell>
                </CardRow>
            </CardInner>
        </CardWrapper>
    );
});
