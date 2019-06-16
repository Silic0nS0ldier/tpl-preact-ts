interface HtmlProps
{
    title: string;

    scriptPath: string;
}

export function html(props: HtmlProps)
{
    return `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>${props.title}</title>
    </head>
    <body>
        <script src="${props.scriptPath}"></script>
    </body>
</html>
`;
}
