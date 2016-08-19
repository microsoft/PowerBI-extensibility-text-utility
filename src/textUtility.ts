module powerbi.extensibility {
    export interface TextProperties {
        text?: string;
        fontFamily: string;
        fontSize: string;
        fontWeight?: string;
        fontStyle?: string;
        fontVariant?: string;
        whiteSpace?: string;
    }

    export module TextUtility {
        let canvasCtx;
        let ellipsis = '…';
        function ensureCanvas() {
            if (canvasCtx)
                return;
            let canvas = document.createElement('canvas');
            canvasCtx = canvas.getContext("2d");
        }
        /**
         * Measures text width at a high speed using a canvas element
         * @param textProperties The text properties (including text content) to use for text measurement.
         */
        export function measureTextWidth(textProperties: TextProperties) {
            ensureCanvas();
            canvasCtx.font =
                (textProperties.fontStyle || "") + " " +
                (textProperties.fontVariant || "") + " " +
                (textProperties.fontWeight || "") + " " +
                textProperties.fontSize + " " +
                (textProperties.fontFamily);
            return canvasCtx.measureText(textProperties.text).width;
        }
        TextUtility.measureTextWidth = measureTextWidth;
        /**
         * Compares labels text size to the available size and renders ellipses when the available size is smaller.
         * @param textProperties The text properties (including text content) to use for text measurement.
         * @param maxWidth The maximum width available for rendering the text.
         */
        export function getTailoredTextOrDefault(textProperties: TextProperties, maxWidth: number) {
            ensureCanvas();
            let strLength = textProperties.text.length;
            if (strLength === 0)
                return textProperties.text;
            let width = measureTextWidth(textProperties);
            if (width < maxWidth)
                return textProperties.text;
            // Create a copy of the textProperties so we don't modify the one that's passed in.
            let copiedTextProperties: TextProperties = Object.create(textProperties);
            // Take the properties and apply them to svgTextElement
            // Then, do the binary search to figure out the substring we want
            // Set the substring on textElement argument
            let text = copiedTextProperties.text = ellipsis + copiedTextProperties.text;
            let min = 1;
            let max = text.length;
            let i = ellipsis.length;
            while (min <= max) {
                // num | 0 prefered to Math.floor(num) for performance benefits
                i = (min + max) / 2 | 0;
                copiedTextProperties.text = text.substr(0, i);
                width = measureTextWidth(copiedTextProperties);
                if (maxWidth > width)
                    min = i + 1;
                else if (maxWidth < width)
                    max = i - 1;
                else
                    break;
            }
            // Since the search algorithm almost never finds an exact match,
            // it will pick one of the closest two, which could result in a
            // value bigger with than 'maxWidth' thus we need to go back by 
            // one to guarantee a smaller width than 'maxWidth'.
            copiedTextProperties.text = text.substr(0, i);
            width = measureTextWidth(copiedTextProperties);
            if (width > maxWidth)
                i--;
            return text.substr(ellipsis.length, i - ellipsis.length) + ellipsis;
        }
    }
}