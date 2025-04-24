# 📊 UO Status API

This API allows you to query the status of a specific UserOperation hash and retrieve detailed metadata associated with its lifecycle and execution.

---

## 📥 Endpoint

**GET** `https://userops.scs.startale.com/user_op/<user-op-hash>`

Retrieve the full status and metadata of a given UserOperation.

---

## 🧾 Sample Response
```json
{
  "id": 38,
  "user_op_hash": "0x4c9016499c7d075fa64b2b3d1f5ce929e2149f8deeca6e59d502d199aa541fac",
  "user_operation": {
    "callData": "0xb61d27f60000000000000000000000006bcf154a6b80fde9bd1556d39c9bcbb19b539bd800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000406661abd00000000000000000000000000000000000000000000000000000000",
    "callGasLimit": 15288,
    "factory": "",
    "factoryData": "",
    "hash": "0x4c9016499c7d075fa64b2b3d1f5ce929e2149f8deeca6e59d502d199aa541fac",
    "maxFeePerGas": 100327,
    "maxPriorityFeePerGas": 100000,
    "nonce": 3.2194206966474856e31,
    "paymaster": "0x20E8677aCB27BC0dC3BCA61f981324560cB77066",
    "paymasterData": "0xfc035b327d67e3d12f207c6a3fe5d5ed67ade5be000068066edb000068066c83000f4240cb077ffbf23eb14dca3f1925bb392ace8e2804d7ce754978090f1f3d526e49e11221ef9eac4aa5d2ff8b51d136b98977f7c6aa4360383362f23f786ba45593551c",
    "paymasterPostOpGasLimit": 75000,
    "paymasterVerificationGasLimit": 35640,
    "preVerificationGas": 2177341,
    "sender": "0x1891Ee71BB06D33DEC5a15f7704a15582b5207e1",
    "signature": "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
    "verificationGasLimit": 51480
  },
  "policy_id": "sudo",
  "project_id": "",
  "paymaster_mode": "SPONSORSHIP",
  "data_source": "Indexer",
  "status": "Success",
  "token_address": "",
  "metadata": {
    "actualGasCost": "0x35133c9928",
    "actualGasUsed": "0x22b226",
    "deductedAmount": "0x35dfca1d48",
    "deductedUser": "0xfc035b327d67e3d12f207c6a3fe5d5ed67ade5be",
    "premium": "0x0"
  },
  "created_at": "2025-04-21T16:04:17",
  "updated_at": "2025-04-21T16:04:37.669429"
}
```

---

## 🧾 Field Descriptions

### Top-Level Fields
| Field              | Description                                   |
|-------------------|-----------------------------------------------|
| `user_op_hash`    | The hash of the UserOperation                 |
| `policy_id`       | Policy tag assigned by the paymaster          |
| `project_id`      | Optional project associated with the op       |
| `paymaster_mode`  | `SPONSORSHIP`, `TOKEN`, etc.                  |
| `status`          | Execution status (`Success`, `Failed`, etc.)  |
| `data_source`     | Origin of data (`Indexer`, `Relayer`, etc.)   |
| `token_address`   | Token used if it's a erc20 token-based api    |
| `created_at`      | Timestamp when the record was created         |
| `updated_at`      | Last time the record was updated              |

### `user_operation` Object
Includes full details of the submitted operation: calldata, sender, gas values, nonce, paymaster fields, and signature.

### `metadata` Object
| Field              | Description                              |
|-------------------|------------------------------------------|
| `actualGasCost`   | Total gas fee paid (in wei)              |
| `actualGasUsed`   | Units of gas consumed                    |
| `deductedAmount`  | Total amount deducted from sponsor/user  |
| `deductedUser`    | Address from which deduction happened    |
| `premium`         | Paymaster service premium added (if any) |

---

## 🛠️ Use Case
You can use this API to:
- Check whether a user operation was successful
- Track gas usage per operation
- Reconcile token or ETH deductions via paymaster
- Debug signature, nonce, and paymaster data

