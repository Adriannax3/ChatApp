import React from "react";
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

const ButtonIcon = ({icon, onPress}) => {
    return(
        <TouchableOpacity
            style={[styles.buttonIcon]}
            onPress={onPress}
            activeOpacity={0.98}
        >
            <Image 
                source={icon}
                style={styles.buttonIcon_Icon}
            />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    buttonIcon: {
        margin: 8,
        width: 50,
    },
    buttonIcon_Icon: {
        width: 50,
        height: 50,
    }
});

export default ButtonIcon;