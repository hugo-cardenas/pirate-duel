const style = {
    text: {
        color: '#b143a8',
        fontFamily: 'monkey-island',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 0
    }
};

style.screenTitle = {
    ...style.text,
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 2 }
};

style.infoText = {
    ...style.text,
    fontSize: 15,
    lineHeight: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 15
};

export default style;
