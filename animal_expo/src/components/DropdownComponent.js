import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

 

  const DropdownComponent = ({data,  label, setLabel }) => {
    const [value, setValue] = useState(null);



    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="#657EFF"
              name="Safety"
              size={17}
            />
          )}
        </View>
      );
    };

    return (
        <View style={styles.paddBot}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor="#7B6F82"
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"

        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item);
          setLabel(item.label);

      
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="#657EFF" name="Safety" size={17} />
        )}
        renderItem={renderItem}
      />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({

    paddBot: {
        paddingBottom: 10
    },
    dropdown: {
        width: "97%",
      height: 30,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      borderRadius: 8,
      borderColor: '#C3CDFF',
      borderWidth: 1, 
      backgroundColor: '#ffffff',
      marginTop: 8,
      marginBottom: 4,
      marginLeft: 5,

    },
    icon: {
      marginRight: 6,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
      color: '#7B6F82'
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 18,
      height: 18,
      
    },
 

    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    
  });