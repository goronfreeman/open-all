'use babel';

import { CompositeDisposable } from 'atom';
import fs from 'fs-plus';
import glob from 'glob';

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-all:open': (evt) => this.open(evt)
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  globulize(dirPath) {
    return `${dirPath}/**/*.*`;
  },

  findDirPath(evt) {
    const el = evt.target;
    let elPath = el.dataset.path;

    // If target is a file, find its parent directory
    if (fs.lstatSync(elPath).isFile()) {
      elPath = path.dirname(elPath);
    }

    return this.globulize(elPath);
  },

  open(evt) {
    const globPath = this.findDirPath(evt);

    glob(globPath, (err, files) => {
      if (err) {
        atom.notifications.addError(err.toString(), { detail: err.stack || '', dismissable: true });
        console.error(err);
      }

      files.forEach(file => atom.workspace.open(file));
    });
  }
};
