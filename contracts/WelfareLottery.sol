// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract WelfareLottery {
    // 状态变量
    address payable public mannager;  //管理员
    address payable public winner;  // 中奖玩家
    address[] public players;  // 所有玩家
    uint256 public round;  // 开奖次数

    // 构造函数
    constructor() {
        mannager = payable(msg.sender);   // 设置彩票站管理员
    }

    // 投注
    function play() public payable {
        assert(msg.value == 1 ether);   // 每次投资必须是 1 eth
        players.push(msg.sender);
    }


    // 开奖函数
    function kaijiang() public {
        assert(msg.sender == mannager);
        // 通过 区块当前时间撮、当前区块难度、当前玩家数量生成一个hash，再将这个hash 强转成 uint256，对 玩家数量求余 ==> 随机一个中奖玩家
        bytes memory v1 = abi.encodePacked(block.timestamp, block.difficulty, players.length);
        bytes32 v2 =  keccak256(v1);
        uint256 v3 = uint256(v2);
        uint256 index = v3 % players.length;

        // 中奖玩家
        winner = payable(players[index]);

        // 中奖玩家获得当前合约余额的90%
        // 彩票站管理员获得剩余的10%
        uint256 money1 = address(this).balance * 90 / 100;
        uint256 money2 = address(this).balance - money1;
        winner.transfer(money1);
        mannager.transfer(money2);

        round++;
        delete players;
    }

    // 获取所有玩家地址
    function getPlayers() public view returns(address[] memory){
        return players;
    }

    function getPlayersLenth() public view returns(uint256){
        return players.length;
    }

    // 获取合约账户余额
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

}