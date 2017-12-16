import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import _ from 'lodash';

const styles = {
    text: {
        color: '#b143a8',
        fontFamily: 'monkey-island',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',

        textShadowColor: 'black',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 0,

        borderColor: 'black',
        borderWidth: 1
    }
}

export default class SelectableList extends Component {
    render() {
        const { items, handleSelect } = this.props;
        const propStyle = this.props.style || {};

        return <ScrollView style={propStyle.list}>
            {items.map(item => 
                <Text 
                    key={item} 
                    style={[styles.text, propStyle.text]} 
                    onPress={() => handleSelect(item)}>{item}</Text>)}
        </ScrollView>;
    }
}
