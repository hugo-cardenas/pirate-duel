import React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import _ from 'lodash';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import Screen from '../screen/screen';
import Status from './status/status';
import SelectableList from '../selectable-list/selectable-list';
import { attacks, defenses, badDefenses, map } from './insults';
import commonStyle from '../style/common';

const
    TURN_PLAYER = 'turn-player',
    TURN_ENEMY = 'turn-enemy';

const
    STATUS_ENEMY_ATTACK = 'enemy-attack',
    STATUS_PLAYER_DEFENSE = 'player-defense',
    STATUS_PLAYER_CHOOSE = 'player-choose',
    STATUS_PLAYER_ATTACK = 'player-attack',
    STATUS_ENEMY_DEFENSE = 'enemy-defense'
    STATUS_VICTORY = 'victory'
    STATUS_DEFEAT = 'defeat';

const styles = {
    dialogueContainer: {
        borderColor: 'blue',
        // borderWidth: 1,
    },
    dialogueTitle: {
        textAlign: 'center'
    },
    dialogueText: {
        ...commonStyle.text,

        paddingHorizontal: 10,
        paddingVertical: 15,

        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 0,

        borderColor: 'green',
        // borderWidth: 1
    },
    ellipsis: {
        textAlign: 'center'
    }
};

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            ownLives: 4,
            enemyLives: 4,
            turn: STATUS_ENEMY_ATTACK,
            attack: _.sample(attacks),
            defense: null
        };
        this.playerAttacks = Object.values(attacks);
        this.playerDefenses = Object.values(defenses);
    }
    render() {
        return <Screen backgroundImage={require('./img/fight-background.png')}>
            {this.renderGameStatus()}
            {this.renderDialogue()}
        </Screen>;
    }

    renderGameStatus() {
        const props = {
            ownLives: this.state.ownLives,
            enemyLives: this.state.enemyLives
        };
        return <Status {...props} />
    }

    renderDialogue() {
        const { ownLives, enemyLives } = this.state;
        if (ownLives === 0) {
            return this.renderFinish(false);
        }
        if (enemyLives === 0) {
            return this.renderFinish(true);
        }

        switch (this.state.turn) {
            case STATUS_ENEMY_ATTACK:
                return this.renderEnemyAttack();
            case STATUS_PLAYER_DEFENSE:
                return this.renderPlayerDefense();
            case STATUS_PLAYER_CHOOSE:
                return this.renderPlayerChoose();
            case STATUS_PLAYER_ATTACK:
                return this.renderPlayerAttack();
            case STATUS_ENEMY_DEFENSE:
                return this.renderEnemyDefense();
        }
    }

    renderEnemyAttack() {
        const { attack } = this.state;
        const { playerDefenses } = this;

        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>PIRATE:</Text>
            <Text style={styles.dialogueText}>{attack}</Text>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>CHOOSE YOUR REPLY:</Text>
            <SelectableList items={playerDefenses} handleSelect={defense => this.handleSelectDefense(defense)} />
        </View>;
    }

    renderPlayerDefense() {
        const { attack, defense } = this.state;

        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>PIRATE:</Text>
            <Text style={styles.dialogueText}>{attack}</Text>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>YOU:</Text>
            <Text style={styles.dialogueText}>{defense}</Text>
        </View>;
    }

    renderPlayerChoose() {
        const { playerAttacks } = this;

        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>CHOOSE YOUR INSULT:</Text>
            <SelectableList items={playerAttacks} handleSelect={attack => this.handleSelectAttack(attack)} />
        </View>;
    }

    renderPlayerAttack() {
        const { attack } = this.state;

        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>YOU:</Text>
            <Text style={styles.dialogueText}>{attack}</Text>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>PIRATE:</Text>
            <AnimatedEllipsis style={[styles.dialogueText, styles.ellipsis]}/>
        </View>;
    }

    renderEnemyDefense() {
        const { attack, defense } = this.state;

        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>YOU:</Text>
            <Text style={styles.dialogueText}>{attack}</Text>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>PIRATE:</Text>
            <Text style={styles.dialogueText}>{defense}</Text>
        </View>;
    }

    renderEnemyTurn() {
        const attack = _.sample(attacks);
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
                        onPress={() => this.handleResponse()}>
                        - {defense}
                    </Text>)}
            </ScrollView>
        </View>;
    }

    renderFinish(isVictory){
        return <View style={styles.dialogueContainer}>
            <Text style={[styles.dialogueTitle, styles.dialogueText]}>
                {isVictory ? 'VICTORY!' : 'DEFEAT'}
            </Text>
            <Text 
                style={[styles.dialogueTitle, styles.dialogueText]}
                onPress={this.props.handleGoToMainMenu}>
                Return to main menu
            </Text>
        </View>;
    }

    handleSelectDefense(defense)  {
        const { attack } = this.state;
        this.setState({ turn: STATUS_PLAYER_DEFENSE, defense });
        this.resolveFight(STATUS_PLAYER_DEFENSE, attack, defense);
        setTimeout(() => {
            this.setState({
                turn: STATUS_PLAYER_CHOOSE,
                attack: null,
                defense: null
            });
        }, 2000);
    }

    handleSelectAttack(attack) {
        this.setState({ turn: STATUS_PLAYER_ATTACK, attack });
        setTimeout(() => {
            const defense = _.random(0, 1) === 0 ? map[attack] : _.sample(defenses);
            this.resolveFight(STATUS_PLAYER_ATTACK, attack, defense);
            this.setState({ turn: STATUS_ENEMY_DEFENSE, defense });

            setTimeout(() => {
                this.setState({ 
                    turn: STATUS_ENEMY_ATTACK,
                    attack: _.sample(attacks),
                    defense: null
                });
            }, 2000);

        }, 1000);
    }

    resolveFight(turn, attack, defense) {
        if (turn === STATUS_PLAYER_DEFENSE) {
            if (isDefenseSuccess(attack, defense)) {
                this.decrementEnemyLives();
            } else {
                this.decrementPlayerLives();
            }
        } else {
            if (isDefenseSuccess(attack, defense)) {
                this.decrementPlayerLives();
            } else {
                this.decrementEnemyLives();
            }
        }
    }

    decrementPlayerLives() {
        this.setState({ ownLives: this.state.ownLives - 1 });
    }

    decrementEnemyLives() {
        this.setState({ enemyLives: this.state.enemyLives - 1 });
    }
}

const isDefenseSuccess = (attack, defense) => map[attack] === defense;
