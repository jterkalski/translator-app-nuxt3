import translate from 'translate';

export default defineEventHandler(async (event) => {
    const { originalText } = await readBody(event);
    const originalLanguage = 'pl';
    let englishText, germanText, spanishText;
    try {
        englishText = await translate(originalText, {
            from: originalLanguage,
            to: 'en',
        });
        germanText = await translate(originalText, {
            from: originalLanguage,
            to: 'de',
        });
        spanishText = await translate(originalText, {
            from: originalLanguage,
            to: 'es',
        });
    } catch (error) {
        console.error('Text translation error.', error);
        res.sendStatus(500);
        return;
    }

    return {
        originalText: originalText,
        englishText: englishText,
        germanText: germanText,
        spanishText: spanishText,
    };
});
