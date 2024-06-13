import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/config/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/components/Main';
import AddReview from './src/components/AddReview';
import { AppRegistry } from 'react-native';
import Review from './src/components/Review';
import AllReview from './src/components/AllReview';
import SearchScreen from './src/components/SearchScreen';
import ViewImage from './src/components/ViewImage';

const listScreens = {
    Main : Main,
    SearchScreen: SearchScreen,
    AddReview: AddReview,
    Review : Review,
    AllReview : AllReview,
    ViewImage: ViewImage,
}

const App = () => {
    const Stack = createStackNavigator();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {Object.entries(listScreens).map(([name, component]) => (
                            <Stack.Screen key={name} name={name} component={component} />
                        ))}
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
export default App;