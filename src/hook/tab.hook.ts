import { SyntheticEvent, useCallback, useState } from 'react';

export class TabHook {
  useProps() {
    const [value, setValue] = useState<number>(0);

    const onChange = useCallback(
      (_: SyntheticEvent<Element, Event>, value: string | number) => {
        value = Number(value);

        if (Number.isNaN(value)) {
          return;
        }

        setValue(value);
      },
      [setValue],
    );

    return { value, onChange };
  }
}

export const tabHook = new TabHook();
