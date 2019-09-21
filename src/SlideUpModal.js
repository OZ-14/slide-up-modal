import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Easing
} from 'react-native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEFAULT_HEIGHT = 100;
const ANIMATE_THRESHOLD = 75;

export default class SlideUpModal extends Component {
  constructor(props) {
    super(props);
    this.startTop = props.parentHeight - props.childrenStartHeight
    this.state = {
      modalTop: new Animated.Value(this.startTop),
      scrollEnabled: false
    }
    this.panResponder = null;
    this.setupPanResponder();
  }


  setupPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (this.state.scrollEnabled) {
          return
        }
        this.state.modalTop.setValue(gestureState.moveY)

      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.scrollEnabled) {
          return
        }

        if (-gestureState.dy > ANIMATE_THRESHOLD) {
          //画面にモーダルが広がるAnimation
          this.setState({scrollEnabled: true});
          Animated.timing(this.state.modalTop, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.sin)
          }).start()
        } else {
          //モーダルが元に戻るAnimation
          this.setState({scrollEnabled: false});
          Animated.timing(this.state.modalTop, {
            toValue: this.startTop,
            duration: 300,
            easing: Easing.inOut(Easing.sin)
          }).start()
        }
      }
    });
  }

  onScrollEndDrag = (e) => {
    const {contentSize, contentOffset} = e.nativeEvent;
    if (-contentOffset.y > ANIMATE_THRESHOLD) {
      this.setState({scrollEnabled: false});
      Animated.timing(this.state.modalTop, {
        toValue: this.startTop,
        duration: 300,
        easing: Easing.inOut(Easing.sin)
      }).start();
    }
  }

  render() {
    const { children } = this.props;
    const { modalTop, scrollEnabled } = this.state;

    const bottom = modalTop.interpolate({
      inputRange: [0, this.startTop],
      outputRange: [0, -this.startTop]
    })



    return (
      <Animated.ScrollView
        {...this.panResponder.panHandlers}
        style={[styles.container, {top: modalTop, bottom: bottom}]}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={this.onScrollEndDrag}
      >
        {children}
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});

SlideUpModal.defaultProps = {
  parentHeight: DEVICE_HEIGHT,
  childrenStartHeight: DEFAULT_HEIGHT
};
