import React from 'react';
import {mountWithApp, mount} from 'test-utilities';

import {IndexProvider, useIndexRow} from '../IndexProvider';

describe('useIndexRow', () => {
  const defaultIndexProviderProps = {
    itemCount: 0,
    selectedItemsCount: 0,
  };

  it('returns selectMode', () => {
    const spy = jest.fn();

    function MockComponent() {
      const value = useIndexRow();
      spy(value);
      return null;
    }

    mountWithApp(
      <IndexProvider {...defaultIndexProviderProps}>
        <MockComponent />
      </IndexProvider>,
    );

    expect(spy).toHaveBeenCalledWith({selectMode: false});
  });

  it('throws when IndexProvider is not being used', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    function callback() {
      function MockComponent() {
        useIndexRow();
        return null;
      }

      mount(<MockComponent />);
    }

    expect(callback).toThrow(`Missing IndexProvider context`);

    consoleErrorSpy.mockRestore();
  });
});