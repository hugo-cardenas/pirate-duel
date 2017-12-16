import React, { Component } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import _ from 'lodash';
import Screen from '../screen/screen';
import { attacks, defenses, map } from './insults';

const styles = {
    gameStatus: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        marginBottom: 20,

        borderColor: 'red',
        borderWidth: 1,

        backgroundColor: 'black'
    },
    fighterStatus: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

        borderColor: 'black',
        borderWidth: 1
    },
    fighterText: {
        color: 'white',
        fontFamily: 'monkey-island',
        textAlign: 'center',

        borderColor: 'black',
        borderWidth: 1
    },
    avatar: {
        flex: 1,
        height: 75,
        width: 75
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
    render() {
        const { ownLives, enemyLives } = this.props;
        return <View style={styles.gameStatus}>
            {this.renderFighterStatus('YOU', require('./guybrush.png'), ownLives)}
            {this.renderFighterStatus('PIRATE', require('./pirate1.png'), enemyLives)}
        </View>;
    }

    renderFighterStatus(name, avatarSrc, lives) {
        return <View style={styles.fighterStatus}>
            <Text style={styles.fighterText}>{name}</Text>
            {this.renderAvatar(avatarSrc)}
            <View style={styles.lives}>
                {_.range(lives).map(() => this.renderHeart())}
            </View>
            
        </View>;
    }

    renderAvatar(src) {
        return <Image source={src} style={styles.avatar}/>;
    }

    renderHeart() {
        return <Image source={require('./heart.png')} style={styles.heart}/>;
    }
}
