import { Injectable } from '@angular/core';
import * as orderBy from 'lodash.orderby';

@Injectable()
export class ProductsService {

  api = 'https://private-anon-fcae313ebb-weeblyfrontendtrialapi.apiary-mock.com';

  search(dataset: any[], query: any) {
    return this.applyQuery(dataset, query);
  }

  getAll() {
    return fetch(`${this.api}/products`)
      .then(res => res.json())
      .then(dataset => this.randomizeAndExtend(dataset));
  }

  delete(product, dataset, query) {
    return fetch(`${this.api}/product/${product.id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        const originalProductIndex = dataset.findIndex((item) => item.order === product.order && item.id === product.id);
        return this.applyQuery([
          ...dataset.slice(0, originalProductIndex),
          ...dataset.slice(originalProductIndex + 1)
        ], query);
      });
  }

  update(product, dataset, query) {
    return fetch(`${this.api}/product/${product.id}`, {
      body: JSON.stringify(product),
      headers: {
        'content-type': 'application/json',
      },
      method: 'PUT',
    }).then(res => res.json())
      .then(() => {
        const originalProductIndex = dataset.findIndex((item) => item.id === product.id);
        const updatedDataset = [...dataset];
        updatedDataset[originalProductIndex] = product;
        return this.applyQuery(updatedDataset, query);
      });
  }

  create(product, dataset, query) {
    return fetch(`${this.api}/products`, {
      body: JSON.stringify(product),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    }).then(res => res.json())
      .then((newProduct) => this.applyQuery(dataset.concat({
        ...newProduct,
        ...product,
      }), query));
  }

  private applyQuery(dataset, searchQuery) {
    let arr = dataset;
    if (searchQuery.search) {
      arr = arr.filter((item) => item.name.toLowerCase().includes(searchQuery.search.toLowerCase()) || parseInt(item.price, 10) === parseInt(searchQuery.search, 10));
    }

    const offset = (searchQuery.page - 1) * searchQuery.limit;
    return {
      metadata: {
        dataset,
        total: arr.length,
      },
      products: orderBy(arr, [searchQuery.sort], [searchQuery.descend ? 'desc' : 'asc']).slice(offset, offset + searchQuery.limit),
    };
  }

  // the dataset coming from api is too small to test pagination, this should make of a random length
  private randomizeAndExtend(arr) {
    let random = arr.map(this.editItem(0));
    const randomFactor = Math.floor(Math.random() * 10);
    for (let i = 0; i < randomFactor; i++) {
      random = random.concat(arr.map(this.editItem(random.length)));
    }
    return random;
  }

  private editItem(base) {
    return (item, index) => ({
      ...item,
      price: item.price * Math.ceil(Math.random() * 100),
      inventory: item.inventory * Math.ceil(Math.random() * 10),
      order: index + base,
    });
  }
}
