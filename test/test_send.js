const MultiSend = artifacts.require("MultiSend");
const { padLeft, toHex, toWei, fromWei, toBN } = web3.utils;

contract("MultiSend test", async accounts => {
    it("test send", async () => {
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
});