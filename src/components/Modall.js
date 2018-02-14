import React, { Component } from 'react';
import { Modal, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
//import Modal from 'react-native-modal';zzz

class Modall extends Component {

    // this.props.source

    state = { modalVisible: false }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    openModal() {
        this.setState({ modalVisible: true })
        //.then(() => this.setState({}));
    }

    temp3() {
        if (this.props.modalPress) {
            this.props.modalPress();
        }
    }


    modalOrNative = () => {
        if (!this.state.modalVisible) {
            return (
                <View style={styles.aa}>
                    <TouchableWithoutFeedback onPress={() => this.openModal()}>
                        {this.props.children}
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        else if (this.props.pic && this.state.modalVisible) {
            return (
                <Modal
                    onRequestClose={() => this.closeModal()}
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    supportedOrientations={['landscape']}
                    presentationStyle={'fullScreen'}
                >
                    <View style={styles.aa}>
                        <TouchableWithoutFeedback onPress={() => this.closeModal()}  >
                            <ImageZoom 
                                cropWidth={Dimensions.get('window').width}
                                cropHeight={Dimensions.get('window').height}
                                imageWidth={Dimensions.get('window').width}
                                imageHeight={Dimensions.get('window').height}>
                                <Image resizeMethod='resize' style={{ width: '100%', height: '100%', resizeMode: 'contain', backgroundColor: 'white' }} source={{ uri: this.props.pic }} />
                            </ImageZoom>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>

            );
        } else {
            return (
                <Modal
                    onRequestClose={() => this.closeModal()}
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    supportedOrientations={['landscape']}
                >
                    <View style={styles.aa}>
                        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                        {/* Namestiti on clicl close!!!! */}
                        <ImageZoom 
                                onPress={() => this.closeModal()}
                                cropWidth={Dimensions.get('window').width}
                                cropHeight={Dimensions.get('window').height}
                                imageWidth={Dimensions.get('window').width}
                                imageHeight={Dimensions.get('window').height}>
                            {this.props.children}
                            </ImageZoom>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            );
        }
    }

    render() {
        return (
            <View style={styles.ss}>
                {this.modalOrNative()}
            </View>
        );
    }

}

const styles = {
    ss: {
        width: '100%',
        height: '100%',
    },
    aa: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',

    }
}

// <Image resizeMethod='resize' source={{ uri: this.props.source }} />

export default Modall;
