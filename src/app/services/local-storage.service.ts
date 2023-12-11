import {Injectable} from '@angular/core';
import {BaseComponent} from "../base/base.component";


export interface StorageInterface {
  save(key: string, data: any): void;

  load(key: string): any;
}

export class LocalStorageAdapter implements StorageInterface {
  save(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  load(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends BaseComponent {

  private localStorageAdapter = new LocalStorageAdapter();

  constructor() {
    super();
  }

  getAdapter(): LocalStorageAdapter {
    return this.localStorageAdapter;
  }
}
