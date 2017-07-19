'use babel';

import { CompositeDisposable } from 'atom';
import fs from 'fs-plus';
import glob from 'glob';
import gitignore from 'parse-gitignore';
import ConfigSchema from './configuration';

export default {
  config: ConfigSchema.config,
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-all:open': evt => this.open(evt)
    }));

    atom.config.observe('open-all.searchSubdirectories', value => {
      this.searchSubdirectories = value;
    });

    atom.config.observe('open-all.skipVcsIgnoredFiles', value => {
      this.skipVcsIgnoredFiles = value;
    });

    atom.config.observe('open-all.includeDotfiles', value => {
      this.includeDotfiles = value;
    });
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
    const pattern = this.searchSubdirectories ? '**' : '*';

    return `${dirPath}/${pattern}`;
  },

  findVcsIgnoredPaths() {
    if (!this.skipVcsIgnoredFiles) {
      return [];
    }

    const projectRoot = atom.project.getPaths()[0];
    const pathPatterns = gitignore(`${projectRoot}/.gitignore`)
                           .map(path => `**/${path}`);

    return pathPatterns;
  },

  open(evt) {
    const dirPath = this.findDirPath(evt);
    const globPath = this.globulize(dirPath);
    const ignoredPaths = this.findVcsIgnoredPaths();
    const includeDotfiles = this.includeDotfiles;

    glob(globPath, { ignore: ignoredPaths, dot: includeDotfiles }, (err, files) => {
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
