/**
 * Main entrypoint for server.
 * Intended to serve as foundation for SSR.
 */

import { html } from "./template.html";
import { writeFileSync } from "fs";
import { minify } from "html-minifier";

/**
 * Generates `index.html`.
 * @param dest Destination for file.
 */
export function writeIndex(dest: string)
{
    let index = html({
        title: "New Project",
        scriptPath: "./bundle.js",
    });

    index = minify(
        index,
        {
            html5: true,
            collapseWhitespace: true,
            useShortDoctype: true,
        }
    );

    writeFileSync(dest, index);
}


