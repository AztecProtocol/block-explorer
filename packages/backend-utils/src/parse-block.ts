import { L2Block } from "@aztec/aztec.js";
import { ChicmozL2Block, chicmozL2BlockSchema } from "@chicmoz-pkg/types";

const getTxEffectWithHashes = (txEffects: L2Block["body"]["txEffects"]) => {
  return txEffects.map((txEffect) => ({
    ...txEffect,
    hash: "0x" + txEffect.hash().toString("hex"),
  }));
};

export const blockFromString = (stringifiedBlock: string): L2Block => {
  try {
    return L2Block.fromString(stringifiedBlock);
  } catch (error) {
    throw new Error("Failed to parse L2Block from string");
  }
};

export const parseBlock = (block: L2Block): ChicmozL2Block => {
  try {
    const blockHash = block.hash();
    const blockWithTxEffectsHashesAdded = {
      body: {
        ...block.body,
        txEffects: getTxEffectWithHashes(block.body.txEffects),
      },
    };

    const parsedBlock = {
      hash: blockHash.toString(),
      height: block.number,
      ...blockWithTxEffectsHashesAdded,
    };

    return chicmozL2BlockSchema.parse(parsedBlock);
  } catch (error) {
    throw new Error("Failed to parse ChicmozL2Block");
  }
};