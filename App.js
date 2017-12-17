import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Font } from 'expo';
import MainMenu from './src/main-menu/main-menu';
import Game from './src/game/game';
import Stats from './src/stats/stats';
import Insults from './src/insults/insults';
import Info from './src/info/info';
import Screen from './src/screen/screen';
import commonStyle from './src/style/common';
import { attacks, badDefenses } from './src/game/insults';

const font = require('./src/style/fonts/mifont/MonkeyIsland-1990.ttf');

const
    STATUS_MAIN_MENU = 'main-menu',
    STATUS_GAME = 'game',
    STATUS_STATS = 'stats',
    STATUS_INSULTS = 'insults',
    STATUS_INFO = 'info';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isFontLoaded: false,
            status: STATUS_MAIN_MENU,
            attacks: [
                attacks.ATTACK_FARMER,
                attacks.ATTACK_END
            ],
            defenses: Object.values(badDefenses),
            numVictories: 0,
            numDefeats: 0
        };
        this.handleExit = this.handleExit.bind(this);
        this.handleFinishGame = this.handleFinishGame.bind(this);
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
            case STATUS_STATS:
                return this.renderStats();
            case STATUS_INSULTS:
                return this.renderInsults();
            case STATUS_INFO:
                return this.renderInfo();
            case STATUS_MAIN_MENU:
            default:
                return this.renderMainMenu();
        }
    }

    renderGame() {
        const props = {
            attacks: [...this.state.attacks],
            defenses: [...this.state.defenses],
            handleExit: this.handleExit,
            handleFinish: this.handleFinishGame
        };
        return <Game {...props} />;
    }

    renderStats() {
        const props = {
            handleExit: this.handleExit,
            numDefeats: this.state.numDefeats,
            numVictories: this.state.numVictories
        };
        return <Stats {...props} />;
    }

    renderInsults() {
        const props = {
            attacks: this.state.attacks,
            defenses: this.state.defenses,
            handleExit: this.handleExit
        };
        return <Insults {...props} />;
    }

    renderInfo() {
        const props = { handleExit: this.handleExit };
        return <Info {...props} />;
    }

    renderMainMenu() {
        const props = {
            handleNewGame: () => this.setState({ status: STATUS_GAME }),
            handleStats: () => this.setState({ status: STATUS_STATS }),
            handleInsults: () => this.setState({ status: STATUS_INSULTS }),
            handleInfo: () => this.setState({ status: STATUS_INFO })
        }
        return <MainMenu {...props} />;
    }

    handleExit() {
        this.setState({ status: STATUS_MAIN_MENU });
    }

    handleFinishGame({ isVictory, attacks, defenses }) {
        const { numVictories, numDefeats } = this.state;
        this.setState({
            status: STATUS_MAIN_MENU,
            numVictories: isVictory ? numVictories + 1 : numVictories,
            numDefeats: !isVictory ? numDefeats + 1 : numDefeats,
            attacks,
            defenses
        });
    }

}
