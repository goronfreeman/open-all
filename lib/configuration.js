'use babel';

export default {
  config: {
    searchSubdirectories: {
      type: 'boolean',
      default: false,
      title: 'Search Within Subdirectories',
      description: 'Open all files within all subdirectories of the selected directory.'
    },
    skipVcsIgnoredFiles: {
      type: 'boolean',
      default: true,
      title: 'Skip VCS Ignored Files',
      description: "Don't open files ignored by the current project's VCS. For example, projects using Git have these paths defined in their `.gitignore` file."
    },
    includeDotfiles: {
      type: 'boolean',
      default: false,
      title: 'Include Dotfiles',
      description: 'Open files beginning with a `.`.'
    }
  }
};
