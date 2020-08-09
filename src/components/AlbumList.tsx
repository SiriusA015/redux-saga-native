// react
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// newly added for redux
import useActions from '../hooks/useActions';
import useTypedSelector from '../hooks/useTypedSelector';

type Props = {
    navigation: any;
    route: any;
};

// main component
export default function AlbumList(props: Props) {

    //state and veriable
    let userId = props.route?.params?.user?.id;
    let userName = props.route?.params?.user?.name
    // newly added 
    const actions = useActions();
    const state = useTypedSelector(state => state);
    const [error, setError] = useState('');
    // life cycle
    useEffect(() => {
        const abortController = new AbortController()
        actions.getAlbumListApi({ id: userId });
        
        return () => {
            abortController.abort()
            // stop the query by aborting on the AbortController on unmount
          }
    }, []);
    // on user click action
    const handleClick = (album: any) => {

        props.navigation.navigate('Album', { album: album })
    }

    // helper view

    const renderUser = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => handleClick(item)}
                style={styles.userContainer}
            >
                <Text
                    style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#1167B1' }}
                >
                    {item.title}</Text>
            </TouchableOpacity>
        )
    }

    // render view

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
            <Text style={styles.header}>{userName}'s Albums</Text>
            <FlatList data={state.albums}
                renderItem={renderUser}
                keyExtractor={item => item.id.toString()} />

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
    header: {
        fontSize: 25,
        color: '#fa2a55',
        fontWeight: 'bold',
        marginBottom: 20,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#D3D3D3",
        textAlign: "center"
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