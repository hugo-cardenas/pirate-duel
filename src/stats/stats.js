import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Screen from '../screen/screen';
import TopMenu from '../top-menu/top-menu';
import commonStyle from '../style/common';

const images = {
    background: require('./img/background.gif')
};

const styles = StyleSheet.create({
    title: {
        ...commonStyle.screenTitle
    },
    text: {
        ...commonStyle.infoText
    }
});

export default class Stats extends React.Component {
    render() {
        const { handleExit, numDefeats, numVictories } = this.props;

        return <Screen backgroundImage={images.background}>
            <View>
                <TopMenu handleExit={handleExit}/>
                <Text style={styles.title}>
                    Stats
                </Text>
                <Text style={styles.text}>
                    Duels won: {numVictories}
                </Text>
                <Text style={styles.text}>
                    Duels lost: {numDefeats}
                </Text>
            </View>
        </Screen>;
    }
}
