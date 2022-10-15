import { useTestId, generateUniqueID, isServer } from '..';

describe('utilities', () => {
  describe('utilities/useTestId', () => {
    const env = process.env;
    const testid = `random-${Math.floor(Math.random() * 999)}`;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...env };
    });
    afterEach(() => {
      process.env = env;
    });

    it('Match return values in Testing', () => {
      expect(useTestId(testid)).toMatchObject({ 'data-testid': testid });
    });
    it('Match return values in Development', () => {
      process.env.NODE_ENV = 'development';
      expect(useTestId(testid)).toMatchObject({});
    });
  });

  describe('utilities/generateUniqueID', () => {
    it('Test UniqueID generation with Prefix', () => {
      expect(generateUniqueID('test')).toMatch(/^test-[a-z0-9]+/);
    });
    it('Test UniqueID generation (no Prefix)', () => {
      expect(generateUniqueID()).toMatch(/^[a-z0-9]+/);
    });
  });

  describe('utilities/isServer', () => {
    const { window, document } = global;
    describe('Test when not Server', () => {
      it('Expects to be False', () => {
        expect(isServer()).toBeFalsy();
      });
    });
    describe('Test when Server', () => {
      beforeEach(() => {
        delete (global as any).window;
        delete (global as any).document;
      });
      afterEach(() => {
        global.window = window;
        global.document = document;
      });
      it('Expects to be True', () => {
        const server = isServer(global.window, global.document);
        expect(server).toBeTruthy();
      });
    });
  });
});
