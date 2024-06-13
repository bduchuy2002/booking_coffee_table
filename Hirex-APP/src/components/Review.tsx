import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button
  
} from "react-native";
import {  DateTimePickerMode, Picker, DateTimePickerProps} from "react-native-ui-lib";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Swiper from "react-native-swiper";
import axios from 'axios';
import { DateTimePicker } from "react-native-ui-lib/src/components/dateTimePicker";
import { color } from "react-native-reanimated";
const { height: heightScreen } = Dimensions.get("window");

const ReView = ({ route }) => {
  const { name, idCustomer } = route.params;
  
  const [data, setData] = useState(null);
 const [table, setTable] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      try {
        
      const response = await axios.get(`http://10.20.226.49:8000/v1/coffee/${name}`);
        setData(response.data);
        setTable(response.data.table)
        console.log(245)
        console.log(idCustomer)
       
        
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  };
  
  const basicColors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFA500",
    "#FF00FF",
    "#00FFFF",
  ];
  
 const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFloor, setSelectedFloor] = useState('1');
    const [selectedSeats, setSelectedSeats] = useState('1');
    const [selectedTime, setSelectedTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);
const handleSelectTable = (tableID) => {
        if (selectedTables.includes(tableID)) {
            // Nếu nút đã được chọn, bỏ chọn nó
            setSelectedTables(selectedTables.filter(id => id !== tableID));
        } else {
            // Nếu nút chưa được chọn và số lượng nút chọn chưa đủ 2, chọn nút đó
            if (selectedTables.length < 2) {
                setSelectedTables([...selectedTables, tableID])
            }
        }
  };
  const isTableSelected = (tableID) => {
    // setSelectedTables(tableID.toString())
        return selectedTables.includes(tableID);
    };
  

    // Hàm xử lý khi người dùng xác nhận chọn ngày
    const handleConfirm = (date) => {
        setSelectedDate(date.toISOString()); // Lưu ngày đã chọn (dưới dạng ISO string)
        hideDatePicker();
    };
