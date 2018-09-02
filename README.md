# **kary** [![Build Status](https://travis-ci.org/OUISRC/kary.svg?branch=master)](https://travis-ci.org/OUISRC/kary)

Online community in Rust for Web

> [**Ruster**](http://ruster.xyz/)：A CN online community base on **kary**

**kary** is single page webapp(SPA) written in [actix-web](https://github.com/actix/actix-web) with vuejs.

* Async stable Actix-web framework
* diesel, postgresql r2d2
* SPA CORS JWT
* Vuejs

## How To

    first create a name 'kary' postgresql database for this project.

## development/开发

```bash
$ git clone https://github.com/OUISRC/kary.git
$ cd kary
$ cargo install diesel_cli --no-default-features --features postgres
$ diesel setup
$ cargo run

// another shell nodejs(v10.1.0 on my machine)

$ cd kary/webapp
$ npm install
$ npm run serve
```

then open browser 'http://localhost:8080'

## production/生产

```bash
$ git clone https://github.com/OUISRC/kary.git
$ cd kary
$ cargo install diesel_cli --no-default-features --features postgres
$ diesel setup
$ cd webapp
$ npm install
$ npm run build
$ cd ..
$ rm -R webapp
$ cargo run --release
```

then open broswer 'http://localhost:8000/'

## License

The license at [here](https://github.com/ruster-xyz/ruster/blob/master/LICENSE)

Copyright (c) 2018-present, Xiangfei Wang
