import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Font } from 'expo';
import Screen from '../screen/screen';
import commonStyle from '../style/common';

const images = {
    title: require('./img/pirate-duel.png'),
    background: require('./img/background.png')
};

const
    STATUS_MAIN_MENU = 'main-menu',
    STATUS_GAME = 'game';


const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,1)'
    },
    menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    title: {
        // ...commonStyle.text,
        // fontSize: 35,
        marginTop: '35%',
        marginBottom: 40,
        resizeMode: 'contain',
        width: '95%',
        // borderColor: 'red',
        // borderWidth: 1,
    },
    list: {
        marginTop: 60,
    },
    item: {
        ...commonStyle.text,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,

        paddingVertical: 25,
        paddingHorizontal: 30,

        textAlign: 'center',

        textShadowOffset: { width: 0, height: 2 },

        borderColor: 'red'
        // borderWidth: 1,
    }
});

export default class MainMenu extends Component {
    render() {
        return <Screen backgroundImage={images.background}>
            <View style={styles.menu}>
                {renderTitle()}
                {this.renderMenuList()}
            </View>
        </Screen>;
    }

    renderMenuList() {
        const { handleNewGame, handleStats, handleInsults, handleInfo } = this.props;

        return <View style={styles.menuList}>
            {renderItem(handleNewGame, 'New duel')}
            {renderItem(handleStats, 'Stats')}
            {renderItem(handleInsults, 'Insults')}
            {renderItem(handleInfo, 'What\'s this?')}
        </View>;
    }
}

const renderTitle = () =>
    // <Text style={styles.title}>Pirate Duel</Text>;
    <Image source={images.title} style={styles.title} />;

const renderItem = (onPress, text) => 
    <Text style={styles.item} onPress={onPress}>{text}</Text>;
