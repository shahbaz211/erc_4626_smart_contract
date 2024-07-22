// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}