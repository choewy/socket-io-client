import { v4 } from 'uuid';

import { ChangeEvent, useCallback, useEffect } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { SettingAuthValue, SettingStoreValue, SocketTransport, settingStore } from '@/store';
import { cacheService } from '@/service';

export class SettingHook {
  useCache() {
    const setSetting = settingStore.useSetState();

    useEffect(() => {
      const cache = cacheService.getValueByLastest();

      if (cache == null) {
        return;
      }

      if (
        typeof cache === 'object' &&
        (cache.setting == null ||
          cache.setting.id == null ||
          cache.setting.url == null ||
          cache.setting.transport == null ||
          cache.setting.nsp == null ||
          cache.setting.authValues == null ||
          cache.setting.eventNames == null)
      ) {
        return cacheService.deleteValues();
      }

      setSetting(cache.setting);
    }, [setSetting]);
  }

  useResetHandler() {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      setSetting({
        ...settingStore.init,
        id: v4(),
      });
    }, [setSetting]);
  }

  useChangeValueHandler(propertyKey: keyof Pick<SettingStoreValue, 'url' | 'nsp'>) {
    const setSetting = settingStore.useSetState();

    return useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setSetting((prev) => ({ ...prev, [propertyKey]: e.target.value }));
      },
      [propertyKey, setSetting],
    );
  }

  useChangeTransportHandler() {
    const setSetting = settingStore.useSetState();

    return useCallback(
      (e: SelectChangeEvent<SocketTransport>) => {
        setSetting((prev) => ({ ...prev, transport: e.target.value as SocketTransport }));
      },
      [setSetting],
    );
  }

  useAddAuthValueHandler() {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      setSetting((prev) => ({
        ...prev,
        authValues: [...prev.authValues, { key: '', value: '' }],
      }));
    }, [setSetting]);
  }

  useRemoveAuthValueHandler(index: number) {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      setSetting((prev) => ({
        ...prev,
        authValues: prev.authValues.filter((_, i) => i !== index),
      }));
    }, [index, setSetting]);
  }

  useAuthValueChangeHandler(index: number, propertyKey: keyof SettingAuthValue) {
    const setSetting = settingStore.useSetState();

    return useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setSetting((prev) => ({
          ...prev,
          authValues: prev.authValues.map((authValue, i) =>
            i === index ? { ...authValue, [propertyKey]: e.target.value } : authValue,
          ),
        }));
      },
      [index, propertyKey, setSetting],
    );
  }

  useAddEventNameHanler() {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      setSetting((prev) => ({ ...prev, eventNames: [...prev.eventNames, ''] }));
    }, [setSetting]);
  }

  useRemoveEventNameHandler(index: number) {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      setSetting((prev) => ({ ...prev, eventNames: prev.eventNames.filter((_, i) => i !== index) }));
    }, [index, setSetting]);
  }

  useEventNameChangeHandler(index: number) {
    const setSetting = settingStore.useSetState();

    return useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setSetting((prev) => ({
          ...prev,
          eventNames: prev.eventNames.map((eventName, i) => (i === index ? e.target.value : eventName)),
        }));
      },
      [index, setSetting],
    );
  }
}

export const settingHook = new SettingHook();
