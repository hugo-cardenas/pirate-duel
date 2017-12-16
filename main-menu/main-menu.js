import React from 'react';
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
    container: {

        // backgroundColor: 'black',

    },
    menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    title: {
        marginTop: '45%',
        marginBottom: 40,
        resizeMode: 'contain',
        width: '95%'
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
        paddingHorizontal: 70,

        textAlign: 'center',

        textShadowOffset: { width: 0, height: 2 },

        // borderWidth: 1,
        borderColor: 'red'
    }
});

export default class MainMenu extends React.Component {
    static navigationOptions = {
        title: 'Main menu',
    };
    constructor() {
        super();
        this.state = {
            isFontLoaded: false,
        };
    }

    render() {
        return <Screen backgroundImage={images.background}>
            <View style={styles.menu}>
                {this.renderTitle()}
                {this.renderMenuList()}
            </View>
        </Screen>;
    }

    renderTitle() {
        return <Image source={images.title} style={styles.title}/>;
    }

    renderMenuList() {
        const { handleNewGame } = this.props;

        return <View style={styles.menuList}>
            <Text style={styles.item} onPress={handleNewGame}>New duel</Text>
            <Text style={styles.item}>Stats</Text>
            <Text style={styles.item}>Insults</Text>
        </View>;
    }
}
