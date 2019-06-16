/**
 * Executes supplied functions sequentially when rollup has finished generating bundle.
 * @param {(() => {}|Promise<void>)[]} funcs
 * @returns {import("rollup").Plugin}
 */
export default function (...funcs) {
    funcs.forEach((func, i) => {
        if (typeof func !== "function") {
            throw new Error(`Parameter ${i} should be a function not ${typeof func}`);
        }
    });

    return {
        name: "done",
        async generateBundle() {
            for (const func of funcs) {
                await Promise.resolve(func());
            }
        }
    };
}
