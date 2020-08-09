// react
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
// newly added for redux
import useActions from '../hooks/useActions';
import useTypedSelector from '../hooks/useTypedSelector';

type Props = {
    navigation: any;
    route: any;
};

// main component
export default function Home(props: Props) {

    // states & variables
    // newly added 
    const actions = useActions();
    const state = useTypedSelector(state => state);
    const [error, setError] = useState('');

    // life cycle
    useEffect(() => {
        const abortController = new AbortController()
        actions.getUserListApi();
        
        return () => {
            abortController.abort()
            // stop the query by aborting on the AbortController on unmount
          }
    }, []);

    // on user click action
    const handleClick = (user: any) => {

        props.navigation.navigate('User\'s Albums', { user: user })
    }

    // helper view

    const renderUser = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => handleClick(item)}
                style={styles.userContainer}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#fa2a55' }}>{item.name}</Text>
                <Text style={{ fontSize: 18, color: '#696969', marginBottom: 5 }}>{item.username}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5, color: 'blue' }}>{item.email}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.phone}</Text>
                <Text style={{ fontSize: 16, color: 'blue' }}>{item.website}</Text>
            </TouchableOpacity>
        )
    }

    // loading
    if (state.isLoading) {

        return (
            <View
                style={styles.loadingContainer}>
                < ActivityIndicator />
            </View>
        )
    }

    // error
    if (error) {

        return (
            <Text>error</Text>
        )
    }

    // render
    return (
        <View style={styles.container}>
            <FlatList data={state.users}
                renderItem={renderUser}
                keyExtractor={item => item.id.toString()} 
            />
        </View>
    );
}

// style

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userContainer: {
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    userImage: {
        height: 44,
        width: 44,
    }


});
