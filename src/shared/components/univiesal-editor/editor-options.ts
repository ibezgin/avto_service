import { gameTemplate } from "./template";
export const editorOptions = {
    plugins:
        "print preview code fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help",
    toolbar1:
        "styleselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
    min_height: 700,
    font_formats:
        "Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n",
    // block_formats: "Navigation=div",
    // block_formats:
    // eslint-disable-next-line max-len
    //     "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Пункт правил=h5;Heading 6=h6;Preformatted=pre",
    style_formats: [
        {
            title: "Headers",
            items: [
                {
                    title: "Пункт правил",
                    format: "h5",
                },
                { title: "Header 1", format: "h1" },
                { title: "Header 2", format: "h2" },
                { title: "Header 3", format: "h3" },
                { title: "Header 4", format: "h4" },
                // { title: "Header 6", format: "h6" },
            ],
        },
        {
            title: "Blocks",
            items: [
                { title: "Paragraph", format: "p" },
                {
                    title: "Blockquote",
                    format: "blockquote",
                },
                { title: "Div", format: "div" },
                { title: "Pre", format: "pre" },
            ],
        },
        {
            title: "Навигиция",
            items: [
                {
                    title: "Элемент навигации. Обёртка игры",
                    block: "div",
                    wrapper: true,
                    classes: "navigation",
                },
                {
                    title: "Элемент навигации. Название игры",
                    inline: "span",
                    classes: "navigation-to",
                },
                {
                    title: "Элемент навигации. Раздел правил",
                    inline: "span",
                    classes: "navigation-to-sub-item",
                },
            ],
        },
    ],
    table_class_list: [
        { title: "None", value: "" },
        { title: "Small", value: "small" },
        { title: "Middle", value: "middle" },
        { title: "Large", value: "large" },
    ],
    table_cell_class_list: [
        { title: "None", value: "" },
        { title: "Active", value: "active" },
    ],
    table_row_class_list: [
        { title: "None", value: "" },
        { title: "Active", value: "active" },
    ],
    content_style: [
        `
        td.active, tr.active {
            background:yellow;
        }
        table.large {
            width: 100%;
        }
        table.middle {
            width: 60%;
        }
        table.small {
            width: 30%;
        }
        .navigation {
            background: #e3e3f7;
            margin-bottom: 8px;
        }
        .navigation-to:after{
            content: " (1 уровень)";
            color: #73736c;
            font-size: 50%;
            vertical-align: top;
        }
        .navigation-to-sub-item:after{
            content: " (2 уровень)";
            color: #73736c;
            font-size: 50%;
            vertical-align: top;
        }
        `,
    ],
    templates: [
        {
            title: "Some title 1",
            description: "Some desc 1",
            content: gameTemplate,
        },
    ],
};
