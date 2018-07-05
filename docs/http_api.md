[TOC]



# TOPS HTTP API文档


## **1 API使用说明**   
### **1.1 请求过程说明**   
1.1 构造请求数据，用户数据按照Tops提供的接口规则，通过程序生成签名，生成请求数据集合；       
1.2 发送请求数据，把构造完成的数据集合通过``POST/GET``等提交的方式传递给Tops；  
1.3 Tops对请求数据进行处理，服务器在接收到请求后，会首先进行安全校验，验证通过后便会处理该次发送过来的请求；
1.4 返回响应结果数据，Asch把响应结果以JSON的格式反馈给用户，每个响应都包含``success``字段，表示请求是否成功，成功为true, 失败为false。 如果失败，则还会包含一个``error``字段，表示错误原因；       
1.5 对获取的返回结果数据进行处理；

---

## **2 接口**   
### **2.1 账户accounts**   

#### **2.1.1 登录**   
##### **2.1.1.1 本地加密后再登陆（推荐使用, 下一版本实现）**   
POST ``/api/accounts/open2/``

接口备注：根据用户密码在本地客户端用js代码生成公钥    

请求参数说明：   

```json
{"publicKey": "publicKey"}
```

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|publicKey |string |Y    |账户公钥      |

返回结果说明：   

```json
{   
	"success": true,   
	"account": {   
		"address": "T7oXKNjEhNuBir3r9PMrBj96T6Xuqh8Jpn",  //tops地址   
		"unconfirmedBalance": 29380000000,  //未确认和已确认的余额之和，该值大于等于balance   
		"balance": 29380000000, //余额   
		"publicKey": "bd1e78cabc0fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9", //公钥 
		"unconfirmedSignature": false,   
		"secondSignature": true,    //二级签名   
		"secondPublicKey": "efg0942beb74de5ed6368c792af8665e9636f32a5f1c9377bcdc3b252d3f277",//二级密码公钥
		"multisignatures": [],    
		"u_multisignatures": []  
	}
}
```

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boolean  |是否登陆成功      |
|account|json   |账户信息          |
请求示例

```bash
curl -X POST -H "Content-Type: application/json" -k -d '{"publicKey":"bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9"}' http://localhost:7070/api/accounts/open2/ 
```

公钥可以通过SDK本地生成

```js
var secret = '用户密码';  //在浏览器内存中保留
var TopsJS = require('TopsJS');
var publicKey = TopsJS.crypto.getKeys(secret).publicKey;  //根据密码生成公钥 
// var address = TopsJS.crypto.getAddress(publicKey);     //根据公钥生成地址
```



##### **2.1.1.2 本地不加密直接登陆**   
POST ``/api/accounts/open``



接口备注：将密码传入到server端，根据生成的地址去查询账户信息。不推荐在公网坏境使用！


请求参数说明：   

```json
{ "secret": "secret key of account" }
```

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|secret |string |Y    |tops账户密码       |

返回结果说明： 

```json
{   
    "success": true,    
    "account": {   
        "address": "16723473400748954103",    
        "unconfirmedBalance": 29430000000,    
        "balance": 29430000000,    
        "publicKey": "bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9",    
        "unconfirmedSignature": false,    
        "secondSignature": true,    
        "secondPublicKey": "edf30942beb74de5ed6368c792af8665e9636f32a5f1c9377bcdc3b252d3f277",   
        "multisignatures": [ ], 
        "u_multisignatures": [ ]
    }   
}   
```

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boolean  |是否登陆成功      |
|account|json   |账户信息          |

请求示例：   
```bash   
curl -X POST -H "Content-Type: application/json" -k -d '{"secret":"fault still attack alley expand music basket purse later educate follow ride"}' http://localhost:7070/api/accounts/open/ 
```



#### **2.1.2 获取账户余额**   
GET ``/api/accounts/getBalance?address=<address>``


请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|address |string |Y    |用户地址,最小长度：1      |

返回参数说明：

```json
{
  "success": true,
  "balance": 1000000000000,
  "unconfirmedBalance": 1000000000000
}
```

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boolean  |是否成功获得response数据 |
|balance|integer  |余额      |
|unconfirmedBalance|integer|未确认和已确认的余额之和，该值大于等于balance|


