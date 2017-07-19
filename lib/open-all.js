'use babel';

import { CompositeDisposable } from 'atom';
import fs from 'fs-plus';
import glob from 'glob';

export default {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-all:open': evt => this.open(evt)
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  findElement(evt) {
    let el = evt.target;

    // If target does not have a data-path, find its child node that does
    if (!el.dataset.path) {
      el = el.querySelector('[data-path]');
    }

    return el;
  },

  findDirPath(evt) {
    const el = this.findElement(evt);
    let elPath = el.dataset.path;

    // If target is a file, find its parent directory
    if (fs.lstatSync(elPath).isFile()) {
      elPath = path.dirname(elPath);
    }

    return elPath;
  },

  globulize(dirPath) {
    return `${dirPath}/**/*.*`;
  },

  open(evt) {
    const dirPath = this.findDirPath(evt);
    const globPath = this.globulize(dirPath);

    glob(globPath, (err, files) => {
      if (err) {
        atom.notifications.addError(err.toString(), {
          detail: err.stack || '',
          dismissable: true
        });
        console.error(err);
      }

      files.forEach(file => atom.workspace.open(file));
    });
  }
};
