// react
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
// newly added for redux
import useActions from '../hooks/useActions';
import useTypedSelector from '../hooks/useTypedSelector';

type Props = {
    navigation: any;
    route: any;
};

// main componet
export default function UserAlbums(props: Props) {

    // state & variables
    let albumId = props.route?.params?.album?.id
    // newly added 
    const actions = useActions();
    const state = useTypedSelector(state => state);
    //
    const [albums, setAlbums] = useState([]);
    const [picUrl, setPicUrl] = useState('');
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // life cycle
    useEffect(() => {
        const abortController = new AbortController()
        actions.getPhotoListApi({ id: albumId });
        
        return () => {
            abortController.abort()
            // stop the query by aborting on the AbortController on unmount
          }
    }, []);

    // on user click action
    const handleClick = (album: { url: React.SetStateAction<string>; }) => {

        setPicUrl(album.url)
        setModalVisible(true)
    }

    // helper view

    const renderUser = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => handleClick(item)}
                style={styles.album}
            >
                <View
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                >
                    <Image
                        style={styles.image}
                        source={{
                            uri: item.thumbnailUrl,
                        }}
                    />
                    <Text
                        style={{ fontSize: 18, marginBottom: 5, marginLeft: 10, flex: 1, color: '#1167B1' }}
                    >
                        {item.title}
                    </Text>
                </View>
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
            <FlatList data={state.photos}
                renderItem={renderUser}
                keyExtractor={item => item.id.toString()} />

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}>
                <TouchableOpacity
                    onPress={() => { setModalVisible(false) }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{
                            uri: picUrl,
                        }}
                    />
                </TouchableOpacity>
            </Modal>
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    album: {
        padding: 10,
        marginBottom: 10
    },
    image: {
        height: 50,
        width: 50,
    }
});
