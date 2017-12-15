import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%'
    },
    container: {
        // flex: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingTop: '45%',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }
});

export default class Screen extends React.Component {
    render() {
        const { backgroundImage, children } = this.props;
        return <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                {children}
            </View>
        </ImageBackground>;
    }
}
