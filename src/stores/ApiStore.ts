import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

class ApiStore {
  apiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API specification',
    },
    paths: {},
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateApiSpec(newSpec) {
    this.apiSpec = newSpec;
  }
}

const ApiStoreContext = createContext(new ApiStore());

export const useApiStore = () => useContext(ApiStoreContext);