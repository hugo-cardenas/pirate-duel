import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Screen from '../screen/screen';
import TopMenu from '../top-menu/top-menu';
import commonStyle from '../style/common';

const images = {
    background: require('./img/background.png')
};

const styles = StyleSheet.create({
    title: {
        ...commonStyle.screenTitle
    },
    text: {
        ...commonStyle.infoText
    }
});

export default class Insults extends React.Component {
    render() {
        const { attacks, defenses, handleExit } = this.props;
        
        return <Screen backgroundImage={images.background}>
            <View>
                <TopMenu handleExit={handleExit}/>                
            </View>
            <ScrollView style={{height: '85%'}}>
                <Text style={styles.title}>Insults</Text>
                {attacks.length > 0 ? attacks.map(renderItem) : renderItem(' ')}
                <Text style={styles.title}>Responses</Text>
                {defenses.length > 0 ? defenses.map(renderItem) : renderItem(' ')}
            </ScrollView>
        </Screen>;
    }
}

const renderItem = item => <Text key={item} style={styles.text}>{item}</Text>;
