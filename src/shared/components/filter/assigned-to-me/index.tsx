import * as FormikAntd from "formik-antd";

export const FilterAssignedToMe = React.memo(() => {
    return (
        <FormikAntd.Checkbox name="assignedToMe">
            Назначенные на меня
        </FormikAntd.Checkbox>
    );
});
