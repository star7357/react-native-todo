import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/input';
import Task from './components/Task';


const Container = styled.SafeAreaView`
    flex : 1;
    background : ${({ theme }) => theme.background};
    align-items : center;
    justify-content : flex-start;
`;

const Title = styled.Text`
    font-size : 40px;
    font-weight : 600;
    color : ${({theme}) => theme.main};
    align-self : flex-start;
    margin: 0px 20px;
`;

const List = styled.ScrollView`
    flex : 1;
    width : ${({ width }) => width - 40}px;
`;

export default function App() {

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        setNewTask('');
    };

    const _handleTextChange = text => {
        setNewTask(text);
    };
    return (
        <ThemeProvider theme = {theme}>
            <Container>
                <StatusBar 
                    barStyle = "light-content"
                    backgroundColor = {theme.background}
                />
                <Title>TODO List</Title>
                <Input 
                    placeholder = "+ Add a Task" 
                    value ={newTask}
                    onChangeText = {_handleTextChange}
                    onSubmitEditing ={_addTask}
                />
                <List width={width}>
                    <Task text="Hahaha"/>
                </List>
            </Container>
        </ThemeProvider>
    );
}