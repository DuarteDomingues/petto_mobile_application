// HomePage.js
import React from 'react';
import { View, Text } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>

            <LinearGradient
                colors={['rgba(80, 156, 226, 0.3)', 'rgba(226, 150, 80, 0.3)', 'rgba(80, 156, 226, 0.3)']}
                locations={[0, 0.5104, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputContainer}
            >
                <View style={styles.wrapperInput}>
                    <TextInput
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="#C0C0C0"
                        placeholder="Search for product..."
                    />

                    {(search !== null && search !== '') && <TouchableOpacity onPress={setSearchName}>
                        {searchExecuted !== null && <AntDesign name="closecircle" color={"#BBBBBB"} size={35} style={styles.icon} />}
                        {searchExecuted === null && <MaterialIcons name="search" color={"#BBBBBB"} size={40} style={styles.icon} />}
                    </TouchableOpacity>}


                </View>
            </LinearGradient>

            <FlatList
                data={products}
                keyExtractor={item => item.productId}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                onEndReached={reachEndScroll} // Triggered when the list reaches the end
                onEndReachedThreshold={0} // might adjust this

                ListHeaderComponent={() => (

                    <View>

                        <TopBar handlePress={searchByCategory}
                            values={categoriesArrayNotNull}
                            searchValue={search}
                            handlePressSort={() => setDialogSort(true)}
                            recentViewed={recentViewedProducts}
                            handlePressLocalization={handlePressLocalization}
                            handlePressCondition={handlePressCondition}
                            handlePressFilters={handlePressFilters}
                            navigation={navigation}
                            orderSearch={orderSearch}
                            handlePressMoney={handlePressMoney}
                        />
                    </View>
                )}

                renderItem={({ item }) => (
                    <CardProduct image={`data:image/jpeg;base64,${item.images}`}
                        title={item.title} price={'' + item.price} productId={item.productId} navigation={navigation} />
                )}

            />

            <DialogSort visible={dialogSort} handleSetSearch={handlePressDialog} />

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 25
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingEnd: 5,
        paddingStart: 5
    },

    wrapperInput: {

        borderRadius: 34,
        backgroundColor: 'white',

        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },

        justifyContent: 'space-between',
        alignItems: 'center',
        width: '96%',
        flexDirection: 'row'
    },

    input: {
        fontSize: 22,
        paddingVertical: 8,
        paddingHorizontal: 20,
        width: '85%',
    },

    icon: {
        marginRight: '3%'
    },

    touchCategory: {
        alignItems: 'center',
        width: 100,
    },

    imageSize: {
        width: 65,
        height: 65,
    },

    textCategory: {
        fontSize: 15,
        textAlign: 'center',

    },

    middleTitle: {
        fontSize: 28,
        marginLeft: '2%',
    },


    columnWrapper: {
        justifyContent: 'space-between',
        flex: 1,
        width: '100%',
        height: '100%'
    },

})


export default HomePage;
