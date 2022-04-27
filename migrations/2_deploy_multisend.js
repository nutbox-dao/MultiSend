const MultiSend = artifacts.require("MultiSend");

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(MultiSend);
};