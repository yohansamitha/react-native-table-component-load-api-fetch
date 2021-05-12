import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';

export default class TblUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['name', 'username', 'email'],
      widthArr: [150, 125, 200],
      tableData: [],
    };
  }

  //fetching the data froomm the api
  componentDidMount() {
    //api url
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        const tableData = [];
        // filtering the data for rendering
        for (let j = 0; j < json.length; j++) {
          // creating table new raw
          const rowData = [];
          // initilizing data table raw
          rowData.push(json[j].name, json[j].username, json[j].email);
          // add new raw to the table
          tableData.push(rowData);
        }
        // setting table data to the state
        this.setState({tableData: tableData});
      });
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {/* access the table data and rendering */}
                {state.tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[styles.row, {backgroundColor: '#ecf0f1'}]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 8, paddingTop: 8, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#95a5a6'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});
