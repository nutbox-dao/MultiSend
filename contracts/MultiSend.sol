// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MultiSend {
    using SafeMath for uint256;

    constructor() {}

    function multi_send_token(
        address token,
        address[] memory addresses,
        uint256[] memory amounts
    ) public payable returns (bool success) {
        uint256 total = 0;
        for (uint8 i = 0; i < amounts.length; i++) {
            total = total.add(amounts[i]);
        }
        if (token == address(0)) {
            require(total <= address(this).balance, "Allowance is not enough");
            for (uint256 j = 0; j < addresses.length; j++) {
                payable(addresses[j]).transfer(amounts[j]);
            }
        } else {
            // check if user has enough balance
            require(total <= IERC20(token).allowance(msg.sender, address(this)), "Allowance is not enough");
            // transfer token to addresses
            for (uint8 j = 0; j < addresses.length; j++) {
                IERC20(token).transferFrom(msg.sender, addresses[j], amounts[j]);
            }
        }
        return true;
    }

    function get_balance() public {
        address addr = address(this);
        if (addr.balance > 0) {
            payable(msg.sender).transfer(addr.balance);
        }
    }
}
