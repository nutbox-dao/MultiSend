const MultiSend = artifacts.require("MultiSend");
const Token = artifacts.require("Token");
const { padLeft, toHex, toWei, fromWei, toBN } = web3.utils;

contract("MultiSend test", async accounts => {
    it("test send eth", async () => {
        let amount = toWei("1", "ether")
        let instance = await MultiSend.deployed();
        let balance = await web3.eth.getBalance("0x6E5787CF9A8524C3046167C80Fe4D5e3dD35821F")
        await instance.multi_send_token("0x0000000000000000000000000000000000000000",
            ["0x6E5787CF9A8524C3046167C80Fe4D5e3dD35821F", "0xf706257fcec92440542AE6A065B663f005e45940"],
            [amount, toWei("2", "ether")], { value: toWei("3", "ether") })
        let new_balance = await web3.eth.getBalance("0x6E5787CF9A8524C3046167C80Fe4D5e3dD35821F")
        assert.equal(
            parseInt(balance),
            parseInt(new_balance) - parseInt(amount),
            "Amount wasn't correctly taken from the sender"
        );
    });

    it("test send erc20", async () => {
        let addresses = ["0x7C290382dF981515E00e903c2FB335373B83EB8D", "0x55D2f9FDe7456a3A4D9f320Cc8364970D66aB42B"];
        let amount = toWei("1", "ether")
        let instance = await MultiSend.deployed();
        console.log("instance: ", instance.address)
        let token = await Token.deployed();
        let balance = await token.balanceOf(addresses[0]);
        
        await token.approve(instance.address, toWei("100000", "ether"));
        
        await instance.multi_send_token(token.address,
            addresses,
            [amount, toWei("2", "ether")], { value: toWei("3", "ether") })
        let new_balance = await token.balanceOf(addresses[0])
        assert.equal(
            parseInt(balance),
            parseInt(new_balance) - parseInt(amount),
            "Amount wasn't correctly taken from the sender"
        );
        await token.approve(instance.address, "0");
    });
});