import getFormattedTime from '../getFormattedTime';

describe('getFormattedTime', () => {
  it('should return formatted time from timestamp', () => {
    const date = new Date(2020, 11, 10,12,33);
    const result = getFormattedTime(date.getTime());
    expect(result).toBe('10.12.2020 12:33');
  });

  it('should always return hours and minutes with 2 positions', () => {
    const date = new Date(2020, 11, 10,2,3);
    const result = getFormattedTime(date.getTime());
    expect(result).toBe('10.12.2020 02:03');
  });
});