import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Screen from '../screen/screen';
import TopMenu from '../top-menu/top-menu';
import commonStyle from '../style/common';

const images = {
    background: require('./img/background.jpg')
};

const styles = StyleSheet.create({
    title: {
        ...commonStyle.screenTitle
    },
    text: {
        ...commonStyle.infoText
    }
});

export default class Info extends React.Component {
    render() {
        const { handleExit } = this.props;

        return <Screen backgroundImage={images.background}>
            <View>
                <TopMenu handleExit={handleExit}/>
                <Text style={styles.title}>
                    What's this?
                </Text>
            </View>
            <ScrollView style={{height: '85%'}}>
                <Text style={styles.text}>
                    This is a minigame inspired by the epic insult sword fighting from the legendary
                    game The Secret of Monkey Island.
                </Text>
                <Text style={styles.text}>
                    The goal is to defeat other pirates by throwing ingenious shocking insults at the opponent,
                    while finding the correct responses to the opponent's insults.
                </Text>
                <Text style={styles.text}>
                    At the beginning of the game, you will only know a few insults, but the more pirates
                    you fight, the more insults and responses you will learn.
                </Text>
            </ScrollView>
        </Screen>;
    }
}
