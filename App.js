import React, { Component } from 'react';
import { StyleSheet, Text, View , TextInput, TouchableOpacity, Touchable} from 'react-native';
import { Header }  from 'react-native-elements';
export default class App extends Component {
  constructor(){
    super();
    this.state= {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: "Loading...",
      lexicalCatogry: '',
      definition: ""
    }
}
 getWord=(word)=> {
  var searchKeyboard= word.toLowerCase()
  var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
  //console.log(url)
  return fetch(url)
  .then((data) =>{
    if(data.status===200){
      return data.json()
    }
    else{
      return null
    }
  })
  .then((responce) => {
    var responceObject = responce

    if (responceObject){
      var wordData = responceObject.definition [0]
      var definition = wordData.description
      var lexicalCatogry = wordData.wordtype
      // console.log(lexicalCatogry)
      this.setState({
        "word": this.state.text,
        "definition" : definition,
        "lexicalCatogry": lexicalCatogry
      })
    }
    else{
      this.setState({
        "word": this.state.text,
        "definition" : "Not Found"
      })
    }
  })
 }
 render(){
   return(
     <View style = {{flex: 1, borderWidth: 2}}>
       <Header
       backgroundColor={'purple'}
       centerComponent={{
         text: 'Pocket Dictionary',
         style: { color: '#fff', fontSize: 20 },
       }}
       />
       <View style= {StyleSheet.inputBoxContainer}>

         <TextInput
         style= {styles.inputBox}
         onChangeText={text => {
           this.setState({
             text: text,
             isSearchPressed: false,
             word: "Loading...",
             lexicalCatogry: '',
             example: [],
             definition: ""
           })
         }}
         value={this.state.text}
         />

         <TouchableOpacity
         style={styles.searchButton}
         onPress={() =>{
           this.setState({isSearchPressed: true});
           this.getWord(this.state.text)
         }}>
           <Text style={styles.searchText}>Search</Text>
           </TouchableOpacity>
           </View>
           <View style= {styles.outputContainer}>
             <Text style ={{fontSize: 20}}>
               {
                 this.state.isSearchPressed && this.state.word === "Loading..."
                 ? this.state.word
                 : ""
               }
               </Text>
               {
                 this.state.word !== "Loading..." ?
                 (
                   <View style ={{justifyContent: 'center', marginLeft: 10}}>
                   <View style={styles.detailsContainer}>
                     <Text style={styles.detailsTitle}>
                       Word:{" "}
                       </Text>
                       <Text style={{fontSize: 18}}>
                         {this.state.word}
                    </Text>
                    </View>

                    <View style={styles.detailsContainer}>
                     <Text style={styles.detailsTitle}>
                       Type:{" "}
                       </Text>
                       <Text style={{fontSize: 18}}>
                         {this.state.lexicalCatogry}
                    </Text>
                    </View>

                    <View style ={{justifyContent: 'center', marginLeft: 10}}>
                     <Text style={styles.detailsTitle}>
                       definition:{" "}
                       </Text>
                       <Text style={{fontSize: 18}}>
                         {this.state.definition}
                    </Text>
                    </View>
                </View>
        )
      :null
          }
      </View>
      </View>
   )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  inputBoxContainer: {
    flex: 0.3,
    alignItems:'center',
    justifyContent:'center',
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height:40,
    textAlign: 'center',
    borderWidth: 4,
  },
  searchButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  searchText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsTitle: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
