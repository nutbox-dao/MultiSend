const Token = artifacts.require("Token");
const { padLeft, toHex, toWei, fromWei, toBN } = web3.utils;

module.exports = async (deployer, network, accounts) => {
    let token = await Token.deployed();
    await token.mint(accounts[0], toWei("1000000000", "ether"));
    // let balance = await token.balanceOf("0xF04E3faeB392C42277a7c1867BD66e61F55b7E9c");
    // console.log("PNUT: ", fromWei(balance, "ether"));
    // balance = await web3.eth.getBalance("0xF04E3faeB392C42277a7c1867BD66e61F55b7E9c")
    // console.log("ETH: ", fromWei(balance, "ether"));
};