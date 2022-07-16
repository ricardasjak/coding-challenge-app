import { DateUtil } from './date.util';

describe('DateUtil', () => {
    it('should format ISO date', () => {
        expect(DateUtil.formatDate('2022-08-01T11:12:13')).toEqual(
            '01.08.2022',
        );
        expect(DateUtil.formatDate('2022-12-31')).toEqual('31.12.2022');
    });
});