请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/accounts/getBalance?address=14636456069025293113'   
```



#### **2.1.3 根据地址获取账信息**

GET ``/api/accounts?address=<address> ``



请求参数说明：

| 名称    | 类型   | 必填 | 说明                 |
| ------- | ------ | ---- | -------------------- |
| address | string | Y    | 用户地址,最小长度：1 |

返回结果说明：

| 名称                   | 类型       | 说明                                                         |
| ---------------------- | ---------- | ------------------------------------------------------------ |
| **success**            | boolean    | 是否成功获得response数据                                     |
| **account**            | JSON       | 账户信息                                                     |
| - address              | string     | Address of account                                           |
| - unconfirmedBalance   | integer    | Unconfirmed balance of account                               |
| - balance              | integer    | Balance of account                                           |
| - publicKey            | hex string | Public key of account                                        |
| - unconfirmedSignature | boolean    | If account enabled second signature,<br />but it's still not confirmed |
| - secondSignature      | boolean    | If account enabled second signature, true or false           |
| - multisignatures      | array      |                                                              |
| - u_multisignatures    | array      |                                                              |

请求示例：

```bash
curl -k -X GET http://localhost:7070/api/accounts?address=<address>
```



#### **2.1.4 根据地址获取账户公钥**   

GET ``/api/accounts/getPublicKey?address=<address>``



接口备注：只有给别人转过账，db中才会存取公钥，否则是查不到的。btc也是这样


请求参数说明：

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|address |string |Y    |用户地址,最小长度：1      |

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|publicKey|string  |公钥      |

请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/accounts/getPublickey?address=14636456069025293113'   
```

响应JSON返回示例：   
```json 
{   
	"success": true,   
	"publicKey": "ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7"   
}   
```



#### **2.1.5 生成公钥**   

POST ``/api/accounts/generatePublicKey ``


请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|secret |string |Y    |tops账户密码      |

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|publicKey|string  |公钥      |

请求示例：   
```bash   
curl -k -H "Content-Type: application/json" \
-X POST -d '{"secret":"<INSERT SECRET HERE>"}' \
http://localhost:7070/api/accounts/generatePublicKey
```

响应JSON返回示例：   
```js   
{
	"success": true,   
	"publicKey": "bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9"   
}
```



#### **2.1.6 根据地址获取其投票列表**   

GET ``/api/accounts/delegates?address=<address> ``


请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|address |string |Y    |投票人地址      |

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|delegates|Array  |已投票的受托人详情数组      |


请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/accounts/delegates?address=<address>'   
```

JSON返回示例：   
```js   
{   
	"success": true,   
	"delegates": [{   
		"username": "tops001",   
		"address": "T7oXKNjEhNuBir3r9PMrBj96T6Xuqh8Jpn",   
		"publicKey": "ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7",   
		"vote": 9901985415600500,   
		"producedblocks": 1373,   
		"missedblocks": 6,   
		"rate": 1,   
		"approval": "98.54",   
		"productivity": "99.56"   
	},   
	{   
		"username": "tops002",   
		"address": "T7oXKNjEhNuBir3r9PMrBj96T6Xuqh8Jpn",   
		"publicKey": "c292db6ea14d518bc29e37cb227ff260be21e2e164ca575028835a1f499e4fe2",   
		"vote": 9891995435600500,   
		"producedblocks": 1371,   
		"missedblocks": 8,   
		"rate": 2,   
		"approval": "98.44",   
		"productivity": "99.41"   
	},   
	{   
		"username": "tops003",   
		"address": "T7oXKNjEhNuBir3r9PMrBj96T6Xuqh8Jpn",   
		"publicKey": "c547df2dde6cbb4508aabcb5970d8f9132e5a1d1c422632da6bc20bf1df165b8",   
		"vote": 32401577128413,   
		"producedblocks": 969,   
		"missedblocks": 8,   
		"rate": 102,   
		"approval": "0.32",   
		"productivity": 0   
	}]   
}   
```

#### **2.1.7 获取受托人手续费设置**   
GET ``/api/accounts/delegates/fee``



返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|fee|integer  |手续费      |


请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/accounts/delegates/fee  
```

JSON返回示例：   
```json
{
	"success": true,   
	"fee": 100000000  // 0.1 XAS   
}
```



#### **2.1.8 给受托人投票**   

