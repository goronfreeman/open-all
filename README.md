# open-all [![apm](https://img.shields.io/apm/v/open-all.svg?maxAge=86400?style=flat-square)](https://atom.io/packages/open-all) [![apm](https://img.shields.io/apm/dm/open-all.svg?maxAge=86400?style=flat-square)](https://atom.io/packages/open-all)

Open all files in a directory from the tree view.

![open-all](http://i.imgur.com/wKBauUl.png)

## Installation

`apm install open-all` or use the Install Packages pane from [Atom settings](atom://config).

## Configuration Options

### Include Dotfiles

Open files beginning with a `.`.

Defaults to `false`.

### Search Within Subdirectories

Open all files within all subdirectories of the selected directory.

Defaults to `false`.

> Note: Setting this to `true` will cause Atom to consume a lot of CPU when attempting to open a directory containing many files. Use with caution.

### Skip VCS Ignored Files

Don't open files ignored by the current project's VCS. For example, projects using Git have these paths defined in their `.gitignore` file.

Defaults to `true`.

## Running the tests

Run `apm test`

## Contributing

If you're going to submit a pull request, please try to follow
[the official contribution guidelines of Atom](https://atom.io/docs/latest/contributing).

1. [Fork it](https://github.com/goronfreeman/open-all/).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Ensure tests are passing. See [running-the-tests](https://github.com/goronfreeman/open-all#running-the-tests).
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create new Pull Request.

[See all contributors](https://github.com/goronfreeman/open-all/graphs/contributors).

## TODO

* Better handle opening of tons of files
