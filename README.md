# Toychan

Toychan is a next generation crypto-currency and decentralized application platform, written entirely in JavaScript. 

**NOTE:** The following information is applicable to: **Ubuntu 14.04, 16.04 (LTS) or 16.10 - x86_64**.

## Prerequisites - In order

- Tool chain components -- Used for compiling dependencies

  `sudo apt-get install -y python build-essential curl automake autoconf libtool`

- Git (<https://github.com/git/git>) -- Used for cloning and updating Toychan

  `sudo apt-get install -y git`

- Node.js (<https://nodejs.org/>) -- Node.js serves as the underlying engine for code execution.

  System wide via package manager:

  ```
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

  Locally using [nvm](https://github.com/creationix/nvm):

  ```
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
  nvm install v6.10.1
  ```

- Install PostgreSQL (version 9.6.2):

  ```
  curl -sL "https://downloads.Toychan.io/scripts/setup_postgresql.Linux" | bash -
  sudo -u postgres createuser --createdb $USER
  createdb Toychan_test
  createdb Toychan_main
  sudo -u postgres psql -d Toychan_test -c "alter user "$USER" with password 'password';"
  sudo -u postgres psql -d Toychan_main -c "alter user "$USER" with password 'password';"
  ```

- Bower (<http://bower.io/>) -- Bower helps to install required JavaScript dependencies.

  `npm install -g bower`

- Grunt.js (<http://gruntjs.com/>) -- Grunt is used to compile the frontend code and serves other functions.

  `npm install -g grunt-cli`

- PM2 (<https://github.com/Unitech/pm2>) -- PM2 manages the node process for Toychan (Optional)

  `npm install -g pm2`

## Installation Steps

Clone the Toychan repository using Git and initialize the modules.

```
git clone https://gitee.com/toychain/toychain.git
cd Toychan
npm install
```


Load git submodules ([Toychan-ui](https://gitee.com/toychain/toychain-ui.git) and [toy-js](https://gitee.com/toychain/toy-js.git)):

```
git submodule init
git submodule update
```

Build the user-interface:

```
cd public
npm install
bower install
grunt release
```

## Managing Toychan

To test that Toychan is built and configured correctly, run the following command:

`node app.js`

In a browser navigate to: <http://localhost:8000> (for the mainnet) or <http://localhost:7000> (for the testnet). If Toychan is running on a remote system, switch `localhost` for the external IP Address of the machine.

Once the process is verified as running correctly, `CTRL+C` and start the process with `pm2`. This will fork the process into the background and automatically recover the process if it fails.

`pm2 start --name Toychan app.js`

After the process is started, its runtime status and log location can be retrieved by issuing the following command:

`pm2 show Toychan`

To stop Toychan after it has been started with `pm2`, issue the following command:

`pm2 stop Toychan`

**NOTE:** The **port**, **address** and **config-path** can be overridden by providing the relevant command switch:

```
pm2 start --name Toychan app.js -- -p [port] -a [address] -c [config-path]
```

## Tests

Before running any tests, please ensure Toychan is configured to run on the same testnet that is used by the test-suite.

Replace **config.json** and **genesisBlock.json** with the corresponding files under the **test** directory:

```
cp test/config.json test/genesisBlock.json .
```

**NOTE:** If the node was started with a different genesis block previous, trauncate the database before running tests.

```
dropdb Toychan_test
createdb Toychan_test
```

**NOTE:** The master passphrase for this genesis block is as follows:

```
wagon stock borrow episode laundry kitten salute link globe zero feed marble
```

Launch Toychan (runs on port 4000):

```
node app.js
```

Run the test suite:

```
npm test
```

Run individual tests:

```
npm test -- test/lib/accounts.js
npm test -- test/lib/transactions.js
```