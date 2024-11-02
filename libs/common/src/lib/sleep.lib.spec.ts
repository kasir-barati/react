import { sleep } from './sleep.lib';

describe('sleep', () => {
  it('should work', () => {
    expect(sleep(1)).resolves.toHaveBeenCalled();
  });
});