const hideDatePicker = () => {
        setDatePickerVisible(false);
  };
  const handleConfirmTime = (date) => {
        setSelectedTime(date.toTimeString().slice(0, 5)); // Lưu giờ đã chọn (dưới dạng chuỗi hh:mm)
        hideTimePicker();
    };

    // Hàm ẩn picker giờ
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    // Hàm ẩn picker ngày
    

    const handleConfirmReservation =async () => {
        // Xử lý khi người dùng xác nhận đặt chỗ
      console.log('Ngày:', selectedDate);
      
      console.log(selectedTables)
      const selectedTablesAsString = selectedTables.map(tableID => tableID.toString());

      // Đóng modal sau khi xác nhận đặt chỗ
      try {
        const formattedDate = selectedDate.toString();
        const formattedTime= selectedTime.toString();
        // Chuyển đổi ngày thành chuỗi  để lưu vào CSDL
            const response = await axios.post('http://10.20.226.49:8000/v3/booking/confirm1', {
                
    
    idCustomer: idCustomer,
    idCoffee: data._id,
    date: formattedDate,
    time: formattedTime,
              name: data.name,
    address:data.address,
    tableBooking:selectedTablesAsString
    
  
            });

        console.log('Đặt chỗ thành công:', response.data);
        fetchData();
        alert("Đặt chỗ thành công")
        
        } catch (error) {
        console.error('Lỗi khi đặt chỗ:', error.response.data);
        alert( "Vui lòng nhập đầy đủ thông tin")
            // Xử lý lỗi và hiển thị thông báo cho người dùng
        }
        setModalVisible(false);
  };
  const handleSelectFloor = (floor) => {
        setSelectedFloor(floor.toString()); // Cập nhật tầng đã chọn
    };
  const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    

    const handleDateConfirm = (date) => {
        // Xử lý khi người dùng chọn ngày từ date picker
        const formattedDate = date.toLocaleDateString();
        setSelectedDate(formattedDate);
        hideDatePicker();
    };
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((currentColorIndex + 1) % basicColors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentColorIndex]);

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed((prevState) => !prevState);
  };

  const images = [
    require("../../assets/anh2.jpg"),
    require("../../assets/anh4.jpg"),
    require("../../assets/anh5.jpg"),
  ];

  const navigation = useNavigation();

  const handleViewAllReviews = () => {
    navigation.navigate("AllReview");
  };

  const handleViewSearchScreen = (idCustomer) => {
    navigation.navigate("SearchScreen",{idCustomer:idCustomer});
  };

  const handleViewImage = () => {
    navigation.navigate("ViewImage");
  };

  const maxVisibleImages = 2;

  const [showFullText, setShowFullText] = useState(false);

  const handleReadMorePress = () => {
    setShowFullText(!showFullText);
  };

  const renderText = () => {
    const fullText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis dapibus mi, sed molestie elit tempor sit amet. Mauris tincidunt efficitur nisl, id fermentum enim cursus ac. Aliquam in pulvinar velit. Sed auctor, massa id facilisis eleifend, dui mauris posuere elit, eget egestas diam nulla vitae nunc.";

    if (showFullText) {
      return fullText;
    } else {
      return fullText.substring(0, 100) + "...";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.back}>
            <TouchableOpacity  onPress={() => handleViewSearchScreen(idCustomer)}>
              <View style={{flexDirection:'row',}}>
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text>Back</Text>
              </View>
              
            </TouchableOpacity>
          </View>
          {data ? (
            <Swiper loop={false} horizontal={true}>
               
                <Image
                                            style={styles.image}
                                            source={{
                                                uri: `${data.image}`,
                                            }}
                                        />
              
            </Swiper>) : (<Text>loading...</Text>)}
        </View>
        <View style={styles.content}>
          <View style={styles.textHeader}>
            <View>
              { data?(
                <Text style={styles.name}>{data.name}</Text>) : (<Text>loading...</Text>)}
              <View style={styles.ratingHeader}>
                <MaterialIcons name="star-rate" size={18} color="#FDCB6E" />
                
              </View>
             
            </View>
            <View style={{ flexDirection: "row" }}>
              
              <View style={styles.location}>
                {/* <FontAwesome5 name="location-arrow" size={16} color="#C67C4E" /> */}
                <TouchableOpacity onPress={handlePress}>
                  <Octicons
                    name={isPressed ? "heart-fill" : "heart"}
                    size={20}
                    color={isPressed ? "red" : "#C67C4E"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.viewOpption}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            source={require('../../aset/vitri.png')}
            style={{width: 37, height: 40}}></Image>
          <View style={{flexDirection: 'column', paddingLeft: 5}}>
                {data ? (<Text style={{ fontSize: 15, fontWeight: 900 }}>{data.address}</Text>) : (<Text>load...</Text>)}
            <Text style={{fontSize: 15, fontWeight: 900}}>hà nội</Text>
          </View>
        </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            source={require('../../aset/run.png')}
            style={{width: 37, height: 40}}></Image>
          <View style={{flexDirection: 'column', paddingLeft: 5}}>
            <Text style={{fontSize: 15, fontWeight: 900}}>khoảng cách</Text>
                {data ? (<Text style={{ fontSize: 15, fontWeight: 900 }}>{data.distance}</Text>) : (<Text>load...</Text>)}
          </View>
        </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            source={require('../../aset/star.png')}
            style={{width: 37, height: 40}}></Image>
          <View style={{flexDirection: 'column', paddingLeft: 5}}>
            <Text style={{fontSize: 15, fontWeight: 900}}>đánh giá</Text>
                {data ? (<Text style={{ fontSize: 15, fontWeight: 900 }}>{data.rate}/5</Text>) : (<Text>load...</Text>)}
          </View>
        </View>
          </View>

          <View style={styles.blurLine}></View>
          <View style={{ marginTop: heightScreen / 70 }}>
            <Text style={{fontSize: 30, fontWeight: 800, marginStart: 20}}>
          Mô tả
        </Text>
            
        {data ? (<Text style={{fontSize: 20, fontWeight: 800, margin: 10}}>
          - Giới thiệu:
              <Text style={{ fontStyle: 'italic', fontWeight: 800 }}>
                {' '}
                {data.name}
              </Text>  {' '}
          {data.describe}
        </Text>): (<Text>load...</Text>)}
        <Text style={{fontSize: 20, fontWeight: 800, margin: 10}}>
          - Giờ mở cửa:{' '}
              {data ? (<Text style={{ textDecorationLine: 'underline' }}>{data.open}</Text>): (<Text>load...</Text>)} {' '}
          
        </Text>
            {data ? (<Text style={{ fontSize: 20, fontWeight: 800, margin: 10 }}>
              - Số điện thoại : {data.phone}
            </Text>) : (<Text>load...</Text>)}
            <Text style={{fontSize: 20, fontWeight: 800, margin: 10}}>
          - Bàn trong quán:{' '}
              {data ? (<Text style={{ textDecorationLine: 'underline' }}>Lưu ý bàn lẻ có 4 chỗ, bàn chẵn có 2 chỗ </Text>): (<Text>load...</Text>)} {' '}
          
        </Text>

          </View>
          
          <View style={styles.blurLine2}></View>
          
          
            {/* Nút "Đặt chỗ" */}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Đặt bàn</Text>
            </TouchableOpacity>

            {/* Modal Đặt chỗ */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
              
            <View style={styles.modalContainer}>
              <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                    <Text style={styles.modalTitle}>Đặt chỗ</Text>

              {/* Chọn ngày */}
              <View style={styles.con}>
                    <Text style={styles.selectedDateText}>
                {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Chưa chọn ngày'}
            </Text>

            {/* Nút mở picker ngày */}
            <Button title="Chọn ngày" onPress={() => setDatePickerVisible(true)} />

            {/* Modal picker ngày */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date" // Chế độ chọn ngày
                onConfirm={handleConfirm} // Xử lý khi xác nhận chọn ngày
                onCancel={hideDatePicker} // Xử lý khi hủy chọn ngày
                /></View>
              {/* Nhập giờ */}
                    <View style={styles.con}>
            {/* Hiển thị giờ đã chọn */}
            <Text style={styles.selectedTimeText}>
                {selectedTime ? selectedTime : 'Chưa chọn giờ'}
            </Text>

            {/* Nút mở picker giờ */}
            <Button title="Chọn giờ" onPress={() => setTimePickerVisibility(true)} />

            {/* Modal picker giờ */}
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time" // Chế độ chọn giờ
                onConfirm={handleConfirmTime} // Xử lý khi xác nhận chọn giờ
                onCancel={hideTimePicker} // Xử lý khi hủy chọn giờ
            />
        </View>

                    {/* Chọn tầng */}
                    {/* Chọn tầng */}
            <View >
                <Text>Chọn Bàn:</Text>
                <View style={styles.floorButtonsContainer}>
                    {/* <TouchableOpacity
                        style={[styles.floorButton, selectedFloor === '1' && styles.selectedFloorButton]}
                        onPress={() => handleSelectFloor(1)}
                    >
                        <Text style={styles.floorButtonText}>Tầng 1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                        style={[styles.floorButton, selectedFloor === '2' && styles.selectedFloorButton]}
                        onPress={() => handleSelectFloor(2)}
                    >
                        <Text style={styles.floorButtonText}>Tầng 2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                        style={[styles.floorButton, selectedFloorselectedFloor === '2' && styles.selectedFloorButton]}
                        onPress={() => handleSelectFloor(2)}
                    >
                        <Text style={styles.floorButtonText}>Tầng 2</Text>
                    </TouchableOpacity> */}
                    {table ?(table.map((tablee,index) => (
                    <TouchableOpacity
                        key={tablee.tableID} // Sử dụng _id của bàn làm key
                        style={[
                                styles.floorButton,
                          isTableSelected(index + 1) && styles.selectedFloorButton,
                                tablee.status && styles.disabledButton
                            ]}
                        onPress={() => {
                                if (!tablee.status) {
                                    handleSelectTable(index + 1);
                                }
                            }}
                            disabled={tablee.status}
                    >
                        <Text style={styles.floorButtonText}>{tablee.tableID}</Text>
                    </TouchableOpacity>
                ))):(<Text style={{color:"red"}}>load.......</Text>)}
                </View>
            </View>

                    {/* Chọn số chỗ ngồi */}
                    {/* <View style={styles.inputField}>
                        <Text> Chỗ ngồi:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={selectedSeats}
                            onChangeText={(text) => setSelectedSeats(text)}
                        />
                    </View> */}

                    

                    {/* Button xác nhận đặt chỗ */}
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmReservation}>
                        <Text style={styles.confirmButtonText}>Xác nhận đặt chỗ</Text>
                    </TouchableOpacity>

                    {/* Date Picker */}
                    {/* <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                    /> */}
                </View>
            </Modal>
          
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 45 : 0,
    backgroundColor: "#F5F5F5",
  },
   button: {
        backgroundColor: '#3498db',
        padding: 15,
     borderRadius: 10,
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff', // Màu văn bản của tiêu đề modal
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
      marginBottom: 20,
        color:"white"
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        flex: 1,
      marginLeft: 20,
        
    },
    confirmButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
  
  
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    
    
    
    
  
    

  header: {
    height: heightScreen / 3,
  },

  back: {
    zIndex: 999,
    backgroundColor: "#ffffff",
    width: 70,
    height: 50,
    position: "absolute",
    left: 22,
    top: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },

  slide: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 1,
  },

  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,
    paddingBottom: 50,
  },

  textHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  name: {
    fontSize: 25,
    fontWeight: "500",
    color: "#003B40",
  },

  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  textRating: {
    color: "#003B40",
    marginHorizontal: 2,
  },

  quantityReview: {
    color: "#B7C1C2",
    fontSize: 11,
  },

  address: {
    color: "#003B40",
    fontSize: 15,
  },

  location: {
    width: 44,
    height: 44,
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginHorizontal: 5,
  },

  box: {
    width: heightScreen / 9,
    height: heightScreen / 9,
    backgroundColor: "#EDF0EF",
    marginHorizontal: 10,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },

  imageBox: {
    width: "29%",
    height: "28%",
    marginBottom: 1,
  },

  textBox: {
    marginTop: 4,
    color: "#003B40",
  },

  blurLine: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#9B9B9B",
    marginTop: heightScreen / 35,
  },

  viewOpption: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightScreen / 40,
  },

  blurLine2: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#9B9B9B",
    marginTop: 15,
  },

  boxHeaderRecommend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  describe: {
    fontSize: 16,
    color: "#2F2D2C",
    fontWeight: "500",
  },

  bottonAllReview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  boxRecommend: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#faf8f7",
    borderRadius: 10,
    width: "100%",
  },

  container2: {
    flexDirection: "row",
  },

  imageContainer: {
    position: "relative",
  },

  image2: {
    marginTop: 5,
    width: 90,
    height: 90,
    marginRight: 5,
  },

  overlay: {
    // ...StyleSheet.absoluteFillObject,
    position: "absolute",
    top: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  text: {
    color: "white",
    fontSize: 20,
  },

  viewTime: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 5,
  },

  viewSuggest: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: heightScreen / 50,
    alignContent: "center",
  },
   floorButtonsContainer: {
        flexDirection: 'row',
     flexWrap:'wrap',
     marginTop: 10,
     height: 200,
        marginBottom:50
    },
    floorButton: {
        backgroundColor: 'green',
        padding: 10,
      borderRadius: 10,
      marginLeft: 16,
        marginTop:5,
      width: '20%',
        height:'20%',
        alignItems: 'center',
    },
    selectedFloorButton: {
        backgroundColor: 'blue',
        // Thay đổi màu chữ khi được chọn
        color: 'white'
    },
    floorButtonText: {
      color: '#fff',
      
        fontSize: 16,
        fontWeight: 'bold',
  },
    selectedDateText: {
        fontSize: 18,
      marginBottom: 10,
        marginStart:100,
  },
    selectedTimeText: {
        fontSize: 18,
      marginBottom: 10,
      marginStart:140,
        
  },
    disabledButton: {
        backgroundColor: 'gray',
        opacity: 0.5 // Độ mờ của nút khi disabled
    },
    con: {
        flexDirection:'row-reverse',
      
        alignItems:'flex-end',
        padding: 20,
  },
     closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Màu nền của nút "x"
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
  
});

export default ReView;