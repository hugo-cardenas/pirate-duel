import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Font } from 'expo';
import Game from './Game/Game';
import Screen from './Screen/Screen';

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
        resizeMode: 'contain',
        width: '95%'
    },
    menuList: {
        marginTop: 60,
    },
    menuItem: {
        color: '#b143a8',
        fontFamily: 'monkey-island',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center'
    },

    item: {
        // color: ''
    }
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isFontLoaded: false,
            status: STATUS_MAIN_MENU
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'monkey-island': require('./assets/fonts/mifont/MonkeyIsland-1990.ttf'),
        });
        this.setState({ isFontLoaded: true })
    }

    render() {
        if (!this.state.isFontLoaded) {
            return null;
        }
        switch (this.state.status) {
            case STATUS_GAME:
                return this.renderGame();
            case STATUS_MAIN_MENU:
            default:
                return this.renderMainMenu();
        }
    }

    renderMainMenu() {
        return <Screen backgroundImage={require('./background.png')}>
            {this.renderTitle()}
            {this.renderMenuList()}
        </Screen>;
    }

    renderTitle() {
        return <Image source={require('./Pirate-Duel.png')} style={styles.title}/>;
    }

    renderMenuList() {
        return <View style={styles.menuList}>
            <Text style={styles.menuItem} onPress={() => this.setState({ status:STATUS_GAME })}>New game</Text>
            <Text style={styles.menuItem}>Stats</Text>
            <Text style={styles.menuItem}>Insults</Text>
        </View>;
    }


    renderGame() {
        return <Game />;
    }
}
