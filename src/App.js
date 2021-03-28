import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
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
    const [tasks, setTasks] = useState({
       '1': {id : '1', text: 'Apple', completed : false },
       '2': {id : '2', text: 'Banana', completed : false },
       '3': {id : '3', text: 'Cauliflower', completed : false },
       '4': {id : '4', text: 'Dragonfruit', completed : false },
    });

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID] : {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({...tasks, ...newTaskObject});
    };

    const _delTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    const _toggleTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        setTasks(currentTasks);
    }

    const _onBlur = () => {
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
                    value = {newTask}
                    onChangeText = {_handleTextChange}
                    onSubmitEditing = {_addTask}
                    onBlur = {_onBlur}
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map(item => (
                            <Task 
                                key={item.id} 
                                item= {item} 
                                deleteTask={_delTask} 
                                toggleTask={_toggleTask}
                                updateTask={_updateTask}
                            />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}