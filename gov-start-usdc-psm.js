// This is generated by writeCoreProposal; please edit!
/* eslint-disable */

const manifestBundleRef = {
  bundleID:
    "b1-4c34c89b707bc8ece5a41e97e6a354081f7ae8a40391f1462848348613dd1218dcce574b3e30901a9825a966cb85bda6a92ba9f9ce9ba325e4c475f9a678b930",
};
const getManifestCall = harden([
  "getManifestForPsm",
  {
    anchorOptions: {
      decimalPlaces: 6,
      denom:
        "ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9",
      keyword: "USDC",
      proposedName: "USDC",
    },
    installKeys: {},
  },
]);
const overrideManifest = {
  makeAnchorAsset: {
    consume: {
      agoricNamesAdmin: true,
      anchorBalancePayments: true,
      anchorKits: true,
      bankManager: "bank",
      startUpgradable: true,
    },
    installation: {
      consume: {
        mintHolder: "zoe",
      },
    },
    produce: {
      anchorBalancePayments: true,
      anchorKits: true,
      testFirstAnchorKit: true,
    },
    vatParameters: {
      chainStorageEntries: true,
    },
  },
  startPSM: {
    brand: {
      consume: {
        IST: "zoe",
      },
    },
    consume: {
      agoricNamesAdmin: true,
      anchorBalancePayments: true,
      board: true,
      chainStorage: true,
      chainTimerService: "timer",
      diagnostics: true,
      econCharterKit: "econCommitteeCharter",
      economicCommitteeCreatorFacet: "economicCommittee",
      feeMintAccess: "zoe",
      provisionPoolStartResult: true,
      psmKit: true,
      zoe: "zoe",
    },
    installation: {
      consume: {
        contractGovernor: "zoe",
        psm: "zoe",
      },
    },
    instance: {
      consume: {
        economicCommittee: "economicCommittee",
      },
    },
    produce: {
      psmKit: "true",
    },
    vatParameters: {
      chainStorageEntries: true,
    },
  },
};

// Make the behavior the completion value.
(({
  manifestBundleRef,
  getManifestCall,
  overrideManifest,
  E,
  log = console.info,
  restoreRef = () => {},
}) => {
  const { entries, fromEntries } = Object;

  // deeplyFulfilled is a bit overkill for what we need.
  const shallowlyFulfilled = async (obj) => {
    if (!obj) {
      return obj;
    }
    const ents = await Promise.all(
      entries(obj).map(async ([key, valueP]) => {
        const value = await valueP;
        return [key, value];
      })
    );
    return fromEntries(ents);
  };

  /** @param {ChainBootstrapSpace & BootstrapPowers & { evaluateBundleCap: any }} allPowers */
  const behavior = async (allPowers) => {
    // NOTE: If updating any of these names extracted from `allPowers`, you must
    // change `permits` above to reflect their accessibility.
    const {
      consume: { vatAdminSvc, zoe },
      evaluateBundleCap,
      modules: {
        utils: { runModuleBehaviors },
      },
    } = allPowers;
    const [exportedGetManifest, ...manifestArgs] = getManifestCall;

    // Get the on-chain installation containing the manifest and behaviors.
    console.info("evaluateBundleCap", {
      manifestBundleRef,
      exportedGetManifest,
      vatAdminSvc,
    });
    let bcapP;
    if ("bundleName" in manifestBundleRef) {
      bcapP = E(vatAdminSvc).getNamedBundleCap(manifestBundleRef.bundleName);
    } else {
      bcapP = E(vatAdminSvc).getBundleCap(manifestBundleRef.bundleID);
    }
    const bundleCap = await bcapP;

    const manifestNS = await evaluateBundleCap(bundleCap);

    console.error("execute", {
      exportedGetManifest,
      behaviors: Object.keys(manifestNS),
    });
    const { manifest, options: rawOptions } = await manifestNS[
      exportedGetManifest
    ](harden({ restoreRef }), ...manifestArgs);

    const options = await shallowlyFulfilled(rawOptions);

    // All dependency bundles are already installed, so we ignore `installations` from the getManifest response.

    // Evaluate the manifest for our behaviors.
    return runModuleBehaviors({
      allPowers,
      behaviors: manifestNS,
      manifest: overrideManifest || manifest,
      makeConfig: (name, _permit) => {
        log("coreProposal:", name);
        return { options };
      },
    });
  };

  // Make the behavior the completion value.
  return behavior;
})({ manifestBundleRef, getManifestCall, overrideManifest, E });
