export class CacheEvent {
  static settingChangeEventName = 'cache-setting-change';

  static dispatchSettingChange(): void {
    window.dispatchEvent(new Event(this.settingChangeEventName));
  }
}
