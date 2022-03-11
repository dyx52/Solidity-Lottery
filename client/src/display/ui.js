import React from 'react'
import { Card, Icon, Image, Segment, Statistic, Button } from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/log.jpeg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>梦想福利彩票</Card.Header>
            <Card.Meta>
                <p>管理员地址：{props.manager}</p>
                <p>当前地址: {props.currentAccount}</p>
            </Card.Meta>
            <Card.Description>
                每晚八点准时开奖.
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.playersAcount}人参与
            </a>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance} ETH </Statistic.Value>
                <Statistic.Label>奖池金</Statistic.Label>
            </Statistic>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='yellow'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href='https://ropsten.etherscan.io/address/0xc57d6c015d9955e4d0a64646573a7d0ae3afb004'>点击我查看历史</a>
            </Statistic>
        </Card.Content>
            <Button animated='fade' color='blue' x onClick={props.play} disabled={props.isDisabled}>
                <Button.Content visible>投注</Button.Content>
                <Button.Content hidden>投注</Button.Content>
            </Button>
            <Button animated='fade' color='red'  onClick={props.kaijiang}  disabled={props.isDisabled} style = {{display: props.isDisplay}} >
                <Button.Content visible>开奖</Button.Content>
                <Button.Content hidden>开奖</Button.Content>
            </Button>

    </Card>
)

export default CardExampleCard