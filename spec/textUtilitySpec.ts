namespace powerbi.extensibility.tests {
    function createTextProperties() {
        return { text: '', fontFamily: 'sans-serif', fontSize: '20px' };
    }
    describe('measureTextWidth', () => {
        it('empty', () => {
            let props = createTextProperties();
            props.text = '';

            expect(TextUtility.measureTextWidth(props)).toBe(0);
        });

        it('compare measurements', () => {
            let props = createTextProperties();
            props.text = 'hello';
            let m1 = TextUtility.measureTextWidth(props);
            props.text = 'hellohello';
            let m2 = TextUtility.measureTextWidth(props);
            
            expect(m1).toBeGreaterThan(0);
            expect(m2).toBe(m1 * 2);
        });
    });

    describe('getTailoredTextOrDefault', () => {
        it('short word', () => {
            let props = createTextProperties();
            props.text = "short";
            let text = TextUtility.getTailoredTextOrDefault(props, 200);

            expect(text).toEqual('short');
        });

        it('long word', () => {
            let props = createTextProperties();
            props.text = "areallyreallylongwordforthelength";
            let text = TextUtility.getTailoredTextOrDefault(props, 200);
            let lastThree = text.slice(-1); // last character
            expect(lastThree).toEqual('…');
        });
    });
}