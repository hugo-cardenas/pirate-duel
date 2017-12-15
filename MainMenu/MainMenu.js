import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Font } from 'expo';

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
        flex: 1,
        // backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '45%',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    title: {
        resizeMode: 'contain',
        width: '95%'
    },
    menu: {
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

    async componentDidMount() {
        await Font.loadAsync({
            'monkey-island': require('../assets/fonts/mifont/MonkeyIsland-1990.ttf'),
        });
        this.setState({ isFontLoaded: true })
    }

    render() {
        const { navigate } = this.props.navigation;
        
        if (!this.state.isFontLoaded) {
            return null;
        }

        return <ImageBackground source={require('./background.png')} style={styles.background}>
            <View style={styles.container}>
                {this.renderTitle()}
                {this.renderMenu()}
            </View>
        </ImageBackground>;
    }

    renderTitle() {
        return <Image source={require('./Pirate-Duel.png')} style={styles.title}/>;
    }

    renderMenu() {
        return <View style={styles.menu}>
            {this.renderMenuItem('New game')}
            {this.renderMenuItem('Stats')}
            {this.renderMenuItem('Insults')}
        </View>;
    }

    renderMenuItem(text) {
        return <Text style={styles.menuItem}>{text}</Text>;
    }
}
