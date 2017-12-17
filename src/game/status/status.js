import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import _ from 'lodash';
import commonStyle from '../../style/common';

const guybrush = {
    name: 'YOU',
    color: commonStyle.text.color,
    img: require('./img/guybrush.png')
}
const heart = require('./img/heart.png');

const styles = {
    gameStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        borderColor: 'red',
        // borderWidth: 1
    },
    fighterStatus: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderColor: 'yellow',
        // borderWidth: 1
    },
    name: {
        ...commonStyle.text,
        // color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        height: 40,

        borderColor: 'white',
        // borderWidth: 1,

    },
    avatarContainer: {
        padding: 5,
        // paddingVertical: 10,
        // height: '100%',
        // width: '50%',

        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 5
    },
    active: {
        borderColor: 'rgba(255, 0, 0, 0.5)',
    },
    avatar: {
        width: 65,
        height: 65,
        resizeMode: 'contain'
    },
    lives: {
        paddingVertical: 10,
        minHeight: 40,
        flexDirection: 'row',
        justifyContent: 'center',

        borderColor: 'white',
        // borderWidth: 1
    },
    heart: {
        height: 20,
        width: 20,
        marginHorizontal: 2
    },
};

export default class Status extends Component {
    render() {
        const { pirate, isPlayerActive, playerLives, enemyLives } = this.props;
        return <View style={styles.gameStatus}>
            {this.renderCharacterStatus(guybrush, playerLives, isPlayerActive)}
            {this.renderCharacterStatus(pirate, enemyLives, !isPlayerActive)}
        </View>;
    }

    renderCharacterStatus(character, numLives, isActive) {
        return <View style={styles.fighterStatus}>
            {this.renderName(character.name, character.color)}
            {this.renderAvatar(character.img, isActive)}
            {this.renderLives(numLives)}
        </View>;
    }

    renderName(name, color) {
        return <Text style={styles.name}>{name}</Text>;
    }

    renderAvatar(src, isActive) {
        return <View style={styles.avatarContainer}>
            <Image source={src} style={styles.avatar}/>
        </View>;
    }

    renderLives(numLives) {
        return <View style={styles.lives}>
            {_.range(numLives).map(i => 
                <Image key={i} source={heart} style={styles.heart}/>)}
        </View>;
    }
}
