const Token = artifacts.require("Token");
const { padLeft, toHex, toWei, fromWei, toBN } = web3.utils;

module.exports = async (deployer, network, accounts) => {
    let token = await Token.deployed()
    await token.mint(accounts[0], toWei("1000000000", "ether"))
};