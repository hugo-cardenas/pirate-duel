import React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import _ from 'lodash';
import Screen from '../screen/screen';
import Status from './status';
import { attacks, defenses, map } from './insults';

const
    TURN_PLAYER = 'turn-player',
    TURN_ENEMY = 'turn-enemy';

const styles = {
    dialogueContainer: {
        borderColor: 'blue',
        borderWidth: 1,
    },
    dialogueTitle: {
        textAlign: 'center'
    },
    dialogueText: {
        // flex: 1,
        fontFamily: 'monkey-island',
        marginBottom: 20,
    }
};

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            ownLives: 4,
            enemyLives: 4,
            turn: TURN_ENEMY,
            playerResponse: null,
            enemyResponse: null
        };
        this.attacks = [];
        this.defenses = [
            defenses.DEFENSE_RUBBER,
            defenses.DEFENSE_YEAH,
            defenses.DEFENSE_SHAKING,
            defenses.DEFENSE_GIVEUP
        ];
    }
    render() {
        return <Screen>
            {this.renderGameStatus()}
            {this.renderDialogue()}
        </Screen>;
    }

    renderGameStatus(){
        const props = {
            ownLives: this.state.ownLives,
            enemyLives: this.state.enemyLives
        };
        return <Status {...props} />
    }

    renderDialogue() {
        if (this.state.turn === TURN_ENEMY) {
            return this.renderEnemyTurn();
        }
        return this.renderPlayerTurn();
    }

    renderEnemyTurn() {
        const values = Object.values(attacks);
        const attack = values[rand(0, values.length - 1)];
        const { defenses } = this;

        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>PIRATE:</Text>
            <Text style={styles.dialogueText}>{attack}</Text>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>CHOOSE YOUR REPLY:</Text>
            <ScrollView>
                {defenses.map(defense => 
                    <Text 
                        key={defense}
                        style={styles.dialogueText}
                        onPress={() => this.resolveTurn(TURN_ENEMY, attack, defense)}>
                        - {defense}
                    </Text>)}
            </ScrollView>
        </View>;
    }

    renderPlayerTurn() {
        // const values = Object.values(attacks);
        // const attack = Object.values(attacks)[rand(0, values.length - 1)];
        const { attacks } = this;
        const { enemyResponse } = this.state;

        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>CHOOSE YOUR INSULT:</Text>
            {attacks.map(attack => 
                <Text 
                    style={styles.dialogueText}
                    onPress={() => this.resolveTurn(TURN_PLAYER, attack, map[attack])}>
                    - {attack}
                </Text>)}
            {enemyResponse ? 
                <View>
                    <Text style={[styles.dialogueTitle, styles.dialogueText]}>PIRATE:</Text>
                    <Text style={[styles.dialogueText]}>{enemyResponse}</Text>
                </View>
                : null}
        </View>;
    }

    

    resolveTurn(turn, attack, defense) {
        if (turn === TURN_ENEMY) {
            this.attacks = _.uniq([...this.attacks, attack]);
            if (isDefenseSuccess(attack, defense)) {
                this.decrementEnemyLives();
            } else {
                this.decrementPlayerLives();
            }
            this.setState({ turn: TURN_PLAYER });
        } else {
            this.setState({ enemyResponse: defense });
            setTimeout(() => {
                this.setState({ enemyResponse: null });
                this.defenses = _.uniq([...this.defenses, defense]);
                if (isDefenseSuccess(attack, defense)) {
                    this.decrementPlayerLives();
                } else {
                    this.decrementEnemyLives();
                }
                this.setState({ turn: TURN_ENEMY });
            }, 4000);
        }
    }

    decrementPlayerLives() {
        this.setState({ ownLives: this.state.ownLives - 1 });
    }

    decrementEnemyLives() {
        this.setState({ enemyLives: this.state.enemyLives - 1 });
    }
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const isDefenseSuccess = (attack, defense) => map[attack] === defense;
