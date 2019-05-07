import { remote } from 'electron';

const https = remote.require('https');

export const getNpmPackageLatestVersion = name =>
  new Promise((resolve) => {
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
            resolve({ success: true, version: `^${latestVersion}` });
          } catch (error) {
            resolve({ success: false, version: '', error });
          }
        });
      })
      .on('error', error => resolve({ success: false, version: '', error }));
  });

export default getNpmPackageLatestVersion;
