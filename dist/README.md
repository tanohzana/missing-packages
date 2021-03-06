# Missing-packages :cloud: :arrow_right: :sunny:
[![npm version](https://badge.fury.io/js/missing-packages.svg)](https://badge.fury.io/js/missing-packages)
[![npm downloads](https://img.shields.io/npm/dt/missing-packages.svg?style=flat)](https://img.shields.io/npm/dt/missing-packages.svg?style=flat)
[![Build Status](https://travis-ci.com/tanohzana/missing-packages.svg?branch=master)](https://travis-ci.com/tanohzana/missing-packages)

## What is Missing-packages
Missing-packages (mp) is a tool you will love to use whenever you create a NodeJS package. It is used to check that all packages used in a file or directory are well installed in the 'node_modules' directory. :relieved:

## Installation

1. Open your computer's terminal
2. Install [NodeJS](http://nodejs.org) if you haven't already
3. Install the package globally using: `npm i -g mp` or `npx mp [whatever]`

## API

Default usage:

`mp <path>`

will ask to install missing packages found

#### Check missing packages in a file or directory

Go to your project's directory and type:

`mp c <path>`

or

`mp check <path>`

#### Install missing packages in a file or directory

Go to your project's directory and type:

`mp i <path>`

or

`mp install <path>`

## Examples

You can go to the examples/ directory and type:

`mp install example2.js`

or

`mp c examples`

## Contributing

Go to [Contributing.md](./CONTRIBUTING.md)

:relaxed:
