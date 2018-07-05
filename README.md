# Top Points



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
  createdb tops_test
  createdb tops_main
  sudo -u postgres psql -d Toychan_test -c "alter user "$USER" with password 'password';"
  sudo -u postgres psql -d Toychan_main -c "alter user "$USER" with password 'password';"
  ```

- Bower (<http://bower.io/>) -- Bower helps to install required JavaScript dependencies.

  `npm install -g bower`

- Grunt.js (<http://gruntjs.com/>) -- Grunt is used to compile the frontend code and serves other functions.

  `npm install -g grunt-cli`


## Installation Steps

Clone the Toychan repository using Git and initialize the modules.

```
git clone https://github.com/TopPoints/tops.git
cd tops
npm install
```



## Managing Tops

To test that Toychan is built and configured correctly, run the following command:

`node app.js`

In a browser navigate to: <http://localhost:5888(for the mainnet) or <http://localhost:5777 (for the testnet). If Toychan is running on a remote system, switch `localhost` for the external IP Address of the machine.

Once the process is verified as running correctly, `CTRL+C` and start the process with `pm2`. This will fork the process into the background and automatically recover the process if it fails.

`pm2 start --name tops app.js`

After the process is started, its runtime status and log location can be retrieved by issuing the following command:

`pm2 show tops`

To stop Toychan after it has been started with `pm2`, issue the following command:

`pm2 stop tops`

**NOTE:** The **port**, **address** and **config-path** can be overridden by providing the relevant command switch:

```
pm2 start --name tops app.js -- -p [port] -a [address] -c [config-path]
```

## 








