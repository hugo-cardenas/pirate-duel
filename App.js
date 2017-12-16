import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Font } from 'expo';
import Game from './game/game';
import MainMenu from './main-menu/main-menu';
import Screen from './screen/screen';
import commonStyle from './style/common';

const font = require('./assets/fonts/mifont/MonkeyIsland-1990.ttf');

const
    STATUS_MAIN_MENU = 'main-menu',
    STATUS_GAME = 'game';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isFontLoaded: false,
            status: STATUS_GAME,
            attacks: [],
            defenses: []
        };
    }

    async componentDidMount() {
        await Font.loadAsync({ 'monkey-island': font });
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

    renderGame() {
        const props = {
            attacks: this.state.attacks,
            defenses: this.state.defenses,
            setAttacks: attacks => this.setState({ attacks }),
            setDefenses: attacks => this.setState({ defenses }),
            handleGoToMainMenu: () => this.setState({ status: STATUS_MAIN_MENU })
        };
        return <Game {...props} />;
    }

    renderMainMenu() {
        const props = {
            handleNewGame: () => this.setState({ status: STATUS_GAME })
        }
        return <MainMenu {...props} />;
    }
}