PUT ``/api/accounts/delegates``


请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|secret |string |Y    |tops账户密码       |
|publicKey|string  |N|公钥      |
|secondSecret|string|N|tops账户二级密码，最小长度：1，最大长度：100|
|delegates|Array|受托人公钥数组，每个公钥前需要加上+或者-号，代表增加/取消对其的投票||

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|transaction|json  |投票交易详情      |


请求示例：   
```bash   
curl -k -H "Content-Type: application/json" -X PUT -d '{"secret":"call scissors pupil water friend timber spend brand vote obey corn size","publicKey":"3ec1c9ec08c0512641deba37c0e95a0fe5fc3bdf58424009f594d7d6a4e28a2a","delegates":["+fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575"]}' 'http://localhost:7070/api/accounts/delegates'     
```

JSON返回示例：   
```json
 {
	"success": true,
	"transaction": {
		"type": 3,  //投票的交易类型为3
		"amount": 0,
		"senderPublicKey": "3ec1c9ec08c0512641deba37c0e95a0fe5fc3bdf58424009f594d7d6a4e28a2a",
		"requesterPublicKey": null,
		"timestamp": 5056064,
		"asset": {
			"vote": {
				"votes": ["+fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575"]
			}
		},
		"recipientId": null,
		"signature": "0bff58c7311fc59b3c8b3ffc236bbfece9850c334fb0c292ab087f78cf9a6c0f4d3e541c501887a2c2ec46294c777e8f7bf7dea9cb7c9a175fdec641bb684f08",
		"id": "5630629337798595849",
		"fee": 10000000,
		"senderId": "15238461869262180695"
	}
}
```



### **2.2 交易transactions**   

#### **2.2.1 获取交易信息**   
GET `` /api/transactions?blockId=<blockId>&senderId=<senderId>&recipientId=<recipientId>&limit=<limit>&offset=<offset>&orderBy=<field>``   


接口备注：如果请求不加参数则会获取全网所有交易   
请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|blockId |string |N    |区块id      |
|senderId |string |N |发送者地址 |
|recipientId |string |N |接受者地址 |
|limit |integer |N    |限制结果集个数，最小值：0,最大值：100   |
|orderBy|string  |N      |根据表中字段排序，senderPublicKey:desc  |
|offset|integer  |N      |偏移量，最小值0  |
返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|transactions|列表  |多个交易详情json构成的列表      |
|count|int|获取到的交易总个数|

请求示例：   
```bash   
curl -k -X GET http://localhost:7070/api/transactions?blockId=<blockId>
```

JSON返回示例：   
```js   
{   
	"success": true,   
	"transactions": [{   
		"id": "17192581936339156329",   
		"height": "105951",   
		"blockId": "15051364118100195665",   
		"type": 0,   
		"timestamp": 4385190,   
		"senderPublicKey": "d39d6f26869067473d685da742339d1a9117257fe14b3cc7261e3f2ed5a339e3",   
		"senderId": "15745540293890213312",   
		"recipientId": "16723473400748954103",   
		"amount": 10000000000,   
		"fee": 10000000,   
		"signature": "98d65df3109802c707eeed706e90a907f337bddab58cb4c1fbe6ec2179aa1c85ec2903cc0cf44bf0092926829aa5a0a6ec99458f65b6ebd11f0988772e58740e",   
		"signSignature": "",   
		"signatures": null,   
		"confirmations": "31802",   
		"asset": {   
			   
		}   
	},   
	{   
		"id": "7000452951235123088",   
		"height": "105473",   
		"blockId": "11877628176330539727",   
		"type": 0,   
		"timestamp": 4380147,   
		"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
		"senderId": "16358246403719868041",   
		"recipientId": "16723473400748954103",   
		"amount": 10000000000,   
		"fee": 10000000,   
		"signature": "dc84044d4f6b4779eecc3a986b6507e458cc5964f601ebeb4d3b68a96129813f4940e14de950526dd685ca1328b6e477e6c57e95aeac45859a2ea62a587d0204",   
		"signSignature": "",   
		"signatures": null,   
		"confirmations": "32280",   
		"asset": {   
			   
		}   
	},   
	{   
		"id": "14093929199102906687",   
		"height": "105460",   
		"blockId": "2237504897174225512",   
		"type": 0,   
		"timestamp": 4380024,   
		"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
		"senderId": "16358246403719868041",   
		"recipientId": "16723473400748954103",   
		"amount": 10000000000,   
		"fee": 10000000,   
		"signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
		"signSignature": "",   
		"signatures": null,   
		"confirmations": "32293",   
		"asset": {   
			   
		}   
	}],   
	"count": 3   
}   
```


