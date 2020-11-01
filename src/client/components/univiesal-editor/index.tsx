import { editorOptions } from "./editor-options";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { Spin } from "antd";
import { useEffect } from "react";

interface IProps {
    initialContent?: string;
    getContent: (value: string) => void;
}

export const UniversalEditor = React.memo((props: IProps) => {
    const [, setContent] = useState<string>(props.initialContent || "");
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
    }, []);
    return (
        <Spin spinning={loading}>
            <Editor
                value={props.initialContent || ""}
                onInit={() => {
                    setLoading(false);
                }}
                init={{
                    ...editorOptions,
                    init_instance_callback: (editor: any) => {
                        editor.on("Change", (event: any) => {
                            // eslint-disable-next-line no-console
                            console.log(event);
                            setContent(event);
                        });
                    },
                }}
                onSaveContent={() => {
                    // eslint-disable-next-line no-console
                    console.log("SaveContent");
                }}
                id={"test-tiny-mce"}
                onEditorChange={value => {
                    props.getContent(value);
                }}
            />
        </Spin>
    );
});
