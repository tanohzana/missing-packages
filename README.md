# Missing-packages :cloud: :arrow_right: :sunny:
[![npm version](https://badge.fury.io/js/missing-packages.svg)](https://badge.fury.io/js/missing-packages)

## What is Missing-packages
Missing-packages (mp) is a tool you will love to use whenever you create a NodeJS package. It is used to check that all packages used in a file or directory are well installed in the 'node_modules' directory. :relieved:

## Installation

1. Open your computer's terminal
2. Install [NodeJS](http://nodejs.org) if you haven't already
3. Install the package globally using: `npm i -g missing-packages`

## API

#### Check missing packages in a file or directory

Go to your project's directory and type:

`mp c [path]`

or

`mp check [path]`

#### Install missing packages in a file or directory

Go to your project's directory and type:

`mp i [path]`

or

`mp install [path]`

#### Using recursivity

If you are trying to install all packages present in a directory and the directories inside it, you might want to use recursivity like that:

`mp install recursive example2.js`

or

`mp c r example2.js`

## Examples

You can go to the examples/ directory and type:

`mp install example2.js`

or

`mp c example3`

_This is not perfect but it is getting better by the day_

_Do not hesitate to pull request me_

:relaxed: 