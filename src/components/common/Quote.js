import React, { Component } from 'react';
import { View , Text } from 'react-native';
import axios from 'axios';

// this is just showing information - no life cycle events
class Quote extends Component {
  // state = { quote: '', author: ''}
  //
  // componentDidMount() {
  //   console.log('in the quote component and trying to mount');
  //   this.getQuote();
  // }
  //
  //
  // // const item = axios.get(' http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
  // // console.log(item);
  // // .then(response => {
  // //   console.log('in the then of the response');
  // //   console.log(response);
  // // })
  //
  // async getQuote() {
  //   console.log('in that quote');
  //   console.log('this is the call url http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
  //   try {
  //     const apiQuote = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
  //     console.log(apiQuote);
  //     this.setState({ quote: apiQuote.data.quoteText, author:apiQuote.data.quoteAuthor })
  //   } catch(error) {
  //     console.log('a try');
  //   }
  // }
  //
  // renderQuote() {
  //   return <Text>{this.state.quote} - {this.state.author}</Text>
  //
  // }
  //
  // render() {
  //   return (
  //     <View style={styles.containerStyle}>{this.renderQuote()}</View>
  //   );
  // }

}
// 
// const styles = {
//   containerStyle: {
//     borderBottomWidth: 1,
//     padding: 5,
//     backgroundColor: '#fff',
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     borderColor: '#ddd',
//     position: 'relative',
//     // flex: 2,
//   }
// };

export { Quote };
