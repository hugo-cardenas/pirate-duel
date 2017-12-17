import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import commonStyle from '../style/common';

const styles = {
    menu: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,

        borderColor: 'green',
        // borderWidth: 1,
    },
    exit: {
        ...commonStyle.text,
        paddingLeft: 12,
        paddingRight: 10,
        paddingVertical: 5,
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',

        borderColor: 'green',
        // borderWidth: 1,

    }
};

export default class TopMenu extends Component {
    render() {
        const { handleExit } = this.props;
        return <View style={styles.menu}>
            <TouchableHighlight onPress={handleExit}>
                <Text style={styles.exit}>X</Text>
            </TouchableHighlight>
        </View>
    }
}
