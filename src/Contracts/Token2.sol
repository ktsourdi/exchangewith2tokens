// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Token {
    string  public name = "Token2";
    string  public symbol = "TKN2";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );



    mapping(address => uint256) public balanceOf;


    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }


    receive() external payable {

    }
}