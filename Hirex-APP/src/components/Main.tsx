import { Button, Colors } from 'react-native-ui-lib'
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Text, Image, FlatList, Dimensions } from 'react-native';
import { EvilIcons, AntDesign, Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import thư viện Axios để gửi yêu cầu HTTP
const { height: heightScreen } = Dimensions.get('window');

const Main = () => {

    const navigation = useNavigation();

    const handleReviews = () => {
        navigation.navigate('Review'); 
    };
    const handleViewSearchScreen = (idCustomer) => {
        navigation.navigate('SearchScreen',{idCustomer:idCustomer})
    };
     const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.20.226.49:8000/v2/customer/login', {
                email,
                password
            });
            
            // Xử lý kết quả trả về sau khi đăng nhập thành công
            console.log(response.data.message); // In ra dữ liệu từ server (ví dụ: 'Đăng nhập thành công')
            setErrorMessage('');
            handleViewSearchScreen(response.data.message);
        } catch (error) {
            // Xử lý lỗi khi đăng nhập không thành công
            console.error('Đăng nhập không thành công:', error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );

    // return (
    //     <SafeAreaView style={styles.container}>
    //         <View style={styles.viewBack}>
    //             <TouchableOpacity onPress={ handleViewSearchScreen}>
    //                 <Ionicons name="arrow-back" size={25} color="black" />
    //             </TouchableOpacity>

    //             <View style={styles.header}>
    //                 <View style={styles.search}>
    //                     <EvilIcons name="search" size={26} color="gray" style={{marginLeft: 6}}/>
    //                     <TextInput
    //                         placeholder='Tìm kiếm...'
    //                         style={{
    //                             width: '70%',
    //                             height: heightScreen/15,
    //                             marginLeft: 3
    //                         }}
    //                     >
    //                     </TextInput>
    //                 </View>
    //                 <TouchableOpacity style={styles.bottonSlider}>
    //                     <FontAwesome6 name="sliders" size={20} color="white" />
    //                 </TouchableOpacity>
    //             </View>
    //             <View style={styles.boxImage}>
    //                 <Image source={require('../../assets/search.png')} style={styles.image}></Image>
    //             </View>
    //             <View style={styles.boxText}>
    //                 <Text style={styles.textIdea}>Không tìm thấy gợi ý khác</Text>
    //                 <View style={{width: '70%'}}>
    //                     <Text style={styles.textNoSuggest}>Không thể tìm thấy gợi ý vui lòng kiểm tra lại định vị của bạn</Text>
    //                 </View>
    //             </View>
    //         </View>
    //     </SafeAreaView>
    // )
}

const styles = StyleSheet.create({
    // container: {
    //     width: '100%',
    //     height: '100%',
    //     paddingTop: Platform.OS === 'android' ? 45 : 0,
    //     paddingHorizontal: 10,
    //     backgroundColor: '#F5F5F5',
    // },

    viewBack: {
        margin: 10
    },

    header: { 
        marginTop: 25, 
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center' 
    },

    search: { 
        flexDirection: 'row', 
        borderRadius: 10,  
        alignSelf: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white' 
    },

    bottonSlider: { 
        width: heightScreen / 15 + 2, 
        height: heightScreen / 15,
        backgroundColor: '#003B20', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 20, 
        marginLeft: 10 
    },

    boxImage: {
        height: heightScreen/2, 
        justifyContent:'center', 
        alignItems: 'center'
    },

    image: {
        width: heightScreen/5-30 , 
        height: heightScreen/5
    },

    boxText: {
        justifyContent: 'center', 
        alignItems: 'center'
    },

    textIdea: {
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#150B3D' , 
        marginBottom: 10
    },

    textNoSuggest: {
        color: '#524B6B', 
        textAlign: 'center', 
        lineHeight: 20 
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10
    },button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

})

export default Main