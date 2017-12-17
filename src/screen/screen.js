import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        height: '100%',
        width: '100%'
    },
    container: {
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 20,
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
