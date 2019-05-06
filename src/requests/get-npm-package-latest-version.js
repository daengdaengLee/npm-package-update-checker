import { remote } from 'electron';

const https = remote.require('https');

export const getNpmPackageLatestVersion = name =>
  new Promise((resolve, reject) => {
    let body = '';

    https
      .get(`https://registry.npmjs.org/${name}`, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            const latestVersion = json['dist-tags'].latest;
            resolve(latestVersion);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', () => reject('Faile to read package version'));
  });

export default getNpmPackageLatestVersion;
