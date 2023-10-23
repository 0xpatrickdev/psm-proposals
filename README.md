## To Submit On-chain

### Install Bundles
```bash
$B1=b1-820164f689d730163488efe6911b89f4f4dfb9b11b33b711c24340416c7ea90ec6a311ceb8c26cc2d1c6624e8d5b714c73eab1a08d99bb81c22d815acefd94fd.json
$B2=b1-d6bf1435f5ef0fc5f8386bc6f6d4563f9f2b8c1117d7d778e39d34601436d78cac7e5000f73857ed5b3dcc76742ff0d392d8a3e3164d7775a9c85ed0c30fdeda.json
$B3=b1-eb7db38002a9f53cb6df39c5b23c816d8b6381c1388c9fec772e0cdbb055f55641da9219a4891ecee5697c9cc3c6a988d0ffa75d191e806f4867990b4ce3df83.json

agd tx swingset install-bundle @$B1 --from $WALLET --node $NODE --chain-id $CHAIN_ID --gas=auto --gas-adjustment=1.2 -y -b block
agd tx swingset install-bundle @$B2 --from $WALLET --node $NODE --chain-id $CHAIN_ID --gas=auto --gas-adjustment=1.2 -y -b block
agd tx swingset install-bundle @$B3 --from $WALLET --node $NODE --chain-id $CHAIN_ID --gas=auto --gas-adjustment=1.2 -y -b block
```

### Noble USDC 

```bash
agd tx gov submit-proposal swingset-core-eval gov-start-psm-permit.json gov-start-usdc-psm.js \
  --title="Start USDC (Noble) PSM" --description="Evaluate gov-start-usdc-psm.js" --deposit=1000000ubld \
    --gas=auto --gas-adjustment=1.2
```


### Kava USDT 

```bash
agd tx gov submit-proposal swingset-core-eval gov-start-psm-permit.json gov-start-usdt-psm.js \
  --title="Start USDT (Kava) PSM" --description="Evaluate gov-start-usdt-psm.js" --deposit=1000000ubld \
    --gas=auto --gas-adjustment=1.2
```

## IBC Denoms

USDC (Noble): `ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9`

```bash
agd query ibc-transfer denom-trace ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9 --node $NODE --chain-id agoric-3
denom_trace:
  base_denom: uusdc
  path: transfer/channel-62
```


USDT (Kava): `ibc/079DAF1995A28BCD3B4E3D38948BB0FBC1CDE47939820CBAB7C02AFB88FF31A3`

```bash
$ agd query ibc-transfer denom-trace ibc/079DAF1995A28BCD3B4E3D38948BB0FBC1CDE47939820CBAB7C02AFB88FF31A3 --node $NODE --chain-id agoric-3
denom_trace:
  base_denom: erc20/tether/usdt
  path: transfer/channel-63
```


## To Generate

1. Check out agoric-sdk#740eacc

2. Fix relative import reference in `packages/builders/scripts/inter-protocol/add-collateral-core.js

3. ANCHOR_DENOM=ibc/abc123 INTERCHAIN_DENOM=irrelevant agoric run scripts/inter-protocol/add-collateral-core.js

4. Ignore add-collateral proposal, and check in start-psm proposal.

5. Manually add `keyword` and `proposedName` to `anchorOptions` in `gov-start-psm.js`


See https://github.com/Agoric/agoric-sdk/discussions/8450 for more details. You can also check out [this fork](https://github.com/Agoric/agoric-sdk/compare/master...0xpatrickdev:agoric-sdk:pc/psm-proposals?expand=1).
