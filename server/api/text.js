import translate from 'translate';
import createPdf from '../utils/createPdf';
import { Readable } from 'stream';

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
        return;
    }

    let pdfData;
    try {
        pdfData = await createPdf([originalText, englishText, germanText, spanishText]);
    } catch (error) {
        console.error('PDF creation error.', error);
        event.node.res.sendStatus(500);
        return;
    }
    event.node.res.setHeader('Content-Type', 'application/pdf');
    event.node.res.setHeader('Content-Length', pdfData.length);
    event.node.res.setHeader(
        'Content-Disposition',
        'attachment; filename=translation.pdf'
    );

    const blob = new Blob([pdfData], { type: 'application/pdf' });

    return Readable.from(blob.stream()); // response as Stream
});
