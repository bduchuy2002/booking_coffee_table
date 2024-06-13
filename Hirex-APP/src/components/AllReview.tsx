import React, { useState,useEffect } from 'react';
import { SectionList,View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Text, Image,  Dimensions, ScrollView,FlatList, ActivityIndicator } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height: heightScreen } = Dimensions.get('window');

const AllReview = ({ route }) => {    
    const { idCustomer} = route.params;
    console.log(idCustomer +" "+ "1")
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://192.168.31.104:8000/v2/customer/${idCustomer}/bookings/`);
                setBookings(response.data);
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, [idCustomer]);
    useEffect(() => {
        const fetchCoffee = async () => {
            try {
                const response = await axios.get(`http://10.20.226.49:8000/v2/customer/${idCustomer}/bookings/`);
                setBookings(response.data);
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchCoffee();
    }, []);

    const images = [
        require('../../assets/anh2.jpg'),
        require('../../assets/anh4.jpg'),
        require('../../assets/anh5.jpg')
    ];

    const navigation = useNavigation();

    const handleReviews = () => {
        navigation.navigate('Review'); 
    };
    const handleSearch = (idCustomer) => {
        navigation.navigate('SearchScreen',{idCustomer:idCustomer}); 
    };

    const handleAddRate = () => {
        navigation.navigate('AddReview'); 
    };

    const maxVisibleImages = 2;

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.viewBack}>
                    <View style={styles.header}>
                        <TouchableOpacity  onPress={() => handleSearch(idCustomer)}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.titleScreen}>
                            Lịch sử đặt bàn
                        </Text>
                        <View></View>
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                Bookings for Customer 
            </Text>
            {bookings.length === 0 ? (
                <Text>No bookings found for this customer.</Text>
            ) : (
                <FlatList
            data={bookings}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.bookingId}>Booking ID: {item._id}</Text>
                    <Text style={styles.bookingInfo}>Coffee Name: {item.name}</Text>
                     <Text style={styles.bookingInfo}>Coffee Address: {item.address}</Text>
                    <Text style={styles.bookingInfo}>Booking Date: {new Date(item.date).toLocaleString().slice(0,11)}</Text>
                    
                    <Text style={styles.bookingInfo}>Booking Hours: {item.time}</Text>
                    <Text style={styles.bookingInfo}>
                    Booking Table: {item.tableBooking.join(', ')}
                </Text>
                    <View style={styles.separator} />
                    
                </View>
            )}
        />
            )}
        </View>
                </View>
                
                
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    bookingId: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookingInfo: {
        fontSize: 14,
        marginTop: 5,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 8,
    },
    orderNumber: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
        // justifyContent: 'space-between',
    },

    viewBack: {
        margin: 10
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: heightScreen / 40
    },

    titleScreen: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1D1E20',
        alignSelf: 'center'
    },

    quantityRecommend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 6,
        marginBottom: 20
    },

    textQuantityRecommend: {
        fontSize: 15,
        fontWeight: '500'
    },

    quantityStar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    boxRecommend: {
        backgroundColor: '#f7f2f0',
        borderRadius: 6,
        paddingBottom: 6,
        paddingHorizontal: 6
    },

    buttonAddReview: {
        backgroundColor: '#FF7043',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    avataUser: {
        width: 30,
        height: 30,
        marginRight: 3
    },

    headerRecommend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    boxTime: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    container2: {
        flexDirection: 'row',
    },

    imageContainer: {
        position: 'relative',
    },

    image2: {
        marginTop: 5,
        width: 90,
        height: 90,
        marginRight: 5,
    },

    overlay: {
        // ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    text: {
        color: 'white',
        fontSize: 20,
    },

    textRecommend: {
        fontSize: 10,
        color: '#8F959E'
    },

    textUser: {
        fontWeight: '500',
        marginLeft: 1,
        marginBottom: 3
    },

    rating: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

})

export default AllReview