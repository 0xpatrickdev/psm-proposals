## To Submit On-chain

### (Maybe) Install Bundles
```bash
$B1=b1-4c34c89b707bc8ece5a41e97e6a354081f7ae8a40391f1462848348613dd1218dcce574b3e30901a9825a966cb85bda6a92ba9f9ce9ba325e4c475f9a678b930.json
$B2=b1-b183edd918de93c0b009b0f662502ff851c8e95177c812f2eabc82cd65c2c53e1cb12c56719d6e7c474a0f3d58d3c3d2839dfbf0c2e62f6ee6758e16c16b38c2.json
$B3=b1-c25fbc404ae239a8bf9f3d5f65f3f27d489fb4c8e48de0613b1c59c6fc00718243b2c84a3d7060350cbe4442d340d4826d4d1948b9e9938b31807e64c18adbc4.json

agd tx swingset install-bundle @$B1 --from $WALLET --node $NODE --chain-id $CHAIN_ID --gas=auto --gas-adjustment=1.2 -y -b block
agd tx swingset install-bundle @$B2 --from $WALLET --node $NODE --chain-id $CHAIN_ID --gas=auto --gas-adjustment=1.2 -y -b block
agd tx swingset install-bundle @$B3 --from $WALLET --node $NODE --chain-id $CHAIN_ID --gas=auto --gas-adjustment=1.2 -y -b block
```

If the bundles are already on chain, you can skip this step. Information on how to retrieve [posted here](https://gist.github.com/dckc/4088fb3cf7b568ce81ddabab2817f336).


### Noble USDC 

```bash
agd tx gov submit-proposal swingset-core-eval gov-start-psm-permit.json gov-start-usdc-psm.js \
  --title="Start USDC (Noble) PSM" --description="Evaluate gov-start-usdc-psm.js" --deposit=1000000ubld \
    --gas=auto --gas-adjustment=1.2 --from $WALLET -y -b block
```


### Kava USDT 

```bash
agd tx gov submit-proposal swingset-core-eval gov-start-psm-permit.json gov-start-usdt-psm.js \
  --title="Start USDT (Kava) PSM" --description="Evaluate gov-start-usdt-psm.js" --deposit=1000000ubld \
    --gas=auto --gas-adjustment=1.2 --wallet $from -y -b block
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

1. Checkout the `mainnet1B-rc3` tag on `agoric-sdk` to grab the latest version of the sdk deployed on chain.

```bash
cd ~/agoric-sdk
git fetch --tags
git checkout -b mainnet1B-rc3 tags/mainnet1B-rc3
yarn install && yarn build
```

2. Navigate to `packages/inter-protocol`, and execute the following for each denom:

```bash
ANCHOR_DENOM=ibc/abc123 INTERCHAIN_DENOM=irrelevant agoric run scripts/inter-protocol/add-collateral-core.js
```

3. Ignore the add-collateral proposal in the output, and check in start-psm proposal.

4. Manually add `keyword` and `proposedName` to `anchorOptions` in `gov-start-psm.js`


See https://github.com/Agoric/agoric-sdk/discussions/8450 for more details.
