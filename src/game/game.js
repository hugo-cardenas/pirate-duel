import React from 'react';
import { TouchableHighlight, Image, Text, View, ScrollView } from 'react-native';
import _ from 'lodash';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import Screen from '../screen/screen';
import Status from './status/status';
import TopMenu from '../top-menu/top-menu';
import SelectableList from '../selectable-list/selectable-list';
import { attacks, defenses, badDefenses, map } from './insults';
import commonStyle from '../style/common';

const images = {
    background: require('./img/fight-background.png')
};

const
    TURN_PLAYER = 'turn-player',
    TURN_ENEMY = 'turn-enemy';

const
    STATUS_ENEMY_THINKING_ATTACK = 'enemy-thinking-attack',
    STATUS_ENEMY_ATTACK = 'enemy-attack',
    STATUS_PLAYER_DEFENSE = 'player-defense',
    STATUS_PLAYER_CHOOSE = 'player-choose',
    STATUS_PLAYER_ATTACK = 'player-attack',
    STATUS_ENEMY_DEFENSE = 'enemy-defense',
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

        borderColor: 'green',
        // borderWidth: 1
    },

    attackList: {
        height: 375
    },
    defenseList: {
        height: 280
    },
    ellipsis: {
        textAlign: 'center'
    }
};

export default class Game extends React.Component {
    constructor(props) {
        super();
        this.state = {
            playerLives: 2,
            enemyLives: 1,
            turn: STATUS_ENEMY_THINKING_ATTACK,
            attack: null,
            defense: null,
            isDefenseSuccess: false
        };
        this.playerAttacks = props.attacks;
        this.playerDefenses = props.defenses;
        this.timeouts = [];
    }

    render() {
        return <Screen backgroundImage={images.background}>
            {this.renderTopMenu()}
            {this.renderGameStatus()}
            {this.renderDialogue()}
        </Screen>;
    }

    componentDidMount() {
        this.setTimeout(() => this.setNewEnemyAttack(), 3000);
    }

