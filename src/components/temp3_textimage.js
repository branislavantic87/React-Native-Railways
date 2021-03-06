import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import Swiper from 'react-native-swiper';
import VB from './VideoBtn';
import DB from './DocBtn';
import Modall from './Modall';
import SwiperFlatList from './SwiperFlatList';
export const { width, height } = Dimensions.get('window');


export default class TextImage extends Component {

  state = {
    videoPath: [],
    documentPath: [],
    imagesPath: [],
    startSwiper: false,
    dimensions: undefined,
  }

  onLayout(event) {
    if (this.state.dimensions) return
    let { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  }

  componentWillMount() {
    let videos = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'mp4'
    })

    let documents = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'pdf'
    })

    let images = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'jpg'
        || file.substring(file.length - 3, file.length) == 'png'
        || file.substring(file.length - 4, file.length) == 'jpeg'
    })

    this.setState({ videoPath: videos, documentPath: documents, imagesPath: images });
  }


  renderPics(w, h) {

    return this.state.imagesPath.map((pic, i) => {
      return (
        <View key={i} style={{ backgroundColor: 'white', width: w, height: h }}>
          <Modall pic={pic}>
            <Image resizeMethod='scale' style={[styles.swiperPic, { width: w, height: h, resizeMode: 'contain', backgroundColor: 'white' }]} source={{ uri: pic }} />
          </Modall>
        </View>
      );
    })
  }

  render() {

    return (

      <View style={styles.mainView}>

        <View style={styles.body}>

          <View>
            <Text style={[styles.headingText, styles.headingMain]}>{this.props.templateTitle}</Text>
            <Text style={styles.headingText}>{this.props.subtitle}</Text>
          </View>

          <View style={styles.contentContainer}>

            <View style={styles.contentText}>
              <ScrollView>
                <HTML html={this.props.text} baseFontStyle={{ fontSize: Dimensions.get('window').height * 0.02 }} />

              </ScrollView>
            </View>

            <View style={styles.contentPic} onLayout={(event) => this.onLayout(event)}>

              <SwiperFlatList
                showPagination={this.state.imagesPath.length == 1 ? false : true}
                paginationActiveColor={'#007AFF'}


              >
                {this.state.dimensions && this.renderPics(this.state.dimensions.width, this.state.dimensions.height)}
              </SwiperFlatList>

              <View style={styles.ButtonContainer}>
                {this.state.videoPath.length > 0 && <VB videouri={this.state.videoPath[0]} />}
                {this.state.documentPath.length > 0 && <DB documenturi={this.state.documentPath[0]} />}
              </View>

            </View>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    height: '100%'
  },
  body: {
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headingText: {
    color: '#1496ba',
    fontSize: Dimensions.get('window').height * 0.03,
    paddingBottom: 35
  },
  headingMain: {
    paddingTop: 40,
    paddingBottom: 4,
    fontSize: Dimensions.get('window').height * 0.05
  },
  contentContainer: {
    //marginTop: 10,
    flexDirection: 'row',
    //    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  contentText: {
    flex: 2.5,
    backgroundColor: '#ebeced',
    padding: 20,
    paddingTop: 30
  },
  contentPic: {
    flex: 4.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
  },
  swiperPic: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: '51%',
  },
  pagination: {
    width: 10,
    height: 10
  }
});
