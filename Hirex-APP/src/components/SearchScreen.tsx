import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Text, Image, FlatList, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { EvilIcons, FontAwesome6, FontAwesome, Octicons, AntDesign, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
const { height: heightScreen } = Dimensions.get('window');
import {Asset } from 'expo-asset';  
enum ChosenButton {
    FAVOURITE = 0,
    RECENT = 1,
    FOLLOW = 2,
}

enum ChosenScreen {
    HOME = 0,
    LIKE = 1,
    SUGGEST = 2,
    SELF = 3
}

const SearchScreen = ({route}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Số lượng sản phẩm trên mỗi trang
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
const { idCustomer } = route.params;
    const toggleMenu = () => {
      
    setIsMenuVisible(!isMenuVisible);
    };
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    style={[styles.pageButton, i === currentPage && styles.activePageButton]}
                    onPress={() => setCurrentPage(i)}
                >
                    <Text style={styles.pageButtonText}>{i}</Text>
                </TouchableOpacity>
            );
        }
        return buttons;
    };
    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
      try {
        const startIndex = (currentPage - 1) * itemsPerPage;
      const response = await axios.get(`http://10.20.226.49:8000/v1/coffee/55/pagination?page=${currentPage}`);
          //setData(response.data.coffee);
          const { coffee, totalPages } = response.data;
            setData(coffee);
            setTotalPages(totalPages);
          console.log(idCustomer)
          console.log(currentPage);
    } catch (error) {
          console.error('Error fetching data:', error);
    }
    };
    useEffect(() => {
    fetchData1();
  }, []);

  const fetchData1 = async () => {
      try {
        
      const response = await axios.get(`http://10.20.226.49:8000/v1/coffee`);
          setData1(response.data);
          console.log("all data")
    } catch (error) {
          console.error('Error fetching data:', error);
    }
    };
    const handleSearch = () => {
      // Lọc dữ liệu dựa trên giá trị của searchTerm
        const filteredResults = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return filteredResults;
        return 0;
    };
    const handleAll = () => {
        //Lọc dữ liệu dựa trên giá trị của searchTerm
        setCurrentPage(1);
       const filteredResults = data.filter(item => item);
        
        return filteredResults;
        return 0;
    };
   // buttonS = handleSearch();
    
    const handleGanday = () => {
        // Lọc dữ liệu dựa trên giá trị của searchTerm
        const distanceLow = data1.filter(item => parseFloat(item.distance)<9);
        return distanceLow;
    };
    
    const [selectedButton, setSelectedButton] = useState<ChosenButton>(ChosenButton.FAVOURITE);
    const [selectedButtonNav, setSelectedButtonNav] = useState<ChosenScreen>(ChosenScreen.SUGGEST);
    const [isPressed, setIsPressed] = useState({});

    const handlePress = (buttonId) => {
        setIsPressed(prevState => ({
            ...prevState,
            [buttonId]: !prevState[buttonId]
        }));
    };

    const navigation = useNavigation();
   
    const handleViewReView = (name,idCustomer) => {
        navigation.navigate('Review', { name: name,idCustomer:idCustomer })
    }
    const handleMain = () => {
        navigation.navigate('Main');
        console.log('main');
        
    }
    const handleButtonPress = (index) => {
        setSelectedButtonNav(index);
        
    };

    const handlePressButton = (button) => {
        setSelectedButton(button);
        updateDataBasedOnButtonType(button);
    };
    
    const updateDataBasedOnButtonType = (button) => {
    let updatedData = []; // Biến tạm để lưu dữ liệu đã được lọc
    switch (button) {
        case ChosenButton.FAVOURITE:
            fetchData()
            setData( handleAll());
            break;
        case ChosenButton.RECENT:
            
            setData( handleGanday());
            break;
        case ChosenButton.FOLLOW:
            navigation.navigate('AllReview',{ idCustomer: idCustomer });
            break;
        default:
            break;
    }
     // Cập nhật dữ liệu hiển thị
};
    
    const images1= data 
    const images = [
        {
            anh: require('../../assets/coffee.png'),
            name: 'Nola Cafe',
            quantity: '1.200',
            rating: '5.0',
        },

        {
            anh: require('../../assets/coffee1.png'),
            name: 'Highlands Coffee',
            quantity: '429',
            rating: 4.9,
        },

        {
            anh: require('../../assets/coffee2.png'),
            name: 'Home Coffee Roasters',
            quantity: '999',
            rating: 4.8,
        },

        {
            anh: require('../../assets/coffee3.png'),
            name: 'Haus Cafe',
            quantity: '666',
            rating: 4.7,
        },
        {
            anh: require('../../assets/coffee3.png'),
            name: 'Haus Cafe',
            quantity: '666',
            rating: 4.7,
        }
    ];
    

    return (
        <View style={styles.heightScreens}>
            <ScrollView style={styles.heightScroll}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.title}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../../assets/avata2.png')} style={{ width: 50, height: 50 }}></Image>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={{ fontSize: 25, fontWeight: '600', color: '#003B40' }}>Tìm kiếm quán Coffee ở mọi nơi  </Text>
                        </View>
                        <View style={styles.header}>
                            <View style={styles.search}>
                                <TouchableOpacity >
                                                <EvilIcons name="search" size={26} color="gray" style={{ marginLeft: 6 }} />
                                            </TouchableOpacity>
                                
                                <TextInput
                                    placeholder='Tìm kiếm...'
                                    style={{
                                        width: '70%',
                                        height: heightScreen / 15,
                                        marginLeft: 3
                                    }}
                                    value={searchTerm}
                                    onChangeText={text => setSearchTerm(text)}
                                />
                            </View>
                            <TouchableOpacity style={styles.buttonSlider} onPress={() => handleMain ()}>
                                <Text>Log out</Text>
                            </TouchableOpacity>
                            {isMenuVisible && (
        <View style={styles.menu}>
          {/* Hiển thị danh mục bên dưới đây */}
          <Text style={styles.menuItem}>Danh mục 1</Text>
          <Text style={styles.menuItem}>Danh mục 2</Text>
          <Text style={styles.menuItem}>Danh mục 3</Text>
        </View>
      )}
                        </View>
                    </View>
                    <View style={styles.touchableSelect}>
                        <TouchableOpacity style={[styles.buttonSelect, selectedButton === ChosenButton.FAVOURITE && styles.selectedButton ]} onPress={() => handlePressButton(ChosenButton.FAVOURITE)}>
                            <Text style={[styles.textSelect, selectedButton === ChosenButton.FAVOURITE && styles.textSelectedButton]}>Tất cả</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonSelect, selectedButton === ChosenButton.RECENT && styles.selectedButton]} onPress={() => handlePressButton(ChosenButton.RECENT) }>
                            <Text style={[styles.textSelect, selectedButton === ChosenButton.RECENT && styles.textSelectedButton]}>Gần đây</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonSelect, selectedButton === ChosenButton.FOLLOW && styles.selectedButton]} onPress={() => handlePressButton(ChosenButton.FOLLOW)}>
                            <Text style={[styles.textSelect, selectedButton === ChosenButton.FOLLOW && styles.textSelectedButton]}>Lịch sử đặt</Text>
                          
                        </TouchableOpacity>
                    </View>
                    
                    {data ? (
                        <View style={styles.boxRow}>
                            {handleSearch().map((image, index) => {
                                
                                let sum = 1;
                            
                            
                                const localImagePath = 'file:///C:/Users/PC/Downloads/Hirex-APP/Hirex-APP/assets/coffee1.png';
                                return (
                                    <View style={[{ width: '46%' }, index % 2 === 0 ? null : { marginTop: 30 }]} key={index}>
                                        {/* <Image source={require( `../../assets/${w}`)} style={styles.image}  /> */}
                                        {/* <Image source={require( `../../assets/coffee1.png`)} style={styles.image} /> */}
                                        <Image
                                            style={styles.image}
                                            source={{
                                                uri: `${image.image}`,
                                            }}
                                        />
                                    
                                        <View style={styles.buttonHeart}>
                                            <TouchableOpacity onPress={() => handlePress(index)}>
                                                <AntDesign name={isPressed[index] ? "heart" : "hearto"} size={18} color={isPressed[index] ? "red" : "#003B40"} />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => handleViewReView(image._id,idCustomer)}>
                                            <Text style={styles.textNameCafe}>{image.name}</Text>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                            <FontAwesome name="star" size={14} color="#FDCB6E" />
                                            <Text style={styles.distance}>{image.rate} </Text>
                                            <Text style={styles.quantity}>  {image.rate}</Text>
                                        </View>
                                        <Text style={styles.distance}>{image.distance} { } </Text>
                                    </View>
                                );
                            })}
                        </View>
                        
                    ) : (<Text>loading...</Text>)}
                           {/* Phan trang */}
                 <View style={styles.pagination}>{renderPaginationButtons()}</View>
        
                </SafeAreaView>
            </ScrollView>
            <View style={styles.navbar}>
                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === ChosenScreen.HOME && styles.selectedButton2]}
                    onPress={() => handleButtonPress(ChosenScreen.HOME)}
                >
                    <Ionicons name="home" size={26} color={selectedButtonNav == ChosenScreen.HOME ? "#03DAC6" : "#003B40"} />
                    {selectedButtonNav == ChosenScreen.HOME ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Home</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === ChosenScreen.LIKE && styles.selectedButton2]}
                    onPress={() => handleButtonPress(ChosenScreen.LIKE)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <AntDesign name="heart" size={26} color={selectedButtonNav == ChosenScreen.LIKE ? "#03DAC6" : "#003B40"} />
                        {selectedButtonNav == ChosenScreen.LIKE ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Yêu hích</Text>}
                    </View>

                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === ChosenScreen.SUGGEST && styles.selectedButton2]}
                    onPress={() => handleButtonPress(2)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <FontAwesome5 name="lightbulb" size={26} color={selectedButtonNav == ChosenScreen.SUGGEST ? "#03DAC6" : "#003B40"} />
                        {selectedButtonNav == ChosenScreen.SUGGEST ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Gợi ý</Text>}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === 3 && styles.selectedButton2]}
                    onPress={() => handleButtonPress(3)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <FontAwesome name="user" size={26} color={selectedButtonNav == ChosenScreen.SELF ? "#03DAC6" : "#003B40"} />
                        {selectedButtonNav == ChosenScreen.SELF ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Bản thân</Text>}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingHorizontal: 10,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 10,
        paddingBottom: heightScreen / 30
    },

    title: {
        margin: 10
    },

    heightScreens: {
        height: heightScreen + heightScreen / 18
    },

    heightScroll: {
        height: '98%'
    },

    header: {
        marginTop: 25,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },

    search: {
        flexDirection: 'row',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    buttonSlider: {
        width: heightScreen / 15 + 2,
        height: heightScreen / 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginLeft: 10
    },

    touchableSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: heightScreen / 40,
        marginTop: heightScreen / 50,
        marginBottom: heightScreen / 40
    },

    buttonSelect: {
        width: heightScreen / 8,
        height: heightScreen / 17,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        // backgroundColor: '#C67C4E'
        backgroundColor: 'white'
    },

    textSelect: {
        fontSize: 15,
        color: '#2F4B4E',
        fontWeight: '500'
    },

    buttonHeart: {
        position: 'absolute',
        zIndex: 1,
        right: -10,
        top: -10,
        backgroundColor: '#EDF0EF',
        padding: 5,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#ffffff'
    },

    boxRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: heightScreen / 1.5,
        marginBottom: heightScreen /15
    },

    image: {
        width: '100%',
        height: heightScreen / 4,
        borderRadius: 20,
    },

    boxImage2: {
        width: '46%',
        marginTop: 35,
    },

    textNameCafe: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },

    selectedButton: {
        backgroundColor: '#C67C4E'
    },

    textSelectedButton: {
        color: '#ffffff'
    },

    quantity: {
        color: '#B7C1C2',
        fontSize: 10,
        alignSelf: 'flex-end'
    },

    distance: {
        color: '#003B40',
        fontWeight: '500'
    },

    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: heightScreen / 14,
        borderTopWidth: 0,
        borderTopColor: '#ccc',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
    },

    navbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    navbarItemText: {
        fontSize: 10,
        color: '#003B40'
    },

    selectedButton2: {
        position: 'relative',
    },

    indicator: {
        width: 6,
        height: 6,
        backgroundColor: '#03DAC6',
        borderRadius: 10,
        marginTop: 4,
    },
    tinyLogo: {
    width: 150,
    height: 150,
    },
    menu: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
    },
  loadMoreButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    loadMoreButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pageButton: {
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 5,
    },
    pageButtonText: {
        color: '#3498db',
        fontSize: 16,
        fontWeight: 'bold',
    },
    activePageButton: {
        backgroundColor: '#3498db',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default SearchScreen;