    componentWillUnmount() {
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];
    }

    renderTopMenu() {
        const { handleExit } = this.props;
        return <TopMenu handleExit={handleExit} />;
    }

    renderGameStatus() {
        const props = {
            playerLives: this.state.playerLives,
            enemyLives: this.state.enemyLives
        };
        return <Status {...props} />
    }

    renderDialogue() {
        switch (this.state.turn) {
            case STATUS_ENEMY_THINKING_ATTACK:
                return this.renderEnemyThinkingAttack();
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
            case STATUS_VICTORY:
                return this.renderFinish(true);
            case STATUS_DEFEAT:
                return this.renderFinish(false);
        }
    }

    renderEnemyThinkingAttack() {
        return <View style={styles.dialogueContainer}>
            {renderTitle('PIRATE:')}
            {renderEllipsis()}
        </View>;
    }

    renderEnemyAttack() {
        const { attack } = this.state;
        const { playerDefenses } = this;

        return <View style={styles.dialogueContainer}>
            {renderTitle('PIRATE:')}
            {renderLine(attack)}
            {renderTitle('CHOOSE YOUR REPLY:')}
            <SelectableList 
                items={playerDefenses} 
                style={{list: styles.defenseList}}
                handleSelect={defense => this.handleSelectDefense(defense)} />
        </View>;
    }

    renderPlayerDefense() {
        const { attack, defense, isDefenseSuccess } = this.state;

        return <View style={styles.dialogueContainer}>
            {renderTitle('PIRATE:')}
            {renderLine(attack)}
            {renderTitle('YOU:')}
            {renderLine(defense)}
            {renderTitle(isDefenseSuccess ? 'YOU WIN THIS ROUND' : 'THE PIRATE WINS THIS ROUND')}
        </View>;
    }

    renderPlayerChoose() {
        const { playerAttacks } = this;

        return <View style={styles.dialogueContainer}>
            {renderTitle('CHOOSE YOUR INSULT:')}
            <SelectableList 
                items={playerAttacks} 
                style={{list: styles.attackList}}
                handleSelect={attack => this.handleSelectAttack(attack)} />
        </View>;
    }

    renderPlayerAttack() {
        const { attack } = this.state;

        return <View style={styles.dialogueContainer}>
            {renderTitle('YOU:')}
            {renderLine(attack)}
            {renderTitle('PIRATE:')}
            {renderEllipsis()}
        </View>;
    }

    renderEnemyDefense() {
        const { attack, defense, isDefenseSuccess } = this.state;

        return <View style={styles.dialogueContainer}>
            {renderTitle('YOU:')}
            {renderLine(attack)}
            {renderTitle('PIRATE:')}
            {renderLine(defense)}
            {renderTitle(isDefenseSuccess ? 'THE PIRATE WINS THIS ROUND' : 'YOU WIN THIS ROUND')}
        </View>;
    }

    renderFinish(isVictory) {
        return <View style={styles.dialogueContainer}>
            {renderTitle(isVictory ? 'VICTORY!' : 'DEFEAT')}
            <Text 
                style={[styles.dialogueTitle, styles.dialogueText]}
                onPress={() => this.handleFinish()}>
                Return to main menu
            </Text>
        </View>;
    }

    handleSelectDefense(defense)  {
        const { attack } = this.state;
        const isPlayerVictory = this.isPlayerVictory(STATUS_PLAYER_DEFENSE, attack, defense);
        const lives = this.getLivesNextState(isPlayerVictory);

        this.setState({ 
            turn: STATUS_PLAYER_DEFENSE,
            defense,
            ...lives,
            isDefenseSuccess: isPlayerVictory 
        });

        if (lives.playerLives === 0) {
            this.setTimeout(() => this.setDefeat(), 3000);
        } else if (lives.enemyLives === 0) {
            this.setTimeout(() => this.setVictory(), 3000);
        } else {
            this.setTimeout(() => this.setPlayerChoose(), 3000);
        }        
    }

    handleSelectAttack(attack) {
        this.setState({ turn: STATUS_PLAYER_ATTACK, attack });

        this.setTimeout(() => {
            this.setEnemyDefense(attack);

            this.setTimeout(() => {
                this.setEnemyThinkingAttack();
                this.setTimeout(() => this.setNewEnemyAttack(), 3000);
            }, 3000);
        }, 3000);
    }

    handleFinish() {
        const { handleFinish } = this.props;
        const { status } = this.state;
        const { playerAttacks, playerDefenses } = this;
        
        handleFinish({ 
            isVictory: status === STATUS_VICTORY,
            attacks: playerAttacks,
            defenses: playerDefenses
        });
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

    getLivesNextState(isPlayerVictory) {
        const { playerLives, enemyLives } = this.state;
        return {
            playerLives: isPlayerVictory ? playerLives : playerLives - 1,
            enemyLives: isPlayerVictory ? enemyLives - 1 : enemyLives
        }
    }

    isPlayerVictory(turn, attack, defense) {
        if (turn === STATUS_PLAYER_DEFENSE) {
            return isDefenseSuccess(attack, defense);
        } else {
            return !isDefenseSuccess(attack, defense);
        }
    }

    decrementPlayerLives() {
        this.setState({ playerLives: this.state.playerLives - 1 });
    }

    decrementEnemyLives() {
        this.setState({ enemyLives: this.state.enemyLives - 1 });
    }

    setPlayerChoose() {
        this.setState({
            turn: STATUS_PLAYER_CHOOSE,
            attack: null,
            defense: null
        });
    }

    setEnemyThinkingAttack() {
        this.setState({
            turn: STATUS_ENEMY_THINKING_ATTACK,
            attack: null,
            defense: null
        });
    }

    setEnemyDefense(attack) {
        const defense = _.random(1, 5) >= 3 ? map[attack] : _.sample(badDefenses);
        this.playerDefenses = _.uniq([...this.playerDefenses, defense]);
        this.resolveFight(STATUS_PLAYER_ATTACK, attack, defense);
        this.setState({ turn: STATUS_ENEMY_DEFENSE, defense });
    }

    setNewEnemyAttack() {
        const attack = _.sample(attacks);
        this.playerAttacks = _.uniq([...this.playerAttacks, attack]);
        this.setState({
            turn: STATUS_ENEMY_ATTACK,
            attack,
            defense: null
        });
    }

    setVictory(){
        this.setState({ turn: STATUS_VICTORY });
    }

    setDefeat(){
        this.setState({ turn: STATUS_DEFEAT });
    }

    setTimeout(func, time) {
        this.timeouts.push(setTimeout(func, time));
    }
}

const isDefenseSuccess = (attack, defense) => map[attack] === defense;

const renderTitle = text =>
    <Text style={[styles.dialogueTitle, styles.dialogueText]}>{text}</Text>;

const renderLine = text =>
    <Text style={styles.dialogueText}>{text}</Text>;

const renderEllipsis = () =>
    <AnimatedEllipsis style={[styles.dialogueText, styles.ellipsis]}/>;
