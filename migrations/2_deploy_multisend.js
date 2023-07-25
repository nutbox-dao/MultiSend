const MultiSend = artifacts.require("MultiSend");
const Token = artifacts.require("Token");

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(MultiSend);
    // await deployer.deploy(Token, "PUNT", "PUNT")
};