#### **2.2.2 根据交易id查看交易详情**   

GET ``/api/transactions/get?id=<id> ``


请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|Id |string |Y    |交易id      |


返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|transactions|json  |交易详情      |

请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/transactions/get?id=14093929199102906687'   
```

JSON返回示例：   
```json
{   
	"success": true,   
	"transaction": {   
		"id": "14093929199102906687", // 交易id  
		"height": "105460",// 该交易所在区块高度   
		"blockId": "2237504897174225512",// 所在区块id   
		"type": 0,// 交易类型，0：普通转账   
		"timestamp": 4380024,// 距离创世块的timestamp   
		"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575", // 发送者公钥   
		"senderId": "16358246403719868041",// 发送者地址   
		"recipientId": "16723473400748954103",// 接收者地址   
		"amount": 10000000000,// 交易额，100TOP  
		"fee": 10000000, // 手续费0.1TOP  
		"signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
		"signSignature": "",   
		"signatures": null,   
		"confirmations": "34268",// 确认数   
		"asset": {   
		}
	}   
}   
```



#### **2.2.3 根据未确认交易id查看详情**   

GET ``/api/transactions/unconfirmed/get?id=<id> ``


请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|id|string |Y    |未确认交易id      |

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|transaction|json  |未确认交易详情      |


请求示例：   
```bash   
curl -k -X GET http://loalhost:7070/api/transactions/unconfirmed/get?id=7557072430673853692 
# 正常情况，该未确认交易存在时间极短0~10秒   
```

JSON返回示例：   
```js   
{
	"success": true,
	"transaction": {
		"type": 0,
		"amount": 10000,
		"senderPublicKey": "3ec1c9ec08c0512641deba37c0e95a0fe5fc3bdf58424009f594d7d6a4e28a2a",
		"requesterPublicKey": null,
		"timestamp": 5082322,
		"asset": {
			
		},
		"recipientId": "16723473400748954103",
		"signature": "3a97f8d63509ef964bda3d816366b8e9e2d9b5d4604a660e7cbeefe210cb910f5de9a51bece06c32d010f55502c62f0f59b8224e1c141731ddfee27206a88d02",
		"id": "7557072430673853692",
		"fee": 10000000,
		"senderId": "15238461869262180695"
	}
}
```



#### **2.2.4 获取全网所有未确认的交易详情**   

GET  ``/api/transactions/unconfirmed``



返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|transactions|Array  |未确认交易列表      |


请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/transactions/unconfirmed'   
```

JSON返回示例：   
```js   
{   
	"success": true,   
	"transactions": [] //全网目前未确认的交易   
}   
```



#### **2.2.5 创建交易并广播**   

PUT ``/api/transactions ``



请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|secret |string |Y    |tops账户密码       |
|amount|integer|Y|金额，最小值：1，最大值：10000000000000000|
|recipientId|string|Y|接收者地址,最小长度：1|
|publicKey|string|N|发送者公钥|
|secondSecret|string|N|发送者二级密码，最小长度1，最大长度：100|

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|transactionId|string  |交易id      |


请求示例：   
```bash   
curl -k -H "Content-Type: application/json" \
-X PUT -d '{"secret":"<INSERT SECRET HERE>","amount":<INSERT AMOUNT HERE>,"recipientId":"<INSERT WALLET ADDRESS HERE>"}' \
http://localhost:7070/api/transactions
```

JSON返回示例：   
```js   
{   
	"success": true,   
	"transactionId": "16670272591943275531"   
}   
```



### **2.3 区块blocks**   

#### **2.3.1 获取指定区块的详情**   
GET ``/api/blocks/get?id=<id> ``


请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|id |string |Y    |区块id      |

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|block|json  |区块详情      |


