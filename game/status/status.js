import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import _ from 'lodash';
import commonStyle from '../../style/common';

const guybrush = require('./img/guybrush.png');
const pirates = [
    require('./img/pirate1.png'),
    require('./img/pirate2.png'),
    require('./img/pirate3.png')
];
const heart = require('./img/heart.png');

const styles = {
    gameStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        marginBottom: 20,

        borderColor: 'red',
        borderWidth: 1
    },
    fighterStatus: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderColor: 'black',
        borderWidth: 1
    },
    text: {
        ...commonStyle.text,
        flex: 1,
        color: 'white',
        textAlign: 'center',

        borderColor: 'black',
        borderWidth: 1
    },
    avatar: {
        flex: 4,
        resizeMode: 'contain',
        height: '100%',
        width: '100%',

        borderColor: 'blue',
        borderWidth: 1
    },
    lives: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    heart: {
        height: 20,
        width: 20,
        marginHorizontal: 2
    },
};

export default class Status extends Component {
    constructor() {
        super();
        this.pirate = _.sample(pirates);
    }

    render() {
        const { ownLives, enemyLives } = this.props;
        return <View style={styles.gameStatus}>
            {this.renderFighterStatus('YOU', guybrush, ownLives)}
            {this.renderFighterStatus('PIRATE', this.pirate , enemyLives)}
        </View>;
    }

    renderFighterStatus(name, avatarSrc, numLives) {
        return <View style={styles.fighterStatus}>
            {this.renderName(name)}
            {this.renderAvatar(avatarSrc)}
            {this.renderLives(numLives)}
        </View>;
    }

    renderName(name) {
        return <Text style={styles.text}>{name}</Text>;
    }

    renderAvatar(src) {
        return <Image source={src} style={styles.avatar}/>;
    }

    renderLives(numLives) {
        return <View style={styles.lives}>
            {_.range(numLives).map(i => 
                <Image key={i} source={heart} style={styles.heart}/>)}
        </View>;
    }
}
