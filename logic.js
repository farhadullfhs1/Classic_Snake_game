import React, { Component } from "react";
import { AppRegistry, StyleSheet, StatusBar, SafeAreaView, View, Alert, Button, TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Head } from "./head";
import { Food } from "./food";
import { Tail } from "./tail";
import { GameLoop } from "./system";
import Constants from './constant';
import { updateHighScore,auth } from './firebase'; // Add this import
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import initializeApp from "firebase/app";


export default class SnakeApp extends Component {
    constructor(props) {
      super(props);
      this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
      this.engine = null;
      this.state = {
        running: true,
        highScore: 0,
        userId: auth.currentUser ? auth.currentUser.uid : null,
      };
  
      this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        // Set userId when the component mounts
        const user = auth.currentUser;
        if (user) {
          this.setState({ userId: user.uid });
        }
      }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onEvent = async (e) => {
        console.log('Event:', e);
        if (e.type === "game-over") {
          const currentScore = this.state.running ? this.engine.state.entities.tail.elements.length : 0;
          const newHighScore = Math.max(this.state.highScore, currentScore);
    
          // Check if userId is set before calling updateHighScore
          if (this.state.userId) {
            await updateHighScore(this.state.userId, newHighScore);
          }
    
          this.setState((prevState) => ({
            running: false,
            highScore: newHighScore,
          }));
          Alert.alert(`Game Over\nHigh Score: ${newHighScore}`);
        }
      };
    

    reset = () => {
    const initialEntities = {
        head: { position: [0, 0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head /> },
        food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food /> },
        tail: { size: 20, elements: [], renderer: <Tail /> }
    };

    this.engine.swap(initialEntities);
    this.setState({
        running: true
    });
};


    

    render() {
        return (
            <View style={styles.container}>
                <GameEngine
                    ref={(ref) => { this.engine = ref; }}
                    style={[{ width: this.boardSize, height: this.boardSize, backgroundColor: '#ffffff', flex: null }]}
                    systems={[ GameLoop ]}
                    entities={{
                        head: { position: [0,  0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
                        food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
                        tail: { size: 20, elements: [], renderer: <Tail /> }
                    }}
                    running={this.state.running}
                    onEvent={this.onEvent}>

                    <StatusBar hidden={true} />

                </GameEngine>

                <Button title="New Game" onPress={this.reset} />

                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-left" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                        <View style={[styles.control, { backgroundColor: null}]} />
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-right" })}}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-down" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controls: {
        width: 300,
        height: 300,
        flexDirection: 'column',
    },
    controlRow: {
        height: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    control: {
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    }
});

AppRegistry.registerComponent("Snake", () => SnakeApp);