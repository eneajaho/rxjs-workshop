import { HttpParams } from '@angular/common/http';

export function createParamsFromObject(filters: object): HttpParams {
  let params = new HttpParams();

  for (const [key, value] of Object.entries(filters).sort()) {
    if (value !== undefined && value !== ''  && value !== null) {
      // https://www.npmjs.com/package/json-server#operators
      if (key === 'id' || key === 'active') {
        params = params.append(key, value + '');
      } else {
        params = params.append(key + '_like', value + '');
      }
    }
  }

  return params;
}
