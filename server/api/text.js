export default defineEventHandler(async (event) => {
    const { text } = await readBody(event);
    return {
        message: `Text: ${text}`,
    };
});
