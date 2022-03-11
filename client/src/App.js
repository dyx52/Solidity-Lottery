import React, {Component} from "react";
import WelfareLottery from "./contracts/WelfareLottery.json";
import getWeb3 from "./getWeb3";
import CardExampleCard from "./display/ui";
import "./App.css";

class App extends Component {
    constructor() {
        super()
        this.state = {
            web3: null,
            instance: null,
            manager: '',
            winner: '',
            players: '',
            round: 0,
            balance: 0,
            currentAccount: '',
            isDisabled: false,
            playersAcount: 0,
            isDisplay: 'inline',
        }
    }

    // 内置钩子函数，在页面渲染之后自动调用
    componentDidMount() {

    }

    // 内置钩子函数，在页面渲染之前调用
    async componentWillMount() {
        // 获取web3.
        const web3 = await getWeb3();
        // 获取账户
        // Get the contract instance.
        const account = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        console.log(networkId)
        const deployedNetwork = WelfareLottery.networks[networkId];

        const instance = new web3.eth.Contract(
            WelfareLottery.abi,
            deployedNetwork && deployedNetwork.address,
        );

        // Get the value from the contract to prove it worked.
        const manager = await instance.methods.mannager().call();
        const winner = await instance.methods.winner().call();
        const players = await instance.methods.getPlayers().call();
        const round = await instance.methods.round().call();
        const balanceWei = await instance.methods.getBalance().call();
        const playersAcount = await instance.methods.getPlayersLenth().call();
        // wei 单位转换为 ether 单位
        const balance = web3.utils.fromWei(balanceWei, 'ether');
        const isDisplay = account[0] === manager ? 'inline' : 'none';
        // Update state with the result.
        this.setState({
            web3,
            instance,
            manager,
            winner,
            players,
            round,
            playersAcount,
            balance,
            currentAccount: account[0],
            isDisplay,
        });
    };

    play = async () => {
        this.setState({isDisabled: true})
        try {
            await this.state.instance.methods.play().send({
                from: this.state.currentAccount,
                value: this.state.web3.utils.toWei('1', 'ether'),
                gas: '3000000'
            })
            this.setState({isDisabled: false})
            window.location.reload(true)
            alert("投资成功！")
        } catch (e) {
            console.log(e)
            this.setState({isDisabled: false})

            alert("投资失败！")
        }
    };

    kaijiang = async () => {
        this.setState({isDisabled: true})
        try {
            await this.state.instance.methods.kaijiang().send({
                from: this.state.currentAccount,
            })
            this.setState({isDisabled: false})

            alert("开奖成功！")
        } catch (e) {
            console.log(e)
            this.setState({isDisabled: false})

            alert("开奖失败！")
        }
    };

    render() {
        return (
            <div align='center'>
                <CardExampleCard
                    manager={this.state.manager}
                    winner={this.state.winner}
                    players={this.state.players}
                    round={this.state.round}
                    balance={this.state.balance}
                    currentAccount={this.state.currentAccount}
                    playersAcount={this.state.playersAcount}
                    play={this.play}
                    kaijiang = {this.kaijiang}
                    isDisabled = {this.state.isDisabled}
                    isDisplay = {this.state.isDisplay}
                />

            </div>

        );
    }
}

export default App;
// <p>The stored value is: {this.state.manager}</p>
// <p>The winner value is: {this.state.winner}</p>
// <p>The players value is: {this.state.players}</p>
// <p>The round value is: {this.state.round}</p>
// <p>The balance value is: {this.state.balance}</p>