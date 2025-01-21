import { StorageProvider } from "@/providers/storage-provider";

export class StorageService {
  constructor() {
    this.provider = new StorageProvider();
  }

  set(key, payload) {
    this.provider.set(key, payload);
  }

  get(key) {
    return this.provider.get(key);
  }

  destroy() {
    this.provider.clearAll();
  }
}

StorageService.prototype.install = function install(app) {
  const provideName = "storage-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default new StorageService();