请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/blocks/get?id=6076474715648888747'   
```

JSON返回示例：   
```js   
{   
	"success": true,   
	"block": {   
		"id": "6076474715648888747",   
		"version": 0,   
		"timestamp": 4734070,   
		"height": 140538,   
		"previousBlock": "16033230167082515105",    //上一个区块id   
		"numberOfTransactions": 0,  //交易数   
		"totalAmount": 0,   //交易额   
		"totalFee": 0,   
		"reward": 350000000,    //奖励   
		"payloadLength": 0,   
		"payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",   
		"generatorPublicKey": "1d352950c8141e1b35daba4a974a604519d7a2ef3a1ec0a503ce2653646aa052",   
		"generatorId": "6656029629904254066",   
		"blockSignature": "a53de66922cdc2f431acd0a474beec7cf7c420a8460b7b7caf84999be7caebb59fb7fbb7166c2c7013dbb431585ea7294722166cb08bf9663abf50b6bd81cd05",   
		"confirmations": "2",   
		"totalForged": 350000000   
	}   
}   
```



#### **2.3.2 获取区块数据**   

GET ``/api/blocks``


接口说明：不加参数则获取全网区块详情   
请求参数说明：   

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |
|limit |integer |N    |限制结果集个数，最小值：0,最大值：100   |
|orderBy|string  |N      |根据表中字段排序，如height:desc  |
|offset|integer  |N      |偏移量，最小值0  |
|generatorPublicKey|string  |N      |区块生成者公钥  |
|totalAmount|integer  |N       |交易总额，最小值：0，最大值：10000000000000000 |
|totalFee|integer  |N      |手续费总额，最小值：0，最大值：10000000000000000  |
|reward|integer  |N      |奖励金额，最小值：0  |
|previousBlock|string  |N      |上一个区块  |
|height|integer  |N      |区块高度  |

返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|blocks|Array  |由区块详情json串构成的数组 |
|count|integer|区块链高度|


请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/blocks?limit=2&offset=0&orderBy=height:desc'   
```

JSON返回示例：   
```js   
{   
	"success": true,   
	"blocks": [{   
		"id": "12634047624004615059",   
		"version": 0,   
		"timestamp": 4708080,   
		"height": 137986,   
		"previousBlock": "3498191422350401106",   
		"numberOfTransactions": 0,  // 交易数   
		"totalAmount": 0,   // 金额   
		"totalFee": 0,  // 手续费   
		"reward": 350000000,    // 奖励   
		"payloadLength": 0,   
		"payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",   
		"generatorPublicKey": "44db7bec89ef289d0def257285675ca14f2a947dfd2b70e6b1cff4392ce42ada",   
		"generatorId": "4925169939071346193",   
		"blockSignature": "83a2124e3e8201c1a6099b2ac8ab1c117ad34867978add3a90d41a64df9d2ad8fabc9ec14d27a77cd34c08a6479ef684f247c11b1cbbcb0e9767dffc85838600",   
		"confirmations": "1",   
		"totalForged": 350000000   
	},   
	{   
		"id": "3498191422350401106",   
		"version": 0,   
		"timestamp": 4708070,   
		"height": 137985,   
		"previousBlock": "14078155423801039323",   
		"numberOfTransactions": 0,   
		"totalAmount": 0,   
		"totalFee": 0,   
		"reward": 350000000,   
		"payloadLength": 0,   
		"payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",   
		"generatorPublicKey": "500b1ec025cd64d36008341ed8d2508473ecf559be213ca5f9580620a21a592c",   
		"generatorId": "16006295608945777169",   
		"blockSignature": "a0b5ed6c94b1f33c4d0f017f21a08357061493392b19e34eeedf274b77c751e3f86c92443280de09ea1754d62fe7ef00e02acbdc3bc0c1063cef344bacaa4f07",   
		"confirmations": "2",   
		"totalForged": 350000000   
	}],   
	"count": 137986   
}   
```



#### **2.3.3 获取区块链高度**   

GET ``/api/blocks/getHeight ``



返回参数说明：   

|名称	|类型   |说明              |
|------ |-----  |----              |
|success|boole  |是否成功获得response数据 |
|height|integer  |区块链高度      |

请求示例：   
```bash   
curl -k -X GET 'http://localhost:7070/api/blocks/getheight'    
```

JSON返回示例：   
```js   
{"success":true,"height":140569}   
```


