import * as nearAPI from 'near-api-js';

async function viewMethodOnContract(nearConfig, method) {
  const provider = new nearAPI.providers.JsonRpcProvider(nearConfig.nodeUrl);
  const rawResult = await provider.query(
    `call/${nearConfig.contractName}/${method}`,
    'AQ4'
  ); // Base 58 of '{}'
  return JSON.parse(
    rawResult.result.map((x) => String.fromCharCode(x)).join('')
  );
}

export default viewMethodOnContract;
