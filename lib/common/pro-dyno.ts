export class ProDyno {
  constructor(protected dyno) {}

  putItem(put) {
    return new Promise((resolve, reject) => {
      this.dyno.putItem(put, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  getItem(put) {
    return new Promise((resolve, reject) => {
      this.dyno.getItem(put, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  scan(put) {
    return new Promise((resolve, reject) => {
      this.dyno.scan(put, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
